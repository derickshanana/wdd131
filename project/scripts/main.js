/* ================================================================
   Zimbabwe Wild – Shared JS (main.js)
   Nav toggle + active link highlighting
   ================================================================ */

'use strict';

/**
 * Initialises the mobile navigation toggle button.
 * Toggles the .is-open class on the nav and updates aria-expanded.
 */
function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');

    if (!toggle || !nav) { return; }

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is clicked on mobile
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Marks the nav link that matches the current page as active.
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.site-nav a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Populates the footer's dynamic year and last-modified date.
 */
function setFooterInfo() {
    const yearEl = document.getElementById('currentyear');
    const modifiedEl = document.getElementById('lastModified');

    if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
    if (modifiedEl) { modifiedEl.textContent = `Last Modified: ${document.lastModified}`; }
}

document.addEventListener('DOMContentLoaded', () => {
    initNavToggle();
    setActiveNavLink();
    setFooterInfo();
});