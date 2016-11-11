(function(){

  'use strict';

  var body, bars;

  /**
   * for scroll event
   */
  function scroll() {
    var range, top, percentage, i, len,
        minPercentage, maxPercentage, barPercentage;

    if (!bars) {
      return;
    }

    range = body.clientHeight - window.innerHeight;
    top = scrollTop.get();

    percentage = (top / range);

    for (i = 0, len = bars.length; i < len; ++i) {
      minPercentage = parseInt(bars[i].getAttribute('data-min-percentage'), 10);
      maxPercentage = parseInt(bars[i].getAttribute('data-max-percentage'), 10);

      isNaN(minPercentage) && (minPercentage = 0);
      isNaN(maxPercentage) && (maxPercentage = 100);

      barPercentage = percentage * (maxPercentage - minPercentage) + minPercentage;

      bars[i].style.width = Math.floor(barPercentage) + '%';
    }
  }

  window.addEventListener('resize', debounce(scroll, 50), false);
  window.addEventListener('scroll', throttle(scroll, 15), false);

  document.addEventListener('DOMContentLoaded', function() {
    body = document.body;
    bars = document.querySelectorAll('[data-bar]');
  }, false);

}());
