// Custom Cursor Functionality
const cursor = document.getElementById('cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor with smooth following
function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Project hover effect
const projectElements = document.querySelectorAll('[data-cursor="project"]');
projectElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover-project');
        cursor.textContent = 'see project →';
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover-project');
        cursor.textContent = '';
    });
});
