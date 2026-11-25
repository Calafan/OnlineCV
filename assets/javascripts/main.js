/* ==================== DARK/LIGHT THEME ==================== */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';

// Recupera preferenze salvate
const selectedTheme = localStorage.getItem('selected-theme');
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';

// Applica tema salvato
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  updateThemeIcon(selectedTheme === 'dark');
} else {
    updateThemeIcon(false);
}

// Toggle Tema
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    const isDark = document.body.classList.contains(darkTheme);
    updateThemeIcon(isDark);
    localStorage.setItem('selected-theme', getCurrentTheme());
});

function updateThemeIcon(isDark) {
    const icon = themeButton.querySelector('svg');
    icon.innerHTML = '';
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke-width', '2');
    
    if (isDark) {
        // Sole
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
        // Luna
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}
