document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const toggle = document.getElementById("theme-toggle");
    const label = toggle?.querySelector(".theme-toggle-label");

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // light on left, dark on right
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    const icon = toggle.querySelector(".theme-icon");

    applyTheme(initialTheme);
    updateThemeLabel(initialTheme);

    if (toggle) {
        toggle.addEventListener("click", () => {
            const currentTheme = root.dataset.theme || "light";
            const newTheme = currentTheme === "light" ? "dark" : "light";

            document.documentElement.classList.add("theme-fading");

            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    applyTheme(newTheme);
                    updateThemeLabel(newTheme);
                });
            } else {
                applyTheme(newTheme);
                updateThemeLabel(newTheme);
            }

            toggle.classList.remove("clicked");
            void toggle.offsetWidth;
            toggle.classList.add("clicked");

            setTimeout(() => {
                toggle.classList.remove("clicked");
            }, 220);

            setTimeout(() => {
                document.documentElement.classList.remove("theme-fading");
            }, 400);
        });
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }

   function updateThemeLabel(theme) {
        if (!label) return;
        label.textContent = theme === "light" ? "Light Mode" : "Dark Mode";

        if (icon) {
            icon.textContent = theme === "light" ? "☀️" : "🌙";
        }
    }

    const container = document.getElementById("projects");

    if (container) {
        container.addEventListener("click", (e) => {
            const card = e.target.closest("project-card");
            if (!card || !container.contains(card)) return;

            const clickedLink = e.target.closest("a");
            if (clickedLink) return;

            const link = card.getAttribute("link");
            if (link && link !== "#") {
                window.open(link, "_blank");
            }
        });
    }
});