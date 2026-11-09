/**
 * D-29: GSAP ScrollTrigger parallax on /about/ only.
 * Reduced motion → kill triggers. No-JS HTML stays complete without this file.
 */
export async function bootAboutParallax() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return;

  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const layers = document.querySelectorAll("[data-speed]");
  const triggers = [];

  layers.forEach((el) => {
    const speed = Number(el.getAttribute("data-speed") || "1");
    const tween = gsap.to(el, {
      y: () => (1 - speed) * 120,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("[data-scene]") || el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  const kill = () => {
    triggers.forEach((t) => t.kill());
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };

  reduce.addEventListener("change", (e) => {
    if (e.matches) kill();
  });
}

if (typeof document !== "undefined") {
  bootAboutParallax();
}
