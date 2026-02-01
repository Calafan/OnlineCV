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


/* ==================== GENERATE PDF ==================== */
const areaCV = document.getElementById('cvContent');
const resumeButton = document.getElementById('resume-button');

function generateResume() {
    // 1. Aggiunge la classe di scalatura
    document.body.classList.add('scale-cv');
    
    // 2. Determina nome file
    const isDark = document.body.classList.contains(darkTheme);
    const fileName = isDark ? 'Andrea_Calafiore_CV_Dark.pdf' : 'Andrea_Calafiore_CV_Light.pdf';

    // Opzioni
    const opt = {
        margin:       0,
        filename:     fileName,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2,
            useCORS: true,
            scrollY: 0 /* Assicura che inizi dall'alto */
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 3. Genera il PDF e poi ripristina
	html2pdf(areaCV, opt).then(() => {
        setTimeout(() => {
            document.body.classList.remove('scale-cv');
        }, 1000);
    });
}

resumeButton.addEventListener('click', generateResume);