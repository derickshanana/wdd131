// =====================
// Footer: copyright year and last modified
// =====================
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

// =====================
// Hamburger Menu Toggle
// =====================
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
    const isHidden = nav.classList.toggle("hidden");
    hamburger.setAttribute("aria-expanded", String(!isHidden));
    hamburger.innerHTML = isHidden ? "&#9776;" : "&#10005;";
});

// =====================
// Filter Navigation
// =====================
const CURRENT_YEAR = new Date().getFullYear();

const filterButtons = document.querySelectorAll("nav a[data-filter]");
const figures = document.querySelectorAll("#gallery figure");

filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = btn.dataset.filter;

        figures.forEach(fig => {
            const built = parseInt(fig.dataset.built);
            const area = parseInt(fig.dataset.area);
            const age = CURRENT_YEAR - built;

            let show = false;

            if (filter === "all") {
                show = true;
            } else if (filter === "old") {
                // Built before 1900
                show = built < 1900;
            } else if (filter === "new") {
                // Built within last 20 years
                show = age <= 20;
            } else if (filter === "large") {
                // Over 90,000 sq ft
                show = area > 90000;
            } else if (filter === "small") {
                // Under 10,000 sq ft
                show = area < 10000;
            }

            fig.style.display = show ? "block" : "none";
        });

        // Close hamburger menu on mobile after filter selection
        if (window.innerWidth < 640) {
            nav.classList.add("hidden");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.innerHTML = "&#9776;";
        }
    });
});