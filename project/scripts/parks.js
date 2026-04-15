/* ================================================================
   Zimbabwe Wild – Parks Page (parks.js)
   Data, rendering, region filtering, and localStorage favorites
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   PARK DATA – Array of park objects
   ---------------------------------------------------------------- */
const parks = [
    {
        id: 'hwange',
        name: 'Hwange National Park',
        region: 'west',
        regionLabel: 'Western Zimbabwe',
        size: '14,651 km²',
        established: '1929',
        image: '../project/images/hwange.jpg',
        imageAlt: 'Large African elephant herd at a waterhole in Hwange National Park',
        description: `Zimbabwe's largest national park and one of Africa's greatest wildlife sanctuaries. 
    Hwange is home to over 40,000 elephants — the largest elephant population on the continent — 
    as well as prides of lion, cheetah, and over 100 species of mammal.`,
        wildlife: ['Elephant', 'Lion', 'Cheetah', 'Sable Antelope', 'Wild Dog'],
        bestTime: 'May – October',
        activities: ['Game Drives', 'Walking Safaris', 'Birdwatching', 'Night Drives'],
        highlight: 'Africa\'s largest elephant population',
        unescoStatus: false
    },
    {
        id: 'mana-pools',
        name: 'Mana Pools National Park',
        region: 'north',
        regionLabel: 'Northern Zimbabwe',
        size: '2,196 km²',
        established: '1963',
        image: '../project/images/zambeziriver.jpg',
        imageAlt: 'Hippos resting on the banks of the Zambezi River at Mana Pools',
        description: `A UNESCO World Heritage Site along the Zambezi River, Mana Pools offers one of Africa's 
    most unique safari experiences. The park is celebrated for its canoe safaris, walking safaris 
    where you encounter wildlife on foot, and extraordinary photography opportunities.`,
        wildlife: ['Hippopotamus', 'Crocodile', 'Elephant', 'Wild Dog', 'Lion'],
        bestTime: 'April – October',
        activities: ['Canoe Safaris', 'Walking Safaris', 'Fishing', 'Photography'],
        highlight: 'UNESCO-listed Zambezi riverfront wilderness',
        unescoStatus: true
    },
    {
        id: 'gonarezhou',
        name: 'Gonarezhou National Park',
        region: 'south',
        regionLabel: 'Southern Zimbabwe',
        size: '5,053 km²',
        established: '1975',
        image: '../project/images/gona.jpg',
        imageAlt: 'Zebras grazing on the open plains of Gonarezhou National Park',
        description: `Meaning "Place of Many Elephants" in Shona, Gonarezhou is the second-largest park 
    in Zimbabwe. Its iconic Chilojo Cliffs — dramatic red sandstone escarpments rising from the 
    Runde River — are a defining feature, and the park is part of the vast Great Limpopo 
    Transfrontier Park.`,
        wildlife: ['Elephant', 'Nyala', 'Sable Antelope', 'African Wild Dog', 'Leopard'],
        bestTime: 'June – October',
        activities: ['Game Drives', 'Walking Safaris', 'Camping', 'Birdwatching'],
        highlight: 'Dramatic Chilojo Cliffs & Limpopo wilderness',
        unescoStatus: false
    },
    {
        id: 'matobo',
        name: 'Matobo National Park',
        region: 'south',
        regionLabel: 'Southern Zimbabwe',
        size: '424 km²',
        established: '1926',
        image: '../project/images/matopo.jpg',
        imageAlt: 'Dramatic balancing granite kopjes (boulders) at Matobo National Park near Bulawayo',
        description: `A UNESCO World Heritage Site defined by its ancient granite kopjes — massive 
    balancing boulders sculpted by millennia of weathering. Matobo has the highest concentration 
    of leopards in Africa and is one of the few places in Zimbabwe where you can track both black 
    and white rhinoceros on foot.`,
        wildlife: ['Leopard', 'White Rhino', 'Black Rhino', 'Sable Antelope', 'Vervet Monkey'],
        bestTime: 'Year-round (May – August best)',
        activities: ['Rhino Tracking', 'Rock Art Tours', 'Horse Riding', 'Hiking'],
        highlight: 'Track rhinos on foot in ancient rock country',
        unescoStatus: true
    },
    {
        id: 'nyanga',
        name: 'Nyanga National Park',
        region: 'east',
        regionLabel: 'Eastern Zimbabwe',
        size: '472 km²',
        established: '1941',
        image: '../project/images/inyanga.jpg',
        imageAlt: 'Mist-covered mountains and waterfalls in Nyanga National Park, Eastern Highlands',
        description: `The cool, misty Eastern Highlands offer a dramatic contrast to Zimbabwe's lowveld 
    parks. Nyanga is home to the 762-metre Mutarazi Falls — the second-tallest waterfall in Africa — 
    and Inyangani, Zimbabwe's highest peak at 2,593 metres. Excellent trout fishing and mountain 
    hiking make it a favourite for active travellers.`,
        wildlife: ['Trout', 'Leopard', 'Samango Monkey', 'Reedbuck', 'Various Raptors'],
        bestTime: 'April – October',
        activities: ['Hiking', 'Trout Fishing', 'Birdwatching', 'Horse Riding'],
        highlight: 'Mutarazi Falls — Africa\'s second-tallest waterfall',
        unescoStatus: false
    },
    {
        id: 'zambezi',
        name: 'Zambezi National Park',
        region: 'west',
        regionLabel: 'Western Zimbabwe',
        size: '568 km²',
        established: '1979',
        image: '../project/images/zambezi.jpg',
        imageAlt: 'Aerial view of the Zambezi River landscape near Victoria Falls',
        description: `Bordering Victoria Falls — one of the Seven Natural Wonders of the World — 
    Zambezi National Park offers exceptional wildlife viewing in a spectacular riverine setting. 
    The park's sable antelope herds are among the finest in the region, and elephant, lion, 
    and hippo are regular sightings along the Zambezi River frontage.`,
        wildlife: ['Sable Antelope', 'Elephant', 'Lion', 'Hippopotamus', 'Buffalo'],
        bestTime: 'Year-round',
        activities: ['River Cruises', 'Game Drives', 'Fishing', 'Walking Safaris'],
        highlight: 'Wildlife viewing adjacent to Victoria Falls',
        unescoStatus: false
    }
];

