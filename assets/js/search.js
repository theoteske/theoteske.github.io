// simple search functionality for blog posts
document.addEventListener('DOMContentLoaded', function() {
  // create search interface
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  searchContainer.innerHTML = `
    <div class="search-box">
      <input type="text" id="search-input" placeholder="Search posts..." autocomplete="off">
      <i class="fas fa-search search-icon"></i>
    </div>
    <div id="search-results" class="search-results"></div>
  `;
  
  // add search to blog page if it exists
  const blogListing = document.querySelector('.blog-listing');
  if (blogListing) {
    blogListing.parentNode.insertBefore(searchContainer, blogListing);
  }
  
  // search functionality
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput) {
    // collect all posts data
    const posts = [];
    document.querySelectorAll('.post-preview').forEach(post => {
      const title = post.querySelector('h2 a')?.textContent || '';
      const excerpt = post.querySelector('.post-excerpt')?.textContent || '';
      const url = post.querySelector('h2 a')?.href || '';
      const date = post.querySelector('.post-date')?.textContent || '';
      const categories = post.querySelector('.post-categories')?.textContent || '';
      
      posts.push({
        title: title.toLowerCase(),
        excerpt: excerpt.toLowerCase(),
        url: url,
        date: date,
        categories: categories.toLowerCase(),
        element: post,
        originalTitle: title
      });
    });
    
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length < 2) {
        // show all posts if query is too short
        posts.forEach(post => {
          post.element.style.display = '';
        });
        searchResults.innerHTML = '';
        searchResults.style.display = 'none';
        return;
      }
      
      // filter posts
      let matches = [];
      posts.forEach(post => {
        const titleMatch = post.title.includes(query);
        const excerptMatch = post.excerpt.includes(query);
        const categoryMatch = post.categories.includes(query);
        
        if (titleMatch || excerptMatch || categoryMatch) {
          matches.push(post);
          post.element.style.display = '';
        } else {
          post.element.style.display = 'none';
        }
      });
      
      // show search results summary
      if (matches.length > 0) {
        searchResults.innerHTML = `
          <div class="search-summary">
            Found ${matches.length} ${matches.length === 1 ? 'post' : 'posts'} matching "${query}"
            <button onclick="clearSearch()" class="clear-search">Clear</button>
          </div>
        `;
        searchResults.style.display = 'block';
      } else {
        searchResults.innerHTML = `
          <div class="search-summary no-results">
            No posts found matching "${query}"
            <button onclick="clearSearch()" class="clear-search">Clear</button>
          </div>
        `;
        searchResults.style.display = 'block';
      }
    });
  }
});

// clear search function
function clearSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (searchInput) {
    searchInput.value = '';
    document.querySelectorAll('.post-preview').forEach(post => {
      post.style.display = '';
    });
  }
  
  if (searchResults) {
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';
  }
}

// add search styles
const searchStyles = `
<style>
.search-container {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  max-width: 500px;
}

#search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  font-size: 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

#search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
}

.search-results {
  display: none;
  margin-top: 1rem;
}

.search-summary {
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
}

.search-summary.no-results {
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
}

.clear-search {
  padding: 0.25rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 0.25rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-search:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', searchStyles);