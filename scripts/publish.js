const fs = require('fs');
const path = require('path');

function generateCardHtml(post) {
  return `         <!-- Post: ${post.filename} -->
         <article class="post-card">
           <div class="post-card-thumb" style="background-image: url('${post.image_url}');">
             <span class="post-tag">${post.tag}</span>
           </div>
           <div class="post-card-content">
             <div class="post-meta">
               <span>Author: Starrope</span>
               <span>•</span>
               <span>${post.date_display}</span>
             </div>
             <h3 class="post-card-title"><a href="posts/${post.filename}">${post.title}</a></h3>
             <p class="post-card-desc">${post.description}</p>
             <div class="post-card-footer">
               <a href="posts/${post.filename}" class="read-more-btn">
                 Read More
                 <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                 </svg>
               </a>
             </div>
           </div>
         </article>
`;
}

function isAlreadyPublished(filename, indexContent) {
  const marker = '<!-- SCHEDULED_POSTS_START -->';
  const sidebarMarker = '<!-- RIGHT: SIDEBAR -->';
  
  if (!indexContent.includes(marker)) return false;
  const startIdx = indexContent.indexOf(marker);
  const endIdx = indexContent.indexOf(sidebarMarker, startIdx);
  
  const gridContent = endIdx === -1 ? indexContent.slice(startIdx) : indexContent.slice(startIdx, endIdx);
  return gridContent.includes(`posts/${filename}`);
}

function insertCardToIndex(cardHtml, indexContent) {
  const marker = '<!-- SCHEDULED_POSTS_START -->';
  if (!indexContent.includes(marker)) {
    console.log("Warning: SCHEDULED_POSTS_START marker not found.");
    return indexContent;
  }
  return indexContent.replace(marker, marker + '\n' + cardHtml);
}

function addUrlToSitemap(filename, publishDate, sitemapContent) {
  const newUrl = `  <url>
    <loc>https://blog6.starrope2023.com/posts/${filename}</loc>
    <lastmod>${publishDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  return sitemapContent.replace('</urlset>', newUrl + '</urlset>');
}

function main() {
  const projectRoot = path.dirname(__dirname);
  const schedulePath = path.join(projectRoot, 'schedule.json');
  const indexPath = path.join(projectRoot, 'index.html');
  const sitemapPath = path.join(projectRoot, 'sitemap.xml');

  const schedule = JSON.parse(fs.readFileSync(schedulePath, 'utf-8'));
  let indexContent = fs.readFileSync(indexPath, 'utf-8');
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

  let publishedCount = 0;

  for (const post of schedule.posts) {
    if (isAlreadyPublished(post.filename, indexContent)) {
      continue;
    }

    console.log(`Publishing: ${post.filename} (${post.publish_date} ${post.publish_time})`);
    const cardHtml = generateCardHtml(post);
    indexContent = insertCardToIndex(cardHtml, indexContent);
    sitemapContent = addUrlToSitemap(post.filename, post.publish_date, sitemapContent);
    publishedCount++;
  }

  if (publishedCount > 0) {
    fs.writeFileSync(indexPath, indexContent, 'utf-8');
    console.log("index.html updated successfully");
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
    console.log("sitemap.xml updated successfully");
    console.log(`\nPublished ${publishedCount} post(s) successfully!`);
  } else {
    console.log("No pending posts to publish at this time.");
  }
}

main();
