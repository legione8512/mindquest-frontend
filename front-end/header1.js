// Toggle sidebar animation
function toggleSidebar() {
    const wrapper = document.getElementById("sidebar-wrapper");
    wrapper.classList.add("animating"); // Transition class.
    wrapper.classList.toggle("closed");
    
    // Remove the animating class after the transition completes
    setTimeout(() => {
        wrapper.classList.remove("animating");
    }, 300);
}

// Hide sidebar automatically when zooming out.
window.addEventListener('resize', () => {
    const wrapper = document.getElementById("sidebar-wrapper");
    if (window.innerWidth > 900 && !wrapper.classList.contains('closed')) {
        wrapper.classList.add('closed');
    }
});