/* ================================================================
   CUSTOM CURSOR — dot first, then hide native cursor (no gap)
================================================================ */
(function () {
  var dot = document.createElement('div');
  dot.style.cssText = 'position:fixed;width:10px;height:10px;background:#4a9fd4;border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);top:50vh;left:50vw;';
  document.body.appendChild(dot);
  var s = document.createElement('style');
  s.textContent = '@media (hover:hover) and (pointer:fine){html,body,*{cursor:none!important}}';
  document.head.appendChild(s);
  document.addEventListener('mousemove', function(e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
})();

/* ================================================================
   SPLASH
================================================================ */
var splash    = document.getElementById('splash');
var homepage  = document.getElementById('homepage');
var clickHint = document.getElementById('clickHint');
var splashDone = false;

setTimeout(function() { clickHint.classList.add('visible'); }, 1500);

function dismissSplash() {
  if (splashDone) return;
  splashDone = true;
  splash.classList.add('fade-out');
  setTimeout(function() {
    splash.style.display = 'none';
    homepage.style.display = 'flex';
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        homepage.classList.add('show');
        startCarousel2();
      });
    });
  }, 660);
}
splash.addEventListener('click', dismissSplash);
document.addEventListener('keydown', function(e) {
  if (!splashDone && (e.key === 'Enter' || e.key === ' ')) dismissSplash();
});

/* ================================================================
   PHONE — float + cursor parallax tilt + glare (RAF loop)
================================================================ */
var phone3d    = document.getElementById('phone3d');
var phoneGlare = document.getElementById('phoneGlare');
var floatT   = 0;
var mouseNX  = 0.5, mouseNY = 0.5;
var smoothRX = -5,  smoothRY = 20;
var glareFrame = 0;

document.addEventListener('mousemove', function(e) {
  mouseNX = e.clientX / window.innerWidth;
  mouseNY = e.clientY / window.innerHeight;
});

(function tick() {
  if (splashDone) return;

  floatT += 0.010;
  var floatPx = Math.sin(floatT) * 13;

  var dx = mouseNX - 0.5;
  var dy = mouseNY - 0.5;
  smoothRX += (-5 + dy * -12 - smoothRX) * 0.065;
  smoothRY += (20 + dx *  14 - smoothRY) * 0.065;

  phone3d.style.transform =
    'translateX(-50%) translateY(calc(-50% + ' + floatPx.toFixed(2) + 'px)) ' +
    'rotateX(' + smoothRX.toFixed(2) + 'deg) rotateY(' + smoothRY.toFixed(2) + 'deg)';

  if (++glareFrame % 3 === 0) {
    var gx = (38 + dx * 44).toFixed(1);
    var gy = (22 + dy * 38).toFixed(1);
    phoneGlare.style.background =
      'radial-gradient(ellipse at ' + gx + '% ' + gy + '%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.10) 30%, transparent 58%)';
  }

  requestAnimationFrame(tick);
})();

/* ================================================================
   IG CAROUSEL — swipe
================================================================ */
var igTrack  = document.getElementById('igTrack');
var igDotEls = Array.prototype.slice.call(document.querySelectorAll('.ig-dot'));
var IG_COUNT = 4;
var igIdx = 0;

function goIgSlide(n) {
  igDotEls[igIdx].classList.remove('active');
  igIdx = ((n % IG_COUNT) + IG_COUNT) % IG_COUNT;
  igDotEls[igIdx].classList.add('active');
  igTrack.style.transform = 'translateX(-' + (igIdx * 25) + '%)';
}
setInterval(function() { goIgSlide(igIdx + 1); }, 1500);

/* ================================================================
   HEART ANIMATION
================================================================ */
var igCarousel  = document.getElementById('igCarousel');
var igHeartPop  = document.getElementById('igHeartPop');
var igHeartPath = document.getElementById('igHeartPath');
var lastTap = 0, isLiked = false;

function triggerHeart() {
  igHeartPop.classList.remove('pop');
  void igHeartPop.offsetWidth;
  igHeartPop.classList.add('pop');
  if (!isLiked) {
    isLiked = true;
    igHeartPath.setAttribute('fill', '#ed4956');
    igHeartPath.setAttribute('stroke', '#ed4956');
  }
}
igCarousel.addEventListener('click', function() {
  var now = Date.now();
  if (now - lastTap < 340) triggerHeart();
  lastTap = now;
});
igCarousel.addEventListener('touchend', function(e) {
  var now = Date.now();
  if (now - lastTap < 340) { triggerHeart(); e.preventDefault(); }
  lastTap = now;
}, { passive: false });
setTimeout(function() { triggerHeart(); setInterval(triggerHeart, 9000); }, 2800);

/* ================================================================
   CAROUSEL 2 — swipe, starts after splash
================================================================ */
var c2Track  = document.getElementById('c2Track');
var C2_COUNT = 5;
var c2Idx = 0, c2Timer = null;

function nextC2Slide() {
  c2Idx = (c2Idx + 1) % C2_COUNT;
  c2Track.style.transform = 'translateX(-' + (c2Idx * 20).toFixed(1) + '%)';
}
function startCarousel2() {
  if (c2Timer) return;
  c2Timer = setInterval(nextC2Slide, 1200);
}
