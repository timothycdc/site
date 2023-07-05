import React, { useEffect } from 'react';
import Clipboard from 'clipboard';

const codeBlock = ({ children }) => {
  useEffect(() => {
    // select all pre elements (or whatever elements you're using for your code blocks)
    const pres = document.querySelectorAll('pre');
    pres.forEach((pre) => {
      // create a button element
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = 'Copy';

      // append the button to the pre element
      pre.appendChild(button);
    });

    // instantiate Clipboard
    const clipboard = new Clipboard('.copy-button', {
      target: function(trigger) {
        return trigger.previousElementSibling;
      }
    });

    clipboard.on('success', function(e) {
      e.trigger.textContent = 'Copied!';
      setTimeout(() => {
        e.trigger.textContent = 'Copy';
      }, 2000);
    });

  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

export default codeBlock;
