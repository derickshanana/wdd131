// =====================
// Product Data Array
// =====================
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// =====================
// Populate Product Select Dynamically
// =====================
const productSelect = document.getElementById("product-name");

products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    productSelect.appendChild(option);
});

// =====================
// Footer Dates
// =====================
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

// =====================
// Star Rating – highlight stars up to selected
// =====================
const starLabels = document.querySelectorAll(".star-rating label");
const starInputs = document.querySelectorAll(".star-rating input[type='radio']");

starLabels.forEach((label, index) => {
    // Hover: highlight stars 0 through index
    label.addEventListener("mouseenter", () => {
        starLabels.forEach((l, i) => {
            l.style.color = i <= index
                ? "var(--color-accent-light)"
                : "var(--color-star-empty)";
        });
    });

    // Mouse leave: restore to selected state
    label.addEventListener("mouseleave", () => {
        highlightSelected();
    });

    // Click: mark selection
    label.addEventListener("click", () => {
        highlightSelected();
    });
});

function highlightSelected() {
    let selectedIndex = -1;
    starInputs.forEach((input, i) => {
        if (input.checked) selectedIndex = i;
    });
    starLabels.forEach((l, i) => {
        l.style.color = i <= selectedIndex
            ? "var(--color-star)"
            : "var(--color-star-empty)";
    });
}