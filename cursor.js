/* Custom cursor — small blue dot, used on all pages */
(function () {
  /* Create dot first, then hide native cursor — no gap */
  const dot = document.createElement('div');
  dot.style.cssText =
    'position:fixed;width:10px;height:10px;background:#4a9fd4;border-radius:50%;' +
    'pointer-events:none;z-index:99999;transform:translate(-50%,-50%);' +
    'top:50vh;left:50vw;';
  document.body.appendChild(dot);

  const s = document.createElement('style');
  s.textContent = '@media (hover:hover) and (pointer:fine){html,body,*{cursor:none!important}}';
  document.head.appendChild(s);

  document.addEventListener('mousemove', function (e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
})();

