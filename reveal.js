/* Single-shot scroll reveals. Each element is revealed once and then no longer
   watched. The hidden start states live behind the .js class, which is set by
   an inline script in <head> — so with JavaScript off nothing is ever hidden
   and the page is simply finished. */
(function () {
  var SEL = '[data-rv],[data-rv-rule],[data-rv-stem],[data-rv-belief],[data-rv-sprig]';
  var targets = document.querySelectorAll(SEL);

  if (!('IntersectionObserver' in window)) {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('is-in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

  for (var j = 0; j < targets.length; j++) io.observe(targets[j]);

  /* Safety net: if the observer never fires (a restored tab, a jump straight to
     an anchor), reveal anything already inside the viewport after 4 seconds.
     Motion is an enhancement; text being visible is not negotiable. */
  setTimeout(function () {
    document.querySelectorAll(SEL).forEach(function (t) {
      if (t.classList.contains('is-in')) return;
      var r = t.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) t.classList.add('is-in');
    });
  }, 4000);
})();