/* ----------------------------------------------------------------
   STORAGE KEY
   ---------------------------------------------------------------- */
const FAVORITES_KEY = 'zimwild_favorites';

/* ----------------------------------------------------------------
   HELPERS – read / write favorites from localStorage
   ---------------------------------------------------------------- */
function getFavorites() {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveFavorites(favArray) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favArray));
}

/* ----------------------------------------------------------------
   RENDER – build and inject card HTML for a parks array
   ---------------------------------------------------------------- */
function renderParks(parksToRender) {
    const grid = document.getElementById('parks-grid');
    if (!grid) { return; }

    const favorites = getFavorites();

    if (parksToRender.length === 0) {
        grid.innerHTML = `
      <div class="no-results">
        <p>No parks found for this region. Try a different filter.</p>
      </div>`;
        return;
    }

    grid.innerHTML = parksToRender.map(park => {
        const isFav = favorites.includes(park.id);
        const favClass = isFav ? 'is-favorite' : '';
        const favLabel = isFav ? 'Remove from favourites' : 'Add to favourites';
        const favIcon = isFav ? '♥' : '♡';
        const unescoTag = park.unescoStatus
            ? `<span class="wildlife-tag">UNESCO World Heritage</span>`
            : '';

        const wildlifeTags = park.wildlife
            .slice(0, 4)
            .map(animal => `<span class="wildlife-tag">${animal}</span>`)
            .join('');

        return `
      <article class="park-card" id="${park.id}">
        <div class="park-card-image">
          <img
            src="${park.image}"
            alt="${park.imageAlt}"
            loading="lazy"
            width="800"
            height="210">
          <span class="park-card-badge">${park.regionLabel}</span>
        </div>
        <div class="park-card-body">
          <h3>${park.name}</h3>
          <div class="park-meta">
            <span class="park-meta-item">${park.size}</span>
            <span class="park-meta-item">Est. ${park.established}</span>
          </div>
          <p class="park-desc">${park.description.trim()}</p>
          <div class="wildlife-tags">
            ${wildlifeTags}
            ${unescoTag}
          </div>
          <p class="park-highlight">
            <strong>Highlight:</strong> ${park.highlight}
          </p>
          <div class="park-extra">
            <p class="park-meta-item">Best time: ${park.bestTime}</p>
            <p class="park-meta-item">Activities: ${park.activities.join(', ')}</p>
          </div>
          <div class="park-card-actions">
            <button
              class="favorite-btn ${favClass}"
              data-park-id="${park.id}"
              aria-label="${favLabel} ${park.name}"
              title="${favLabel}">
              ${favIcon}
            </button>
            <button class="btn btn-ghost btn-sm details-btn" data-park-id="${park.id}">
              View Details
            </button>
          </div>
        </div>
      </article>`;
    }).join('');

    // Attach event listeners after rendering
    attachCardEvents();
}

/* ----------------------------------------------------------------
   ATTACH – card button event listeners
   ---------------------------------------------------------------- */
