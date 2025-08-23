// add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', function() {
  // select all code blocks
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    if (codeBlock.parentElement.tagName === 'CODE') return; // skip if inline code
    
    // create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
    
    // create header with copy button
    const header = document.createElement('div');
    header.className = 'code-header';
    
    // detect language from the highlight class
    const highlightDiv = codeBlock.querySelector('.highlight');
    let language = 'code';
    if (codeBlock.className.match(/language-(\w+)/)) {
      language = codeBlock.className.match(/language-(\w+)/)[1];
    } else if (highlightDiv && highlightDiv.className.match(/language-(\w+)/)) {
      language = highlightDiv.className.match(/language-(\w+)/)[1];
    }
    
    const languageLabel = document.createElement('span');
    languageLabel.className = 'code-language';
    languageLabel.textContent = language;
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    header.appendChild(languageLabel);
    header.appendChild(copyButton);
    wrapper.insertBefore(header, codeBlock);
    
    // copy functionality
    copyButton.addEventListener('click', function() {
      const code = codeBlock.textContent;
      navigator.clipboard.writeText(code).then(function() {
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(function() {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy: ', err);
        copyButton.textContent = 'Failed';
      });
    });
  });
  
  // smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // add anchor links to headers
  const headers = document.querySelectorAll('.post-content h2, .post-content h3, .post-content h4');
  headers.forEach(function(header) {
    if (header.id) {
      const anchor = document.createElement('a');
      anchor.className = 'header-anchor';
      anchor.href = '#' + header.id;
      anchor.innerHTML = '<i class="fas fa-link"></i>';
      anchor.setAttribute('aria-label', 'Permalink');
      header.appendChild(anchor);
    }
  });
  
  // mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle) {
    navToggle.addEventListener('change', function() {
      if (this.checked) {
        navMenu.style.display = 'flex';
      } else {
        navMenu.style.display = '';
      }
    });
  }
});