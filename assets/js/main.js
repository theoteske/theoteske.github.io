document.addEventListener('DOMContentLoaded', function() {
  // add copy buttons to code blocks
  const codeBlocks = document.querySelectorAll('div.highlight');
  
  codeBlocks.forEach(function(highlightBlock) {
    // get the pre element
    const pre = highlightBlock.querySelector('pre');
    if (!pre) return;
    
    // check if already wrapped
    if (highlightBlock.parentElement.classList.contains('code-block-wrapper')) return;
    
    // create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    highlightBlock.parentNode.insertBefore(wrapper, highlightBlock);
    wrapper.appendChild(highlightBlock);
    
    // create header with copy button
    const header = document.createElement('div');
    header.className = 'code-header';
    
    // detect language
    let language = 'code';
    const codeElement = pre.querySelector('code');
    if (codeElement) {
      const classes = codeElement.className.split(' ');
      for (let className of classes) {
        if (className.startsWith('language-')) {
          language = className.replace('language-', '');
          break;
        }
      }
    }

    // also check data-lang attribute
    if (pre.getAttribute('data-lang')) {
      language = pre.getAttribute('data-lang');
    }
    
    const languageLabel = document.createElement('span');
    languageLabel.className = 'code-language';
    languageLabel.textContent = language;
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    header.appendChild(languageLabel);
    header.appendChild(copyButton);
    wrapper.insertBefore(header, highlightBlock);
    
    // copy functionality
    copyButton.addEventListener('click', function() {
      // get the actual code content, excluding line numbers
      const code = pre.querySelector('code');
      let textToCopy = '';
      
      if (code) {
        // if there's a code element, get its text
        textToCopy = code.textContent;
      } else {
        // otherwise get all text except line numbers
        const lines = pre.textContent.split('\n');
        textToCopy = lines.map(line => {
          // remove line numbers if they exist (usually first few characters)
          return line.replace(/^\s*\d+\s*/, '');
        }).join('\n');
      }
      
      navigator.clipboard.writeText(textToCopy).then(function() {
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
  
  // handle standalone pre elements without highlight div
  const standalonePres = document.querySelectorAll('pre:not(.highlight pre)');
  
  standalonePres.forEach(function(pre) {
    // skip if already wrapped
    if (pre.parentElement.classList.contains('code-block-wrapper')) return;
    
    // create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    
    // create header with copy button
    const header = document.createElement('div');
    header.className = 'code-header';
    
    const languageLabel = document.createElement('span');
    languageLabel.className = 'code-language';
    languageLabel.textContent = 'code';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    header.appendChild(languageLabel);
    header.appendChild(copyButton);
    wrapper.insertBefore(header, pre);
    
    // copy functionality
    copyButton.addEventListener('click', function() {
      const textToCopy = pre.textContent;
      
      navigator.clipboard.writeText(textToCopy).then(function() {
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
      anchor.innerHTML = ' 🔗';
      anchor.setAttribute('aria-label', 'Permalink');
      anchor.style.fontSize = '0.8em';
      anchor.style.opacity = '0.5';
      anchor.style.marginLeft = '0.5em';
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