function attachCardEvents() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const parkId = btn.dataset.parkId;
            toggleFavorite(parkId);
        });
    });

    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const parkId = btn.dataset.parkId;
            openModal(parkId);
        });
    });
}

/* ----------------------------------------------------------------
   FILTER – filter parks by region and re-render
   ---------------------------------------------------------------- */
function filterParks(region) {
    const filtered = region === 'all'
        ? parks
        : parks.filter(park => park.region === region);

    renderParks(filtered);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.region === region) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/* ----------------------------------------------------------------
   FAVORITES – toggle a park's favorite status
   ---------------------------------------------------------------- */
function toggleFavorite(parkId) {
    const favorites = getFavorites();
    const idx = favorites.indexOf(parkId);

    if (idx === -1) {
        favorites.push(parkId);
    } else {
        favorites.splice(idx, 1);
    }

    saveFavorites(favorites);
    updateFavoriteUI(parkId);
    renderFavoritesPanel();
}

/* ----------------------------------------------------------------
   UPDATE – refresh a single card's favorite button state
   ---------------------------------------------------------------- */
function updateFavoriteUI(parkId) {
    const favorites = getFavorites();
    const isFav = favorites.includes(parkId);

    const btn = document.querySelector(`.favorite-btn[data-park-id="${parkId}"]`);
    if (!btn) { return; }

    if (isFav) {
        btn.classList.add('is-favorite');
        btn.textContent = '♥';
        btn.setAttribute('aria-label', `Remove from favourites ${parkId}`);
    } else {
        btn.classList.remove('is-favorite');
        btn.textContent = '♡';
        btn.setAttribute('aria-label', `Add to favourites ${parkId}`);
    }
}

/* ----------------------------------------------------------------
   FAVORITES PANEL – render saved favorites list
   ---------------------------------------------------------------- */
function renderFavoritesPanel() {
    const container = document.getElementById('favorites-list');
    if (!container) { return; }

    const favorites = getFavorites();

    if (favorites.length === 0) {
        container.innerHTML = `<p class="favorites-empty">No favourite parks saved yet. Click the ♡ button on any park card to save it here.</p>`;
        return;
    }

    const favParks = parks.filter(park => favorites.includes(park.id));

    container.innerHTML = `<div class="favorites-grid">${favParks.map(park => `
      <div class="favorite-chip">
        <span class="favorite-chip-name">${park.name}</span>
        <button class="remove-fav-btn" data-park-id="${park.id}" aria-label="Remove ${park.name} from favourites" title="Remove">✕</button>
      </div>`
    ).join('')
        }</div>`;

    container.querySelectorAll('.remove-fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            toggleFavorite(btn.dataset.parkId);
        });
    });
}

/* ----------------------------------------------------------------
   MODAL – show full park details in an overlay
   ---------------------------------------------------------------- */
function openModal(parkId) {
    const park = parks.find(p => p.id === parkId);
    if (!park) { return; }

    const overlay = document.getElementById('park-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
    <div class="modal-image-wrap">
      <img src="${park.image}" alt="${park.imageAlt}" width="800" height="320">
    </div>
    <div class="modal-content">
      <span class="label-text">${park.regionLabel}</span>
      <h2>${park.name}</h2>
      <div class="park-meta">
        <span class="park-meta-item">Size: ${park.size}</span>
        <span class="park-meta-item">Est. ${park.established}</span>
        ${park.unescoStatus ? '<span class="park-meta-item">🏛 UNESCO World Heritage Site</span>' : ''}
      </div>
      <p>${park.description.trim()}</p>
      <div class="modal-two-col">
        <div>
          <h4>Wildlife</h4>
          <div class="wildlife-tags">
            ${park.wildlife.map(a => `<span class="wildlife-tag">${a}</span>`).join('')}
          </div>
        </div>
        <div>
          <h4>Activities</h4>
          <div class="wildlife-tags">
            ${park.activities.map(a => `<span class="wildlife-tag">${a}</span>`).join('')}
          </div>
        </div>
      </div>
      <p class="modal-best-time"><strong>Best time to visit:</strong> ${park.bestTime}</p>
    </div>`;

    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('park-modal');
    if (!overlay) { return; }
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/* ----------------------------------------------------------------
   INIT – set up page on DOM ready
   ---------------------------------------------------------------- */
function initParksPage() {
    renderParks(parks);
    renderFavoritesPanel();

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterParks(btn.dataset.region);
        });
    });

    // Modal close
    const closeBtn = document.getElementById('modal-close');
    const overlay = document.getElementById('park-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) { closeModal(); }
        });
    }

    // ESC key closes modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeModal(); }
    });
}

document.addEventListener('DOMContentLoaded', initParksPage);