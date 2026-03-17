/* ================================================================
   Zimbabwe Wild – Visit Page (visit.js)
   Form handling, validation, localStorage, and trip summary
   ================================================================ */

'use strict';

const PREFS_KEY = 'zimwild_trip_prefs';

/* ----------------------------------------------------------------
   PARK OPTIONS for the select element (shared data)
   ---------------------------------------------------------------- */
const parkOptions = [
    { value: '', label: '— Select a park —' },
    { value: 'hwange', label: 'Hwange National Park' },
    { value: 'mana-pools', label: 'Mana Pools National Park' },
    { value: 'gonarezhou', label: 'Gonarezhou National Park' },
    { value: 'matobo', label: 'Matobo National Park' },
    { value: 'nyanga', label: 'Nyanga National Park' },
    { value: 'zambezi', label: 'Zambezi National Park' },
    { value: 'undecided', label: 'Not sure yet — help me choose' }
];

/* ----------------------------------------------------------------
   MONTH LABELS for display
   ---------------------------------------------------------------- */
const monthLabels = {
    january: 'January', february: 'February', march: 'March',
    april: 'April', may: 'May', june: 'June',
    july: 'July', august: 'August', september: 'September',
    october: 'October', november: 'November', december: 'December'
};

/* ----------------------------------------------------------------
   BUILD PARK SELECT – populate options from array
   ---------------------------------------------------------------- */
function buildParkSelect() {
    const select = document.getElementById('park-select');
    if (!select) { return; }

    select.innerHTML = parkOptions
        .map(opt => `<option value="${opt.value}">${opt.label}</option>`)
        .join('');
}

/* ----------------------------------------------------------------
   VALIDATE FORM – check required fields, return error message or ''
   ---------------------------------------------------------------- */
function validateForm(data) {
    if (!data.firstName.trim()) {
        return 'Please enter your first name.';
    }
    if (!data.email.trim() || !data.email.includes('@')) {
        return 'Please enter a valid email address.';
    }
    if (!data.park) {
        return 'Please select a national park (or choose "Not sure yet").';
    }
    if (!data.month) {
        return 'Please select your preferred travel month.';
    }
    if (data.groupSize < 1 || data.groupSize > 50) {
        return 'Please enter a valid group size (1–50).';
    }
    return '';
}

/* ----------------------------------------------------------------
   COLLECT FORM DATA – gather all inputs into one object
   ---------------------------------------------------------------- */
function collectFormData() {
    const activities = Array.from(
        document.querySelectorAll('input[name="activity"]:checked')
    ).map(cb => cb.value);

    return {
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        park: document.getElementById('park-select').value,
        month: document.getElementById('travel-month').value,
        groupSize: parseInt(document.getElementById('group-size').value, 10) || 1,
        experience: document.getElementById('experience').value,
        activities: activities,
        notes: document.getElementById('special-notes').value.trim(),
        savedAt: new Date().toLocaleDateString('en-ZW', { year: 'numeric', month: 'long', day: 'numeric' })
    };
}

/* ----------------------------------------------------------------
   SAVE TO LOCALSTORAGE
   ---------------------------------------------------------------- */
function savePreferences(data) {
    localStorage.setItem(PREFS_KEY, JSON.stringify(data));
}

/* ----------------------------------------------------------------
   LOAD FROM LOCALSTORAGE
   ---------------------------------------------------------------- */
function loadPreferences() {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : null;
}

/* ----------------------------------------------------------------
   POPULATE FORM FROM SAVED PREFS
   ---------------------------------------------------------------- */
function populateForm(data) {
    const firstNameEl = document.getElementById('first-name');
    const lastNameEl = document.getElementById('last-name');
    const emailEl = document.getElementById('email');
    const parkEl = document.getElementById('park-select');
    const monthEl = document.getElementById('travel-month');
    const groupEl = document.getElementById('group-size');
    const expEl = document.getElementById('experience');
    const notesEl = document.getElementById('special-notes');

    if (firstNameEl) { firstNameEl.value = data.firstName || ''; }
    if (lastNameEl) { lastNameEl.value = data.lastName || ''; }
    if (emailEl) { emailEl.value = data.email || ''; }
    if (parkEl) { parkEl.value = data.park || ''; }
    if (monthEl) { monthEl.value = data.month || ''; }
    if (groupEl) { groupEl.value = data.groupSize || 1; }
    if (expEl) { expEl.value = data.experience || ''; }
    if (notesEl) { notesEl.value = data.notes || ''; }

    // Restore checkboxes
    if (data.activities && data.activities.length > 0) {
        document.querySelectorAll('input[name="activity"]').forEach(cb => {
            cb.checked = data.activities.includes(cb.value);
        });
    }
}

/* ----------------------------------------------------------------
   DISPLAY SUMMARY – render the trip summary card
   ---------------------------------------------------------------- */
