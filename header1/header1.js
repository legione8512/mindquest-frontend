// Toggle sidebar animation
function toggleSidebar() {
    let navbar = document.getElementById('navigation-bar');
    navbar.classList.toggle('closed');
}

// Hide sidebar automatically when zooming out.
window.addEventListener('resize', () => {
    let navbar = document.getElementById('navigation-bar');
    if (window.innerWidth > 1250 && !navbar.classList.contains('closed')) {
        navbar.classList.add('closed');
    }
});