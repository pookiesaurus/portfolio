// Infinite Polaroid Carousel
const track = document.getElementById('polaroidTrack');
const polaroids = [
    { caption: 'caption here' },
    { caption: 'caption here' },
    { caption: 'caption here' },
    { caption: 'caption here' },
    { caption: 'caption here' }
];

// Triple the polaroids for smooth infinite scroll
const tripled = [...polaroids, ...polaroids, ...polaroids];

tripled.forEach(item => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.innerHTML = `
        <div class="polaroid-image">[image placeholder]</div>
        <div class="polaroid-caption">${item.caption}</div>
    `;
    track.appendChild(polaroid);
});

let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let currentTranslate = 0;
const polaroidWidth = 200 + 32; // width + gap
const setSize = polaroids.length;

// Center the middle set initially
currentTranslate = -polaroidWidth * setSize;
track.style.transform = `translateX(${currentTranslate}px)`;

// Mouse events
track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = currentTranslate;
    track.classList.add('dragging');
});

track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX);
    currentTranslate = scrollLeft + walk;
    track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener('mouseup', () => {
    isDragging = false;
    track.classList.remove('dragging');
    checkBoundaries();
});

track.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        track.classList.remove('dragging');
        checkBoundaries();
    }
});

// Touch events
track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollLeft = currentTranslate;
    track.classList.add('dragging');
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX);
    currentTranslate = scrollLeft + walk;
    track.style.transform = `translateX(${currentTranslate}px)`;
});

track.addEventListener('touchend', () => {
    isDragging = false;
    track.classList.remove('dragging');
    checkBoundaries();
});

function checkBoundaries() {
    const maxScroll = -polaroidWidth * setSize * 2;
    const minScroll = 0;
    
    // If scrolled too far right, jump to middle set
    if (currentTranslate > minScroll) {
        currentTranslate = -polaroidWidth * setSize;
        track.style.transition = 'none';
        track.style.transform = `translateX(${currentTranslate}px)`;
        setTimeout(() => {
            track.style.transition = 'transform 0.3s ease-out';
        }, 10);
    }
    
    // If scrolled too far left, jump to middle set
    if (currentTranslate < maxScroll) {
        currentTranslate = -polaroidWidth * setSize;
        track.style.transition = 'none';
        track.style.transform = `translateX(${currentTranslate}px)`;
        setTimeout(() => {
            track.style.transition = 'transform 0.3s ease-out';
        }, 10);
    }
}

function scrollCarousel(direction) {
    currentTranslate += direction * polaroidWidth;
    track.style.transform = `translateX(${currentTranslate}px)`;
    setTimeout(checkBoundaries, 300);
}

// Auto-scroll
setInterval(() => {
    if (!isDragging) {
        currentTranslate -= polaroidWidth;
        track.style.transform = `translateX(${currentTranslate}px)`;
        setTimeout(checkBoundaries, 300);
    }
}, 4000);
