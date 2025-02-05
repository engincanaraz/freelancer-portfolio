// Mobil Menü
const menuBtn = document.querySelector('.menu-btn');
const navItems = document.querySelector('.main-nav__items');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navItems.classList.add('show');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        navItems.classList.remove('show');
        menuOpen = false;
    }
});

// Sayfa yüklendiğinde aktif menü öğesini işaretle
document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.main-nav__items a');
    
    menuItems.forEach(item => {
        if(item.href === currentLocation) {
            item.classList.add('active');
        }
    });
}); 