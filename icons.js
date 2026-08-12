/* Household Solutions — icon library
   Simple two-tone line icons, injected into any element with [data-icon].
   Add more by adding a key below; keep paths on a 24x24 grid. */

const ICONS = {
  laundry: '<circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3.2"/><path d="M8 4h8M9 4V2.6M15 4V2.6"/>',
  wall: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6"/>',
  kitchen: '<path d="M4 3v9a3 3 0 0 0 3 3v6M7 3v6M10 3v6"/><path d="M17 3c-2 1.5-2 5-2 7 0 1.5 1 2 2 2v9"/>',
  bathroom: '<path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3Z"/><path d="M7 12V6a2 2 0 0 1 3.5-1.3"/><path d="M9 20v2M15 20v2"/>',
  deepclean: '<path d="M6 21V9a6 6 0 0 1 12 0v12"/><path d="M6 15h12M9 21v-3M15 21v-3"/>',
  organize: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 10h18M9 10v10M15 10v10"/>',
  window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
  floor: '<path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/><path d="M9 20v-6h6v6"/>',
  general: '<path d="M12 3v4M12 17v4M4.2 6.2l2.8 2.8M17 15l2.8 2.8M3 12h4M17 12h4M4.2 17.8 7 15M17 9l2.8-2.8"/><circle cx="12" cy="12" r="3"/>',
  yard: '<path d="M12 21V9"/><path d="M12 9c-3-1-4-4-4-6 3 0 6 2 6 5"/><path d="M12 13c3-1 5-3 6-6-3-1-6 0-8 2"/><path d="M5 21h14"/>',
  weeds: '<path d="M12 21V11"/><path d="M12 12c-2 0-4-2-4-5 2 0 4 1 4 4Z"/><path d="M12 10c2 0 4-2 4-5-2 0-4 1-4 4Z"/><path d="M5 21h14"/>',
  pool: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M3 20c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0"/>',
  car: '<path d="M4 16V11l2-4h12l2 4v5"/><path d="M4 16h16M6 16v2M18 16v2"/><circle cx="7.5" cy="13" r="0.8"/><circle cx="16.5" cy="13" r="0.8"/>',
  garage: '<path d="M3 21V10l9-6 9 6v11"/><path d="M6 21v-8h12v8"/><path d="M6 17h12"/>',
  dog: '<circle cx="10" cy="14" r="6"/><path d="M8 10 6 6M12 10l1-4"/><circle cx="8.5" cy="14" r="0.7"/><circle cx="11.5" cy="14" r="0.7"/>',
  gutter: '<path d="M3 8h18"/><path d="M3 8v3a2 2 0 0 0 2 2h2M19 8v3a2 2 0 0 1-2 2h-2"/><path d="M12 13v8M9 18l3 3 3-3"/>',
  driveway: '<path d="M8 3 5 21M16 3l3 18"/><path d="M12 6v2M12 11v2M12 16v2"/>',
  bush: '<circle cx="8" cy="10" r="4"/><circle cx="14" cy="8" r="5"/><circle cx="17" cy="12" r="3.5"/><path d="M12 21v-7"/>',
  phone: '<path d="M6 3h3l2 5-2 1.5a11 11 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 5a2 2 0 0 1 2-2Z"/>',
  whatsapp: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8.9 19L4 20Z"/><path d="M8.5 8.8c.2 2.6 2.1 4.5 4.7 4.7.4 0 .8-.3.9-.7l.2-1-2-1-1 1c-1-.5-1.9-1.4-2.4-2.4l1-1-1-2-1 .2c-.4.1-.7.5-.7.9Z"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-6h4v6"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  furniture: '<path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M3 11h18v5a1 1 0 0 1-1 1h-1v2h-2v-2H7v2H5v-2H4a1 1 0 0 1-1-1v-5Z"/>',
  trash: '<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v6M14 11v6"/>',
  lawn: '<path d="M4 21V15M8 21v-8M12 21V13M16 21v-8M20 21v-6"/><path d="M2 21h20"/>'
};

function renderIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    const key = el.getAttribute('data-icon');
    const body = ICONS[key];
    if (!body) return;
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  });
}

document.addEventListener('DOMContentLoaded', () => renderIcons());
