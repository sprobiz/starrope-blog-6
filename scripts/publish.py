#!/usr/bin/env python3
"""
Starrope Longevity Blog - Automatic Scheduled Post Publisher
Runs on GitHub Actions at 08:00 KST (23:00 UTC previous day) and 16:00 KST (07:00 UTC)
"""

import json
import os
from datetime import datetime, timezone, timedelta

# KST = UTC+9
KST = timezone(timedelta(hours=9))

def get_current_kst():
    """Returns the current KST time"""
    return datetime.now(timezone.utc).astimezone(KST)

def get_time_slot(hour):
    """Determines whether the current hour falls under the AM or PM slot"""
    if 0 <= hour < 12:
        return '08:00'
    else:
        return '16:00'

def generate_card_html(post):
    """Generates the card HTML from post metadata"""
    return f"""         <!-- Post: {post['filename']} -->
         <article class="post-card">
           <div class="post-card-thumb" style="background-image: url('{post['image_url']}');">
             <span class="post-tag">{post['tag']}</span>
           </div>
           <div class="post-card-content">
             <div class="post-meta">
               <span>Author: Starrope</span>
               <span>•</span>
               <span>{post['date_display']}</span>
             </div>
             <h3 class="post-card-title"><a href="posts/{post['filename']}">{post['title']}</a></h3>
             <p class="post-card-desc">{post['description']}</p>
             <div class="post-card-footer">
               <a href="posts/{post['filename']}" class="read-more-btn">
                 Read More
                 <svg xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
                 </svg>
               </a>
             </div>
           </div>
         </article>
"""

def is_already_published(filename, index_content):
    """Checks if the post card is already present in index.html inside the main posts grid"""
    marker = '<!-- SCHEDULED_POSTS_START -->'
    sidebar_marker = '<!-- RIGHT: SIDEBAR -->'
    
    if marker not in index_content:
        return False
        
    start_idx = index_content.find(marker)
    end_idx = index_content.find(sidebar_marker, start_idx)
    
    if end_idx == -1:
        grid_content = index_content[start_idx:]
    else:
        grid_content = index_content[start_idx:end_idx]
        
    return f'posts/{filename}' in grid_content

def insert_card_to_index(card_html, index_content):
    """Inserts the card immediately after the SCHEDULED_POSTS_START marker in index.html"""
    marker = '<!-- SCHEDULED_POSTS_START -->'
    if marker not in index_content:
        print("Warning: SCHEDULED_POSTS_START marker not found.")
        return index_content
    return index_content.replace(
        marker,
        marker + '\n' + card_html,
        1
    )

def add_url_to_sitemap(filename, publish_date, sitemap_content):
    """Adds the new URL to sitemap.xml"""
    new_url = f"""  <url>
    <loc>https://blog6.starrope2023.com/posts/{filename}</loc>
    <lastmod>{publish_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
"""
    return sitemap_content.replace('</urlset>', new_url + '</urlset>')

def main():
    now = get_current_kst()
    today = now.date()
    current_hour = now.hour
    time_slot = get_time_slot(current_hour)

    print(f"Current KST Time: {now.strftime('%Y-%m-%d %H:%M')}")
    print(f"Publishing Slot: {time_slot}")

    # Read schedule.json
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)

    with open(os.path.join(project_root, 'schedule.json'), 'r', encoding='utf-8') as f:
        schedule = json.load(f)

    # Read index.html & sitemap.xml
    index_path = os.path.join(project_root, 'index.html')
    sitemap_path = os.path.join(project_root, 'sitemap.xml')

    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()

    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap_content = f.read()

    published_count = 0

    for post in schedule['posts']:
        post_date_str = post['publish_date']
        post_time = post['publish_time']
        post_date = datetime.strptime(post_date_str, '%Y-%m-%d').date()

        # Skip already published posts
        if is_already_published(post['filename'], index_content):
            continue

        # Check publish conditions: past dates or today's designated slot hour
        should_publish = False

        if post_date < today:
            # Missed post from previous date - publish in this run
            should_publish = True
        elif post_date == today:
            # Today's date: verify if slot hour is reached
            post_hour = 8 if post_time == '08:00' else 16
            if current_hour >= post_hour:
                should_publish = True

        if should_publish:
            filename = post['filename']
            print(f"Publishing: {filename} ({post_date_str} {post_time})")

            # Generate card HTML and insert into index.html
            card_html = generate_card_html(post)
            index_content = insert_card_to_index(card_html, index_content)

            # Add URL to sitemap.xml
            sitemap_content = add_url_to_sitemap(filename, post_date_str, sitemap_content)

            published_count += 1

    if published_count > 0:
        print(f"\nPublished {published_count} post(s) successfully!")

        # Save index.html
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(index_content)
        print("index.html updated successfully")

        # Save sitemap.xml
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(sitemap_content)
        print("sitemap.xml updated successfully")
    else:
        print("No pending posts to publish at this time.")

if __name__ == '__main__':
    main()
