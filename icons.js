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
  whatsapp: '<path fill="currentColor" stroke="none" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.7 1.46 5.31L2 22l4.9-1.53a9.86 9.86 0 0 0 4.14.92h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2m0 1.67c2.23 0 4.32.87 5.89 2.44a8.26 8.26 0 0 1 2.43 5.85c0 4.56-3.72 8.27-8.32 8.27-1.46 0-2.9-.38-4.15-1.11l-.3-.17-3.09.97.97-3.01-.19-.31a8.2 8.2 0 0 1-1.27-4.44c0-4.56 3.72-8.28 8.28-8.28h.02z"/><path fill="currentColor" stroke="none" d="M9.1 7.28c-.18-.4-.37-.4-.54-.41-.14 0-.3-.01-.46-.01s-.42.06-.64.3c-.22.24-.85.83-.85 2.03s.87 2.36 1 2.53c.12.16 1.68 2.68 4.15 3.65 2.05.81 2.47.65 2.92.61.45-.04 1.44-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.75-1.8z"/>',
  facebook: '<path fill="currentColor" stroke="none" d="M15.4 12.3h-2.1v7.6h-3.1v-7.6H8.6V9.6h1.6V7.9c0-1.9 1-3 3.2-3h1.9v2.5h-1.2c-.6 0-1 .3-1 1v1.2h2.3l-.4 2.7z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none"/>',
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
