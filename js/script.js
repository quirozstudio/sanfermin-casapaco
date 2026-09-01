(function () {
  document.documentElement.classList.add("has-js");

  const data = window.siteData;
  if (!data) return;

  const storageKey = "casaPacoLanguage";
  const views = [...document.querySelectorAll("[data-view]")];
  const languageButtons = [...document.querySelectorAll("[data-global-lang]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const routes = new Set(["inicio", "carta", "menu-del-dia", "menu-fin-de-semana"]);
  let revealObserver;
  let currentLanguage = readLanguage();
  let activeRoute = "";

  function translated(value) {
    if (typeof value === "string") return value;
    return value?.[currentLanguage] || value?.[data.defaultLanguage] || "";
  }

  function readLanguage() {
    try {
      const saved = localStorage.getItem(storageKey);
      return data.languages.includes(saved) ? saved : data.defaultLanguage;
    } catch (error) {
      return data.defaultLanguage;
    }
  }

  function persistLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch (error) {
      // The experience still works if storage is unavailable.
    }
  }

  function updateInterfaceCopy() {
    document.querySelectorAll("[data-ui]").forEach((element) => {
      const value = data.ui[element.dataset.ui];
      if (value) element.textContent = translated(value);
    });

    document.querySelectorAll("[data-ui-aria]").forEach((element) => {
      const value = data.ui[element.dataset.uiAria];
      if (value) element.setAttribute("aria-label", translated(value));
    });

    document.querySelector(".skip-link").textContent = translated(data.ui.skip);
    document.querySelectorAll(".language-switcher").forEach((switcher) => {
      switcher.setAttribute("aria-label", translated(data.ui.languageLabel));
    });
  }

  function updateMenu(menuId) {
    const menu = data.menus[menuId];
    const root = document.getElementById(menuId);
    if (!menu || !root) return;

    const heading = root.querySelector(":scope > .menu-heading");
    heading.querySelector(".eyebrow").textContent = translated(menu.eyebrow);
    heading.querySelector("h2").textContent = translated(menu.title);
    heading.querySelector(":scope > p").textContent = translated(menu.included);

    const courseElements = [...root.querySelectorAll(":scope > .courses-grid > .course")];
    courseElements.forEach((courseElement, courseIndex) => {
      const course = menu.courses[courseIndex];
      if (!course) return;

      courseElement.querySelector(".course-title h3").textContent = translated(course.title);
      const dishElements = [...courseElement.querySelectorAll(":scope > .dish-list > li")];
      dishElements.forEach((dishElement, dishIndex) => {
        const dish = course.dishes[dishIndex];
        if (!dish) return;
        dishElement.querySelector("strong").textContent = translated(dish.name);
        const allergenElement = dishElement.querySelector("small");
        const allergenText = translated(dish.allergens);
        allergenElement.textContent = allergenText;
        if (menuId === "menu-del-dia" || menuId === "menu-fin-de-semana") {
          allergenElement.setAttribute("aria-label", allergenText);
          const tokens = allergenText.split(" · ").map((label) => {
            const token = document.createElement("span");
            token.textContent = label;
            token.setAttribute("aria-hidden", "true");
            if (/^(sin gluten|opción sin gluten|gluten-free|option sans gluten)/i.test(label)) {
              token.classList.add("allergen-token--option");
            }
            return token;
          });
          allergenElement.replaceChildren(...tokens);
        }
        const extra = dishElement.querySelector(":scope > span");
        if (extra && dish.extra) extra.textContent = translated(dish.extra);
      });
    });
  }

  function updateLanguageButtons() {
    languageButtons.forEach((button) => {
      const isActive = button.dataset.globalLang === currentLanguage;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("is-active", isActive);
    });
  }

  function setLanguage(language, { announce = true } = {}) {
    if (!data.languages.includes(language)) return;
    currentLanguage = language;
    document.documentElement.lang = language;
    persistLanguage(language);
    updateInterfaceCopy();
    updateMenu("menu-del-dia");
    updateMenu("menu-fin-de-semana");
    updateLanguageButtons();
    updateDocumentTitle();

    if (announce) {
      window.dispatchEvent(new CustomEvent("casa-paco:languagechange", { detail: { language } }));
    }
  }

  function routeFromHash() {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash.startsWith("carta-")) return "carta";
    return routes.has(hash) ? hash : "inicio";
  }

  function updateDocumentTitle() {
    const titles = {
      inicio: "Casa Paco · Pamplona",
      carta: translated(data.ui.carta),
      "menu-del-dia": translated(data.ui.daily),
      "menu-fin-de-semana": translated(data.ui.weekend),
    };
    document.title = activeRoute === "inicio" ? titles.inicio : `${titles[activeRoute]} | Casa Paco Pamplona`;
  }

  function setupReveals(container) {
    if (revealObserver) revealObserver.disconnect();
    const items = [...container.querySelectorAll(".reveal")];
    items.forEach((item) => item.classList.remove("is-visible"));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );
    items.forEach((item) => revealObserver.observe(item));
  }

  function renderRoute() {
    const route = routeFromHash();
    const routeChanged = activeRoute !== route;
    activeRoute = route;
    document.body.dataset.activeView = route;

    views.forEach((view) => {
      view.hidden = view.dataset.view !== route;
    });

    const activeView = views.find((view) => view.dataset.view === route);
    if (activeView) setupReveals(activeView);
    updateDocumentTitle();

    if (routeChanged && !window.location.hash.slice(1).startsWith("carta-")) {
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.globalLang));
  });

  window.addEventListener("hashchange", renderRoute);
  window.casaPacoApp = {
    getLanguage: () => currentLanguage,
    setLanguage,
    navigate: (route) => {
      if (routes.has(route)) window.location.hash = route;
    },
  };

  setLanguage(currentLanguage);
  renderRoute();
})();
