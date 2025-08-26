document.addEventListener('DOMContentLoaded', function() {
  // process all code blocks
  const codeBlocks = document.querySelectorAll('div.highlight');
  
  codeBlocks.forEach(function(highlightBlock) {
    // check if it's already been processed
    if (highlightBlock.parentElement && highlightBlock.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }
    
    // check if it has a rouge table
    const rougeTable = highlightBlock.querySelector('table.rouge-table');
    if (rougeTable) {
      // jekyll is already handling line numbers, just add wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      highlightBlock.parentNode.insertBefore(wrapper, highlightBlock);
      wrapper.appendChild(highlightBlock);
      
      // add header with copy button
      addCodeHeader(wrapper, highlightBlock);
      return;
    }
    
    // get the pre element
    const pre = highlightBlock.querySelector('pre');
    if (!pre) return;
    
    // create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    highlightBlock.parentNode.insertBefore(wrapper, highlightBlock);
    wrapper.appendChild(highlightBlock);
    
    // add line numbers
    addLineNumbers(pre);
    
    // add header with copy button
    addCodeHeader(wrapper, highlightBlock);
  });
  
  // also handle standalone pre elements
  const standalonePres = document.querySelectorAll('pre:not(.highlight pre):not(.code-block-wrapper pre)');
  
  standalonePres.forEach(function(pre) {
    if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) {
      return;
    }
    
    // create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    
    // add line numbers
    addLineNumbers(pre);
    
    // add header
    addCodeHeader(wrapper, null);
  });
  
  function addLineNumbers(pre) {
    const code = pre.querySelector('code') || pre;
    const codeText = code.textContent || '';
    const lines = codeText.split('\n');
    
    // remove empty last line if it exists
    if (lines[lines.length - 1] === '') {
      lines.pop();
    }
    
    // create line numbers container
    const lineNumbersDiv = document.createElement('div');
    lineNumbersDiv.className = 'line-numbers';
    
    // add a span for each line
    for (let i = 1; i <= lines.length; i++) {
      const lineSpan = document.createElement('span');
      lineSpan.textContent = i;
      lineNumbersDiv.appendChild(lineSpan);
    }
    
    // insert line numbers
    pre.style.position = 'relative';
    pre.insertBefore(lineNumbersDiv, pre.firstChild);
  }
  
  function addCodeHeader(wrapper, highlightBlock) {
    // create header
    const header = document.createElement('div');
    header.className = 'code-header';
    
    // detect language
    let language = 'code';
    if (highlightBlock) {
      const codeElement = highlightBlock.querySelector('code');
      if (codeElement) {
        const classes = codeElement.className.split(' ');
        for (let className of classes) {
          if (className.startsWith('language-')) {
            language = className.replace('language-', '');
            break;
          }
        }
      }
      
      const pre = highlightBlock.querySelector('pre');
      if (pre && pre.getAttribute('data-lang')) {
        language = pre.getAttribute('data-lang');
      }
    }
    
    // create language label
    const languageLabel = document.createElement('span');
    languageLabel.className = 'code-language';
    languageLabel.textContent = language;
    
    // create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    header.appendChild(languageLabel);
    header.appendChild(copyButton);
    
    // insert header before the code block
    wrapper.insertBefore(header, wrapper.firstChild);
    
    // add copy functionality
    copyButton.addEventListener('click', function() {
      const pre = wrapper.querySelector('pre');
      const code = pre.querySelector('code') || pre;
      
      // get text without line numbers
      let textToCopy = '';
      if (code.classList.contains('rouge-code')) {
        // rouge table format
        textToCopy = code.textContent;
      } else {
        // regular format - exclude line numbers
        const lineNumbers = pre.querySelector('.line-numbers');
        if (lineNumbers) {
          // temporarily remove line numbers to get clean text
          const tempCode = code.cloneNode(true);
          const tempLineNumbers = tempCode.querySelector('.line-numbers');
          if (tempLineNumbers) {
            tempLineNumbers.remove();
          }
          textToCopy = tempCode.textContent;
        } else {
          textToCopy = code.textContent;
        }
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
  }
  
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