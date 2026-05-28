/**
 * cv-popups.js — bubble expand / collapse for the Life Journey timeline.
 * Each .bubble is a self-contained card. Clicking expands it in-place;
 * only one bubble can be open at a time.
 */
(function () {
  var current = null;

  function open(bubble) {
    if (current && current !== bubble) close(current);
    bubble.classList.add('is-open');
    current = bubble;
  }

  function close(bubble) {
    bubble.classList.remove('is-open');
    if (current === bubble) current = null;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var bubbles = document.querySelectorAll('.bubble');

    bubbles.forEach(function (bubble) {
      /* Click anywhere on the closed bubble header to open */
      var header = bubble.querySelector('.bubble-collapsed');
      if (header) {
        header.addEventListener('click', function () {
          if (bubble.classList.contains('is-open')) {
            close(bubble);
          } else {
            open(bubble);
          }
        });
      }

      /* × close button inside expanded view */
      var closeBtn = bubble.querySelector('.bubble-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          close(bubble);
        });
      }
    });

    /* Copy-email button */
    var copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      var originalText = copyBtn.textContent;
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText('ignacio@manzano.cc').then(function () {
          copyBtn.textContent = 'Copied!';
          setTimeout(function () {
            copyBtn.textContent = originalText;
          }, 2000);
        });
      });
    }
  });
})();
