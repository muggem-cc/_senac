const viewer = document.querySelector(".viewer");
const content = viewer.querySelector(".viewer-content");

function show(link) {
  const frame = document.createElement("iframe");
  const isVideo = link.dataset.viewer === "video";
  frame.src = isVideo
    ? `https://www.youtube-nocookie.com/embed/${new URL(link.href).searchParams.get("v")}?autoplay=1`
    : link.href;
  viewer.classList.toggle("viewer--video", isVideo);
  viewer.classList.toggle("viewer--site", !isVideo);
  frame.title = link.getAttribute("aria-label");
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.allowFullscreen = true;
  content.replaceChildren(frame);
  viewer.showModal();
}

document.querySelectorAll("[data-viewer]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    show(link);
  });
});

viewer.addEventListener("close", () => {
  content.replaceChildren();
  viewer.classList.remove("viewer--video", "viewer--site");
});
viewer.addEventListener("click", (event) => {
  if (event.target === viewer) viewer.close();
});
