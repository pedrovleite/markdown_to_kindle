(function () {
  const STORAGE_KEY = "mdtoepub-theme";
  const VALID_THEMES = new Set(["system", "light", "dark"]);
  const MOBILE_NAV_MEDIA = "(max-width: 768px)";
  const root = document.documentElement;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const mobileNavQuery = window.matchMedia(MOBILE_NAV_MEDIA);

  function getStoredPreference() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return VALID_THEMES.has(stored) ? stored : "system";
    } catch {
      return "system";
    }
  }

  function resolveTheme(preference) {
    if (preference === "light" || preference === "dark") {
      return preference;
    }

    return mediaQuery.matches ? "dark" : "light";
  }

  function updateMetaThemeColor(resolvedTheme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) return;

    const darkColor =
      getComputedStyle(root).getPropertyValue("--theme-color-dark").trim() ||
      "#0e0e0f";
    const lightColor =
      getComputedStyle(root).getPropertyValue("--theme-color-light").trim() ||
      "#f5efe3";

    metaThemeColor.setAttribute(
      "content",
      resolvedTheme === "dark" ? darkColor : lightColor,
    );
  }

  function applyTheme(preference, persist = false) {
    const safePreference = VALID_THEMES.has(preference)
      ? preference
      : "system";
    const resolvedTheme = resolveTheme(safePreference);

    root.dataset.themePreference = safePreference;
    root.dataset.theme = resolvedTheme;

    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, safePreference);
      } catch {
        // Ignore storage failures in private browsing modes.
      }
    }

    updateMetaThemeColor(resolvedTheme);
    syncToggleState(safePreference);
  }

  function syncToggleState(preference) {
    document.querySelectorAll("[data-theme-option]").forEach((button) => {
      const isActive = button.getAttribute("data-theme-option") === preference;
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function buildToggle() {
    if (document.querySelector(".theme-controls")) return;

    const nav = document.querySelector("nav");
    if (!nav) return;

    const controls = document.createElement("div");
    controls.className = "theme-controls";
    controls.innerHTML = `
      <span class="theme-controls-label">Theme</span>
      <div class="theme-toggle" role="group" aria-label="Theme selector">
        <button type="button" class="theme-toggle-option" data-theme-option="light">Light</button>
        <button type="button" class="theme-toggle-option" data-theme-option="dark">Dark</button>
        <button type="button" class="theme-toggle-option" data-theme-option="system">System</button>
      </div>
    `;

    const spacer = nav.querySelector(".nav-spacer");
    if (spacer) {
      spacer.insertAdjacentElement("afterend", controls);
    } else {
      nav.appendChild(controls);
    }

    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-option]");
      if (!button) return;
      applyTheme(button.getAttribute("data-theme-option"), true);
    });

    syncToggleState(root.dataset.themePreference || getStoredPreference());
  }

  function setMobileNavState(nav, toggle, isOpen) {
    nav.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  function buildMobileMenu() {
    const nav = document.querySelector("nav");
    if (!nav || nav.querySelector(".nav-menu-toggle")) return;

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-menu-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Toggle navigation menu");
    toggle.innerHTML =
      '<span class="nav-menu-toggle-line" aria-hidden="true"></span><span>Menu</span>';

    nav.prepend(toggle);

    toggle.addEventListener("click", () => {
      const isOpen = !nav.classList.contains("nav-open");
      setMobileNavState(nav, toggle, isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (!mobileNavQuery.matches) return;
      if (!event.target.closest("a")) return;
      setMobileNavState(nav, toggle, false);
    });

    const syncNavState = () => {
      if (!mobileNavQuery.matches) {
        setMobileNavState(nav, toggle, false);
      }
    };

    if (typeof mobileNavQuery.addEventListener === "function") {
      mobileNavQuery.addEventListener("change", syncNavState);
    } else if (typeof mobileNavQuery.addListener === "function") {
      mobileNavQuery.addListener(syncNavState);
    }
  }

  function handleSystemThemeChange() {
    if ((root.dataset.themePreference || "system") === "system") {
      applyTheme("system", false);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildToggle();
    buildMobileMenu();
    applyTheme(root.dataset.themePreference || getStoredPreference(), false);
  });

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleSystemThemeChange);
  }

  window.mdtoepubTheme = {
    applyTheme,
    getStoredPreference,
  };
})();