function displaySummary(data) {
    const section = document.getElementById('summary-section');
    const card = document.getElementById('summary-card');
    if (!section || !card) { return; }

    const parkName = parkOptions.find(p => p.value === data.park)?.label || data.park;
    const monthName = monthLabels[data.month] || data.month;
    const fullName = data.lastName ? `${data.firstName} ${data.lastName}` : data.firstName;

    const groupText = data.groupSize === 1
        ? '1 person (solo)'
        : `${data.groupSize} people`;

    const activityHTML = data.activities.length > 0
        ? `<div class="summary-activities-box">
        <h4>Requested Activities</h4>
        <div class="activity-pills">
          ${data.activities.map(a => `<span class="activity-pill">${a}</span>`).join('')}
        </div>
       </div>`
        : '';

    const notesHTML = data.notes
        ? `<div class="summary-note"><strong>Special requirements:</strong> ${data.notes}</div>`
        : '';

    const experienceLabels = {
        first: 'First safari',
        few: '2–4 visits',
        regular: '5+ visits',
        resident: 'Local / Resident'
    };

    card.innerHTML = `
    <div class="summary-card-header">
      <h3>Your Trip Summary</h3>
      <span class="label-text">Saved ${data.savedAt}</span>
    </div>
    <div class="summary-detail-grid">
      <div class="summary-detail-item">
        <label>Traveller</label>
        <p>${fullName}</p>
      </div>
      <div class="summary-detail-item">
        <label>Contact Email</label>
        <p>${data.email}</p>
      </div>
      <div class="summary-detail-item">
        <label>Park of Interest</label>
        <p>${parkName}</p>
      </div>
      <div class="summary-detail-item">
        <label>Travel Month</label>
        <p>${monthName}</p>
      </div>
      <div class="summary-detail-item">
        <label>Group Size</label>
        <p>${groupText}</p>
      </div>
      <div class="summary-detail-item">
        <label>Safari Experience</label>
        <p>${experienceLabels[data.experience] || 'Not specified'}</p>
      </div>
    </div>
    ${activityHTML}
    ${notesHTML}
    <div class="summary-actions">
      <button class="btn btn-dusk" id="edit-form-btn">Edit Preferences</button>
      <button class="btn btn-outline-dark" id="clear-prefs-btn">Clear Saved Data</button>
    </div>`;

    section.classList.remove('hidden');

    // Scroll smoothly to summary
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Attach summary action buttons
    document.getElementById('edit-form-btn')?.addEventListener('click', () => {
        section.classList.add('hidden');
        document.getElementById('visit-form-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('clear-prefs-btn')?.addEventListener('click', clearPreferences);
}

/* ----------------------------------------------------------------
   CLEAR PREFERENCES – wipe localStorage and reset form
   ---------------------------------------------------------------- */
function clearPreferences() {
    localStorage.removeItem(PREFS_KEY);

    const form = document.getElementById('trip-form');
    if (form) { form.reset(); }

    const section = document.getElementById('summary-section');
    if (section) { section.classList.add('hidden'); }

    const savedBanner = document.getElementById('saved-banner');
    if (savedBanner) { savedBanner.classList.add('hidden'); }
}

/* ----------------------------------------------------------------
   SHOW / HIDE FORM ERROR MESSAGE
   ---------------------------------------------------------------- */
function showError(message) {
    const el = document.getElementById('form-error');
    if (!el) { return; }
    el.textContent = message;
    el.classList.add('visible');
}

function clearError() {
    const el = document.getElementById('form-error');
    if (!el) { return; }
    el.textContent = '';
    el.classList.remove('visible');
}

/* ----------------------------------------------------------------
   HANDLE SUBMIT – validate, save, and display summary
   ---------------------------------------------------------------- */
function handleSubmit(event) {
    event.preventDefault();
    clearError();

    const data = collectFormData();
    const error = validateForm(data);

    if (error) {
        showError(error);
        return;
    }

    savePreferences(data);
    displaySummary(data);

    const savedBanner = document.getElementById('saved-banner');
    if (savedBanner) { savedBanner.classList.remove('hidden'); }
}

/* ----------------------------------------------------------------
   SHOW SAVED BANNER – notify user their data is already saved
   ---------------------------------------------------------------- */
function showSavedBanner() {
    const banner = document.getElementById('saved-banner');
    if (banner) { banner.classList.remove('hidden'); }
}

/* ----------------------------------------------------------------
   INIT – set up page
   ---------------------------------------------------------------- */
function initVisitPage() {
    buildParkSelect();

    const form = document.getElementById('trip-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Load and restore any previously saved preferences
    const saved = loadPreferences();
    if (saved) {
        populateForm(saved);
        showSavedBanner();
    }
}

document.addEventListener('DOMContentLoaded', initVisitPage);