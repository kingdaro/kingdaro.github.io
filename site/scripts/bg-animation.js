(function() {
  window.addEventListener('load', function() {
    var animationLoop, canvas, canvasElement, currentTime, draw, drawOrb, i, j, newOrb, orbStartTime, orbTimer, orbs, update;
    canvasElement = document.querySelector('canvas.bg-animation');
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    canvas = canvasElement.getContext('2d');
    orbs = [];
    orbTimer = 0.3;
    orbStartTime = orbTimer;
    currentTime = Date.now();
    canvas.font = '16pt sans-serif';
    canvas.fillStyle = 'rgba(255, 255, 255, 0.02)';
    newOrb = function() {
      orbs.push({
        x: window.innerWidth + 100,
        y: Math.random() * window.innerHeight,
        size: Math.random() + 0.2
      });
    };
    drawOrb = function(orb) {
      canvas.beginPath();
      canvas.arc(orb.x, orb.y, 80 * orb.size, 0, Math.PI * 2);
      canvas.fill();
    };
    update = function(delta) {
      if ((orbTimer = orbTimer - delta) <= 0) {
        orbTimer += orbStartTime;
        newOrb();
      }
      orbs = orbs.filter(function(orb) {
        orb.x -= 100 * delta * orb.size;
        return orb.x > -100;
      });
    };
    draw = function() {
      var j, len, orb;
      canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (j = 0, len = orbs.length; j < len; j++) {
        orb = orbs[j];
        drawOrb(orb);
      }
    };
    animationLoop = function() {
      var delta;
      delta = (Date.now() - currentTime) * 0.001;
      currentTime = Date.now();
      if (document.hasFocus()) {
        update(delta);
      }
      draw();
      window.requestAnimationFrame(animationLoop);
    };
    for (i = j = 1; j <= 250; i = ++j) {
      update(0.1);
    }
    animationLoop();
  });

}).call(this);

//# sourceMappingURL=bg-animation.js.map