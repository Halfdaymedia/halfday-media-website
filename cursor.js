/* Custom cursor — small blue dot, used on all pages */
(function () {
  /* Inject cursor:none only for mouse-based devices */
  const s = document.createElement('style');
  s.textContent = '@media (hover:hover) and (pointer:fine){*,*::before,*::after{cursor:none!important}}';
  document.head.appendChild(s);

  const dot = document.createElement('div');
  dot.style.cssText =
    'position:fixed;width:10px;height:10px;background:#4a9fd4;border-radius:50%;' +
    'pointer-events:none;z-index:99999;transform:translate(-50%,-50%);' +
    'top:-20px;left:-20px;will-change:left,top;';
  document.body.appendChild(dot);

  document.addEventListener('mousemove', function (e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
})();
