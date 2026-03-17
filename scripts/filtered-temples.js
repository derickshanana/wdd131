// =====================
// Temple Data Array
// Using local images from the W02 Picture Album assignment
// =====================
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "images/aba.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "images/manti.png"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "images/provo.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "images/guam.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "images/washington.jpg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "images/nauvoo.webp"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "images/mexico-city.webp"
    },
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "images/salt-lake.jpg"
    },
    {
        templeName: "London England",
        location: "Newchapel, Surrey, England",
        dedicated: "1958, September, 7",
        area: 42652,
        imageUrl: "images/london.webp"
    },
    {
        templeName: "Los Angeles California",
        location: "Los Angeles, California, United States",
        dedicated: "1956, March, 11",
        area: 190614,
        imageUrl: "images/los-angeles.jpg"
    },
    {
        templeName: "Sydney Australia",
        location: "Sydney, New South Wales, Australia",
        dedicated: "1984, September, 20",
        area: 30677,
        imageUrl: "images/sydney.webp"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19184,
        imageUrl: "images/johannesburg.webp"
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 33600,
        imageUrl: "images/tokyo.png"
    },
    {
        templeName: "Paris France",
        location: "Le Chesnay, France",
        dedicated: "2017, May, 21",
        area: 19673,
        imageUrl: "images/paris.webp"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "images/rome.webp"
    }
];

// =====================
// Footer Dates
// =====================
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

// =====================
// Hamburger Toggle
// =====================
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
    const isHidden = nav.classList.toggle("hidden");
    hamburger.setAttribute("aria-expanded", String(!isHidden));
    hamburger.innerHTML = isHidden ? "&#9776;" : "&#10005;";
});

// =====================
// Build Temple Cards
// =====================
function createTempleCard(temple) {
    const card = document.createElement("div");
    card.classList.add("temple-card");

    card.innerHTML = `
    <img
      src="${temple.imageUrl}"
      alt="${temple.templeName} Temple"
      loading="lazy"
      width="400"
      height="250"
    >
    <div class="temple-card-body">
      <h2>${temple.templeName} Temple</h2>
      <dl>
        <dt>Location:</dt>
        <dd>${temple.location}</dd>
        <dt>Dedicated:</dt>
        <dd>${temple.dedicated}</dd>
        <dt>Area:</dt>
        <dd>${temple.area.toLocaleString()} sq ft</dd>
      </dl>
    </div>
  `;

    return card;
}

// =====================
// Display Temples
// =====================
function displayTemples(filteredList) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if (filteredList.length === 0) {
        gallery.innerHTML = `<p class="no-results">No temples match this filter.</p>`;
        return;
    }

    filteredList.forEach(temple => {
        gallery.appendChild(createTempleCard(temple));
    });
}

// =====================
// Filter Logic
// =====================
function filterTemples(filter) {
    const filterLabel = document.getElementById("filter-label");
    let result;
    let labelText;

    switch (filter) {
        case "old":
            result = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
            labelText = "Showing: Old Temples (Built Before 1900)";
            break;
        case "new":
            result = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
            labelText = "Showing: New Temples (Built After 2000)";
            break;
        case "large":
            result = temples.filter(t => t.area > 90000);
            labelText = "Showing: Large Temples (Over 90,000 sq ft)";
            break;
        case "small":
            result = temples.filter(t => t.area < 10000);
            labelText = "Showing: Small Temples (Under 10,000 sq ft)";
            break;
        default:
            result = [...temples];
            labelText = "Showing: All Temples";
    }

    filterLabel.textContent = labelText;
    displayTemples(result);
}

// =====================
// Navigation Listeners
// =====================
const navLinks = document.querySelectorAll("nav.navigation a[data-filter]");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        filterTemples(link.dataset.filter);

        // Close hamburger on mobile after selection
        if (window.innerWidth < 640) {
            nav.classList.add("hidden");
            hamburger.setAttribute("aria-expanded", "false");
            hamburger.innerHTML = "&#9776;";
        }
    });
});

// =====================
// Initial Load – show all
// =====================
filterTemples("home");