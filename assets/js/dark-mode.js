// dark mode toggle
(function() {
  // check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // wait for DOM to load
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // update button icon based on current theme
    updateThemeIcon(currentTheme);
    
    // toggle theme on button click
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // update theme
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // update icon
      updateThemeIcon(newTheme);
      
      // add animation class
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
    
    function updateThemeIcon(theme) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-sun';
        } else {
          icon.className = 'fas fa-moon';
        }
      }
    }
  });
})();