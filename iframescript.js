function searchOnLinkedIn() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
  
    searchButton.addEventListener('click', () => {
      const query = searchInput.value;
      const url = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`;
      searchResults.src = url;
    });
  }
  