/* Full-screen helper for the Drive video player.
   Works on iPhone/Android/desktop: uses a "pseudo" full screen (fixed layer)
   and rotates the video sideways when the phone is held upright. */
(function () {
  var video = document.getElementById("video");
  var viewer = document.querySelector(".viewer");
  if (!video || !viewer) return;

  /* toolbar under the video */
  var bar = document.createElement("div");
  bar.className = "video-tools";
  var open = document.createElement("button");
  open.type = "button";
  open.className = "fs-btn";
  open.textContent = "\u26F6  Full screen";
  bar.appendChild(open);
  video.insertAdjacentElement("afterend", bar);

  /* close button (only visible in full screen) */
  var close = document.createElement("button");
  close.type = "button";
  close.className = "fs-close";
  close.textContent = "\u2715  Close";
  close.hidden = true;
  document.body.appendChild(close);

  function applyRotation() {
    var on = video.classList.contains("fs-on");
    var portrait = window.innerHeight > window.innerWidth;
    video.classList.toggle("fs-rotate", on && portrait);
  }

  function enter() {
    video.classList.add("fs-on");
    document.body.classList.add("fs-lock");
    close.hidden = false;
    applyRotation();
    /* where supported (Android/desktop) also hide the browser bars + lock landscape */
    try {
      var p = document.documentElement.requestFullscreen &&
              document.documentElement.requestFullscreen();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
    try {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch(function () {});
      }
    } catch (e) {}
  }

  function exit() {
    video.classList.remove("fs-on", "fs-rotate");
    document.body.classList.remove("fs-lock");
    close.hidden = true;
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      }
      if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
    } catch (e) {}
  }

  open.addEventListener("click", enter);
  close.addEventListener("click", exit);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && video.classList.contains("fs-on")) exit();
  });
  document.addEventListener("fullscreenchange", function () {
    /* user left native full screen (Esc / back gesture) -> leave ours too */
    if (!document.fullscreenElement && video.classList.contains("fs-on")) exit();
  });
  window.addEventListener("resize", applyRotation);
  window.addEventListener("orientationchange", function () { setTimeout(applyRotation, 150); });
})();
