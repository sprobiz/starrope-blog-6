document.addEventListener('DOMContentLoaded', () => {
  // --- THEME SWITCHER MECHANICS ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Toggle button click listener
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      let newTheme = 'light';
      
      if (currentTheme === 'light') {
        newTheme = 'dark';
      }
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- CLIENT-SIDE POST REAL-TIME SEARCH ---
  const searchInput = document.getElementById('search-box');
  const postCards = document.querySelectorAll('.post-card');
  
  if (searchInput && postCards.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      postCards.forEach(card => {
        const title = card.querySelector('.post-card-title').textContent.toLowerCase();
        const desc = card.querySelector('.post-card-desc').textContent.toLowerCase();
        const tags = card.querySelector('.post-tag') ? card.querySelector('.post-tag').textContent.toLowerCase() : '';
        
        if (title.includes(query) || desc.includes(query) || tags.includes(query)) {
          card.style.display = 'flex';
          // Smooth fade in
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          // Hide element
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
        }
      });
      
      // Show "no results" message if no posts visible
      const visibleCards = Array.from(postCards).filter(c => c.style.display !== 'none');
      let noResultsMsg = document.getElementById('no-results-message');
      
      if (visibleCards.length === 0) {
        if (!noResultsMsg) {
          noResultsMsg = document.createElement('div');
          noResultsMsg.id = 'no-results-message';
          noResultsMsg.style.textAlign = 'center';
          noResultsMsg.style.padding = '40px 20px';
          noResultsMsg.style.color = 'var(--text-muted)';
          noResultsMsg.style.fontSize = '16px';
          noResultsMsg.style.fontWeight = '500';
          noResultsMsg.style.gridColumn = 'span 2';
          noResultsMsg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 48px; height: 48px; margin: 0 auto 12px auto; display: block; opacity: 0.6;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No results found. Try searching for something else.
          `;
          const postsGrid = document.querySelector('.posts-grid');
          if (postsGrid) postsGrid.appendChild(noResultsMsg);
        }
      } else {
        if (noResultsMsg) {
          noResultsMsg.remove();
        }
      }
    });
  }

  // --- SYNC ACTIVE NAVBAR STATE ---
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links .nav-item');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href)) {
      link.style.color = 'var(--primary-color)';
      link.style.fontWeight = '700';
    }
  });
});
