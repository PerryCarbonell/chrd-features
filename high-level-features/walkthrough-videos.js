/**
 * Marketing walkthrough clips: muted loop autoplay while in view; no native controls; tap toggles play.
 */
(function () {
  var SELECTOR = "video.walkthrough-tap-video, video.intro-mute-autoplay-video";
  var MIN_VISIBLE = 0.2;

  function safePlay(node) {
    if (!node || typeof node.play !== "function") return;
    var p = node.play();
    if (p && typeof p.catch === "function") {
      p.catch(function () {});
    }
  }

  function prepareVideo(el) {
    el.controls = false;
    el.removeAttribute("controls");
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    if (!el.loop) {
      el.loop = true;
    }
    el.addEventListener("click", function (ev) {
      ev.preventDefault();
      if (el.paused) {
        safePlay(el);
      } else {
        el.pause();
      }
    });
  }

  function isRoughlyVisible(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.height <= 0 || vh <= 0) return false;
    var visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    return visible / rect.height >= MIN_VISIBLE;
  }

  var videos = document.querySelectorAll(SELECTOR);
  if (!videos.length) return;

  for (var i = 0; i < videos.length; i++) {
    prepareVideo(videos[i]);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      if (document.hidden) return;
      for (var j = 0; j < entries.length; j++) {
        var entry = entries[j];
        var el = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= MIN_VISIBLE) {
          safePlay(el);
        } else {
          el.pause();
        }
      }
    },
    { threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1], rootMargin: "0px" }
  );

  for (var k = 0; k < videos.length; k++) {
    observer.observe(videos[k]);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      for (var p = 0; p < videos.length; p++) {
        videos[p].pause();
      }
      return;
    }
    for (var q = 0; q < videos.length; q++) {
      if (isRoughlyVisible(videos[q])) {
        safePlay(videos[q]);
      }
    }
  });

  window.addEventListener(
    "pageshow",
    function (ev) {
      if (!ev.persisted) return;
      for (var r = 0; r < videos.length; r++) {
        if (isRoughlyVisible(videos[r])) {
          safePlay(videos[r]);
        }
      }
    }
  );
})();
