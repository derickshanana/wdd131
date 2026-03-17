// =====================
// Footer Dates
// =====================
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = "Last Modified: " + document.lastModified;

// =====================
// Increment and Display Review Counter
// using localStorage
// =====================
let reviewCount = parseInt(localStorage.getItem("reviewCount") || "0");
reviewCount += 1;
localStorage.setItem("reviewCount", reviewCount);
document.getElementById("review-count").textContent = reviewCount;

// =====================
// Parse URL Params and Display Summary
// =====================
const params = new URLSearchParams(window.location.search);
const summary = document.getElementById("review-summary");

// Product name lookup
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Reactor" },
    { id: "jj-1969", name: "Warp Equalizer" }
];

const productId = params.get("productName");
const productObj = products.find(p => p.id === productId);
const productDisplay = productObj ? productObj.name : (productId || "N/A");

const rating = params.get("rating") || "N/A";
const installDate = params.get("installDate") || "N/A";
const userName = params.get("userName") || "Anonymous";
const writtenReview = params.get("writtenReview") || "";

// Features – may have multiple values
const featuresRaw = params.getAll("features");
const featuresDisplay = featuresRaw.length > 0
    ? featuresRaw.map(f => f.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())).join(", ")
    : "None selected";

// Star display
const stars = rating !== "N/A" ? "★".repeat(parseInt(rating)) + "☆".repeat(5 - parseInt(rating)) : "N/A";

// Build summary HTML
summary.innerHTML = `
  <dl>
    <dt>Product:</dt>
    <dd>${productDisplay}</dd>
    <dt>Rating:</dt>
    <dd class="stars-display">${stars} (${rating}/5)</dd>
    <dt>Installed:</dt>
    <dd>${installDate}</dd>
    <dt>Features:</dt>
    <dd>${featuresDisplay}</dd>
    <dt>Reviewer:</dt>
    <dd>${userName}</dd>
    ${writtenReview ? `<dt>Review:</dt><dd>${writtenReview}</dd>` : ""}
  </dl>
`;