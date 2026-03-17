/**
 * place.js – W03 Country Page JavaScript
 *
 * Requirements:
 *  1. Display current year and last-modified date in the footer.
 *  2. Calculate and display wind chill on page load.
 *     - Metric formula used (temperature in °C, wind speed in km/h).
 *     - Only calculate when: temp <= 10 °C AND wind > 4.8 km/h.
 *     - Otherwise display "N/A".
 */

// ── Static weather values (update these to match your HTML content) ──────────
const TEMPERATURE_C = 28;   // °C  – matches "28 °C" displayed in HTML
const WIND_SPEED_KMH = 12;   // km/h – matches "12 km/h" displayed in HTML

// ── Wind Chill Calculation (Metric / Environment Canada formula) ──────────────
/**
 * calculateWindChill
 * @param {number} temp  – Temperature in °C
 * @param {number} wind  – Wind speed in km/h
 * @returns {number}       Wind chill factor in °C (one decimal)
 */
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// ── Display Wind Chill ────────────────────────────────────────────────────────
function displayWindChill() {
    const windChillEl = document.getElementById('wind-chill');

    if (TEMPERATURE_C <= 10 && WIND_SPEED_KMH > 4.8) {
        const chill = calculateWindChill(TEMPERATURE_C, WIND_SPEED_KMH);
        windChillEl.textContent = `${chill.toFixed(1)} °C`;
    } else {
        windChillEl.textContent = 'N/A';
    }
}

// ── Footer: Current Year & Last Modified ─────────────────────────────────────
function displayFooterDates() {
    const yearEl = document.getElementById('current-year');
    const lastModifiedEl = document.getElementById('last-modified');

    yearEl.textContent = new Date().getFullYear();
    lastModifiedEl.textContent = document.lastModified;
}

// ── Init on DOM ready ─────────────────────────────────────────────────────────
displayWindChill();
displayFooterDates();