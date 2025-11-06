// Toggle sidebar animation
function toggleSidebar() {
    const wrapper = document.getElementById("sidebar-wrapper");
    wrapper.classList.toggle("closed");
}

// Hide sidebar automatically when zooming out.
window.addEventListener('resize', () => {
    const wrapper = document.getElementById("sidebar-wrapper");
    if (window.innerWidth > 1250 && !wrapper.classList.contains('closed')) {
        wrapper.classList.add('closed');
    }
});