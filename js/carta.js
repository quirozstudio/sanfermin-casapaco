(function () {
  const data = window.cartaData;
  const carta = document.getElementById("carta");
  const categoryNav = document.getElementById("carta-category-nav");
  const menuRoot = document.getElementById("carta-menu");
  const dialog = document.getElementById("dish-dialog");

  if (!data || !carta || !categoryNav || !menuRoot || !dialog) return;

  const dialogClose = dialog.querySelector(".dish-sheet__close");
  const dialogImage = dialog.querySelector(".dish-sheet__image");
  const dialogMedia = dialog.querySelector(".dish-sheet__media");
  const dishIndex = new Map();
  let currentLanguage = readLanguage();
  let activeCategoryId = categoryFromHash() || data.categories[0]?.id;
  let lastTrigger;

  data.categories.forEach((category) => {
    category.dishes.forEach((dish) => dishIndex.set(dish.id, { dish, category }));
  });

  function readLanguage() {
    try {
      const saved = localStorage.getItem("casaPacoLanguage");
      return data.languages.some((item) => item.code === saved) ? saved : data.defaultLanguage;
    } catch (error) {
      return data.defaultLanguage;
    }
  }

  function translated(value) {
    if (typeof value === "string") return value;
    return value[currentLanguage] || value[data.defaultLanguage] || "";
  }

  function categoryFromHash() {
    const match = window.location.hash.match(/^#carta-(.+)$/);
    return data.categories.some((category) => category.id === match?.[1]) ? match[1] : null;
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function renderCategoryNav() {
    categoryNav.replaceChildren();
    categoryNav.setAttribute("role", "tablist");

    data.categories.forEach((category) => {
      const link = createElement("a", "carta-category-link", translated(category.label));
      link.href = `#carta-${category.id}`;
      link.dataset.categoryId = category.id;
      link.id = `carta-tab-${category.id}`;
      link.setAttribute("role", "tab");
      link.setAttribute("aria-controls", `carta-${category.id}`);
      categoryNav.append(link);
    });

    updateActiveCategory();
  }

  function createBadge(type) {
    if (!type) return null;
    const label = type === "special" ? data.ui.special : data.ui.recommended;
    return createElement("span", `carta-badge carta-badge--${type}`, translated(label));
  }

  function createDishRow(dish) {
    const row = createElement("article", "carta-dish");
    row.dataset.dishId = dish.id;
    if (dish.badge) row.classList.add(`carta-dish--${dish.badge}`);

    const heading = createElement("div", "carta-dish__heading");
    const nameGroup = createElement("div", "carta-dish__name-group");
    const badge = createBadge(dish.badge);
    if (badge) nameGroup.append(badge);
    nameGroup.append(createElement("h4", "carta-dish__name", translated(dish.name)));

    const leader = createElement("span", "carta-dish__leader");
    leader.setAttribute("aria-hidden", "true");
    heading.append(nameGroup, leader, createElement("strong", "carta-dish__price", translated(dish.price)));

    const detail = createElement("div", "carta-dish__detail");
    const copy = createElement("div", "carta-dish__copy");
    copy.append(createElement("p", "carta-dish__description", translated(dish.description)));
    const allergens = createElement("p", "carta-dish__allergens");
    const translatedAllergens = translated(dish.allergens);
    const hasGlutenOption = /opción sin gluten|gluten-free option|option sans gluten/i.test(translatedAllergens);
    if (hasGlutenOption) {
      const glutenIcon = createElement("span", "carta-dish__gluten-icon", "GF");
      glutenIcon.setAttribute("aria-hidden", "true");
      allergens.append(glutenIcon);
    }
    allergens.append(
      createElement("span", "carta-dish__allergens-label", `${translated(data.ui.allergens)}:`),
      document.createTextNode(` ${translatedAllergens}`),
    );
    copy.append(allergens);
    detail.append(copy);

    const infoButton = createElement("button", "carta-dish__info");
    infoButton.type = "button";
    infoButton.dataset.dishInfo = dish.id;
    infoButton.setAttribute("aria-label", `${translated(data.ui.moreInfo)}: ${translated(dish.name)}`);
    const infoMark = createElement("span", "", "i");
    infoMark.setAttribute("aria-hidden", "true");
    infoButton.append(infoMark);
    detail.append(infoButton);

    row.append(heading, detail);
    return row;
  }

  function renderMenu() {
    menuRoot.replaceChildren();

    data.categories.forEach((category) => {
      const section = createElement("section", "carta-category");
      section.id = `carta-${category.id}`;
      section.dataset.categorySection = category.id;
      section.setAttribute("role", "tabpanel");
      section.setAttribute("aria-labelledby", `carta-tab-${category.id}`);

      const header = createElement("header", "carta-category__header");
      const number = createElement("span", "carta-category__number", category.number);
      const headingGroup = createElement("div", "carta-category__heading-group");
      headingGroup.append(
        createElement("p", "carta-category__overline", translated(data.ui.categoryLabel)),
        createElement("h3", "carta-category__title", translated(category.title)),
      );
      headingGroup.lastElementChild.id = `carta-${category.id}-title`;
      header.append(number, headingGroup);
      if (category.note) header.append(createElement("p", "carta-category__note", translated(category.note)));

      const list = createElement("div", "carta-dish-list");
      category.dishes.forEach((dish) => list.append(createDishRow(dish)));
      section.append(header, list);
      menuRoot.append(section);
    });

    updateActiveCategory();
  }

  function updateActiveCategory() {
    categoryNav.querySelectorAll("[data-category-id]").forEach((link) => {
      const isActive = link.dataset.categoryId === activeCategoryId;
      link.setAttribute("aria-selected", String(isActive));
      link.tabIndex = isActive ? 0 : -1;
      if (isActive) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });

    menuRoot.querySelectorAll("[data-category-section]").forEach((section) => {
      section.hidden = section.dataset.categorySection !== activeCategoryId;
    });

    const activeLink = categoryNav.querySelector(`[data-category-id="${activeCategoryId}"]`);
    activeLink?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
  }

  function selectCategory(categoryId, { updateHash = true, focus = false } = {}) {
    if (!data.categories.some((category) => category.id === categoryId)) return;
    activeCategoryId = categoryId;
    updateActiveCategory();

    const activeLink = categoryNav.querySelector(`[data-category-id="${categoryId}"]`);
    if (focus) activeLink?.focus();
    if (updateHash && window.location.hash !== `#carta-${categoryId}`) {
      window.history.pushState(null, "", `#carta-${categoryId}`);
    }
  }

  function updateStaticCopy() {
    carta.lang = currentLanguage;
    carta.querySelector("[data-carta-kicker]").textContent = translated(data.ui.kicker);
    carta.querySelector("[data-carta-title]").textContent = translated(data.ui.title);
    carta.querySelector("[data-carta-stamp]").textContent = translated(data.ui.stamp);
    carta.querySelector("[data-carta-tagline]").textContent = translated(data.ui.tagline);
    carta.querySelector("[data-carta-note]").textContent = translated(data.ui.note);
    categoryNav.setAttribute("aria-label", translated(data.ui.categoriesLabel));
    dialogClose.setAttribute("aria-label", translated(data.ui.close));
    dialog.querySelector("[data-sheet-description-label]").textContent = translated(data.ui.description);
    dialog.querySelector("[data-sheet-ingredients-label]").textContent = translated(data.ui.ingredients);
    dialog.querySelector("[data-sheet-allergens-label]").textContent = translated(data.ui.allergens);

  }

  function setLanguage(language) {
    if (!data.languages.some((item) => item.code === language)) return;
    currentLanguage = language;
    updateStaticCopy();
    renderCategoryNav();
    renderMenu();

    if (dialog.open && lastTrigger) {
      openDish(lastTrigger.dataset.dishInfo, lastTrigger);
    }
  }

  function openDish(dishId, trigger) {
    const entry = dishIndex.get(dishId);
    if (!entry) return;

    const { dish, category } = entry;
    lastTrigger = trigger;
    dialog.querySelector("[data-sheet-category]").textContent = translated(category.label);
    dialog.querySelector("[data-sheet-name]").textContent = translated(dish.name);
    dialog.querySelector("[data-sheet-price]").textContent = translated(dish.price);
    dialog.querySelector("[data-sheet-description]").textContent = translated(dish.description);
    dialog.querySelector("[data-sheet-ingredients]").textContent = translated(dish.ingredients);
    dialog.querySelector("[data-sheet-allergens]").textContent = translated(dish.allergens);

    if (dish.image) {
      dialogImage.src = dish.image.src;
      dialogImage.alt = translated(dish.image.alt || dish.name);
      dialogMedia.hidden = false;
    } else {
      dialogImage.removeAttribute("src");
      dialogImage.alt = "";
      dialogMedia.hidden = true;
    }

    document.body.classList.add("dish-sheet-open");
    if (dialog.open) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeDialog() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  window.addEventListener("casa-paco:languagechange", (event) => {
    setLanguage(event.detail.language);
  });

  window.addEventListener("popstate", () => {
    const categoryId = categoryFromHash();
    if (categoryId) selectCategory(categoryId, { updateHash: false });
  });

  categoryNav.addEventListener("click", (event) => {
    const link = event.target.closest("[data-category-id]");
    if (!link) return;
    event.preventDefault();
    selectCategory(link.dataset.categoryId);
  });

  categoryNav.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const categories = data.categories.map((category) => category.id);
    const currentIndex = categories.indexOf(activeCategoryId);
    let nextIndex = currentIndex;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + categories.length) % categories.length;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % categories.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = categories.length - 1;
    selectCategory(categories[nextIndex], { focus: true });
  });

  menuRoot.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-dish-info]");
    if (trigger) openDish(trigger.dataset.dishInfo, trigger);
  });

  dialogClose.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dish-sheet-open");
    lastTrigger?.focus();
  });
  dialog.addEventListener("cancel", () => {
    document.body.classList.remove("dish-sheet-open");
  });

  updateStaticCopy();
  renderCategoryNav();
  renderMenu();
})();
