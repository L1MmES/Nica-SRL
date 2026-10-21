(function () {
  "use strict";

  var projectGalleries = {
    project1: [
      "assets/projects/project-1/project1-1.jpg",
      "assets/projects/project-1/project1-2.jpg",
      "assets/projects/project-1/project1-3.jpg",
      "assets/projects/project-1/project1-4.jpg",
      "assets/projects/project-1/project1-5.jpg",
      "assets/projects/project-1/project1-6.jpg"
    ],
    project2: [
      "assets/projects/project-2/project2-1.jpg",
      "assets/projects/project-2/project2-2.jpg",
      "assets/projects/project-2/project2-3.jpg"
    ],
    project3: [
      "assets/projects/project-3/project3-1.jpg",
      "assets/projects/project-3/project3-2.jpg",
      "assets/projects/project-3/project3-3.jpg",
      "assets/projects/project-3/project3-4.jpg",
      "assets/projects/project-3/project3-5.jpg"
    ],
    project4: [
      "assets/projects/project-4/project4-1.jpg",
      "assets/projects/project-4/project4-2.jpg",
      "assets/projects/project-4/project4-3.jpg",
      "assets/projects/project-4/project4-4.jpg",
      "assets/projects/project-4/project4-5.jpg",
      "assets/projects/project-4/project4-6.jpg"
    ],
    project5: [
      "assets/projects/project-5/project5-1.jpg",
      "assets/projects/project-5/project5-2.jpg",
      "assets/projects/project-5/project5-3.jpg",
      "assets/projects/project-5/project5-4.jpg",
      "assets/projects/project-5/project5-5.jpg",
      "assets/projects/project-5/project5-6.jpg",
      "assets/projects/project-5/project5-7.jpg",
      "assets/projects/project-5/project5-8.jpg",
      "assets/projects/project-5/project5-9.jpg"
    ],
    project6: [
      "assets/projects/project-6/project6-1.jpg",
      "assets/projects/project-6/project6-2.jpg",
      "assets/projects/project-6/project6-3.jpg",
      "assets/projects/project-6/project6-4.jpg",
      "assets/projects/project-6/project6-5.jpg",
      "assets/projects/project-6/project6-6.jpg"
    ]
  };

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Chiudi il menu" : "Apri il menu");
  }
  toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 900) setMenu(false); });

  /* Highlight the nav link of the section currently in view */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var targets = links.map(function (l) { return document.querySelector(l.getAttribute("href")); });
  function updateActive() {
    var y = window.scrollY + 120, current = 0;
    targets.forEach(function (t, i) { if (t && t.offsetTop <= y) current = i; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = targets.length - 1;
    links.forEach(function (l, i) { l.classList.toggle("is-active", i === current); });
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();

    /* Project photo galleries */
  document.querySelectorAll(".project-media[data-gallery]").forEach(function (gallery) {
    var galleryName = gallery.dataset.gallery;
    var photos = projectGalleries[galleryName];

    if (!photos || photos.length === 0) return;

    var img = gallery.querySelector(".project-image");
    var counter = gallery.querySelector(".gallery-counter");
    var prev = gallery.querySelector(".gallery-prev");
    var next = gallery.querySelector(".gallery-next");

    var currentIndex = 0;

    function showPhoto(index) {
      currentIndex = (index + photos.length) % photos.length;

      img.src = photos[currentIndex];
      counter.textContent = (currentIndex + 1) + " / " + photos.length;
    }

    prev.addEventListener("click", function () {
      showPhoto(currentIndex - 1);
    });

    next.addEventListener("click", function () {
      showPhoto(currentIndex + 1);
    });

    showPhoto(0);
  });

  /* Project modal (<dialog>: Escape closes it natively) */
  var modal = document.getElementById("project-modal");
  var mImg = document.getElementById("modal-img");
  var mTitle = document.getElementById("modal-title");
  var mText = document.getElementById("modal-text");
  document.querySelectorAll(".project-more").forEach(function (button) {
    button.addEventListener("click", function () {
      var card = button.closest(".project-card");
      var img = card.querySelector("img");
      mImg.src = img.getAttribute("src");
      mImg.alt = img.getAttribute("alt");
      mTitle.textContent = card.querySelector("h3").textContent;
      mText.textContent = card.querySelector(".project-desc").textContent;
      if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    });
  });
  modal.querySelector(".modal-close").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); }); /* click on backdrop */
})();