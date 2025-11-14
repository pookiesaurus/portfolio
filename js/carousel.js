// Bounded Polaroid Carousel with Wheel Scroll
const track = document.getElementById('polaroidTrack');
const container = track.parentElement;

const polaroids = [
    { caption: 'Caption Here' },
    { caption: 'Caption Here' },
    { caption: 'Caption Here' },
    { caption: 'Caption Here' },
    { caption: 'Caption Here' },
    { caption: 'Caption Here' },
    { caption: 'Caption Here' },
    { caption: 'Caption Here' }
];

// Create polaroids (no tripling, just the actual set)
polaroids.forEach(item => {
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

// Calculate boundaries
function getBoundaries() {
    const containerWidth = container.offsetWidth;
    const trackWidth = track.scrollWidth;
    const maxScroll = -(trackWidth - containerWidth);
    return { min: maxScroll, max: 0 };
}

// Constrain translation within boundaries
function constrainTranslate(translate) {
    const { min, max } = getBoundaries();
    return Math.max(min, Math.min(max, translate));
}

// Update scrollbar position
function updateScrollbar() {
    const { min, max } = getBoundaries();
    const scrollPercent = max === min ? 0 : (currentTranslate - max) / (min - max);
    const scrollbar = document.querySelector('.carousel-scrollbar-thumb');
    if (scrollbar) {
        const maxThumbPos = container.offsetWidth - scrollbar.offsetWidth;
        scrollbar.style.left = (scrollPercent * maxThumbPos) + 'px';
    }
}

// Mouse drag events
track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = currentTranslate;
    track.classList.add('dragging');
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX);
    currentTranslate = constrainTranslate(scrollLeft + walk);
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateScrollbar();
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        track.classList.remove('dragging');
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
    currentTranslate = constrainTranslate(scrollLeft + walk);
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateScrollbar();
});

track.addEventListener('touchend', () => {
    isDragging = false;
    track.classList.remove('dragging');
});

// Wheel scroll support
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    currentTranslate = constrainTranslate(currentTranslate - e.deltaY);
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateScrollbar();
}, { passive: false });

// Arrow button navigation
function scrollCarousel(direction) {
    currentTranslate = constrainTranslate(currentTranslate + (direction * polaroidWidth));
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateScrollbar();
}

// Create and handle scrollbar
const scrollbarTrack = document.createElement('div');
scrollbarTrack.className = 'carousel-scrollbar-track';
const scrollbarThumb = document.createElement('div');
scrollbarThumb.className = 'carousel-scrollbar-thumb';
scrollbarTrack.appendChild(scrollbarThumb);
container.appendChild(scrollbarTrack);

// Update scrollbar size based on content
function updateScrollbarSize() {
    const { min } = getBoundaries();
    const containerWidth = container.offsetWidth;
    const trackWidth = track.scrollWidth;
    const visibleRatio = containerWidth / trackWidth;
    const thumbWidth = Math.max(50, containerWidth * visibleRatio);
    scrollbarThumb.style.width = thumbWidth + 'px';
    
    // Hide scrollbar if all content is visible
    if (visibleRatio >= 1) {
        scrollbarTrack.style.display = 'none';
    } else {
        scrollbarTrack.style.display = 'block';
    }
}

// Scrollbar drag
let scrollbarDragging = false;
let scrollbarStartX = 0;
let scrollbarStartLeft = 0;

scrollbarThumb.addEventListener('mousedown', (e) => {
    scrollbarDragging = true;
    scrollbarStartX = e.pageX;
    scrollbarStartLeft = scrollbarThumb.offsetLeft;
    e.stopPropagation();
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!scrollbarDragging) return;
    e.preventDefault();
    
    const deltaX = e.pageX - scrollbarStartX;
    const newLeft = scrollbarStartLeft + deltaX;
    const maxThumbPos = container.offsetWidth - scrollbarThumb.offsetWidth;
    const constrainedLeft = Math.max(0, Math.min(maxThumbPos, newLeft));
    
    const scrollPercent = maxThumbPos === 0 ? 0 : constrainedLeft / maxThumbPos;
    const { min, max } = getBoundaries();
    currentTranslate = max + (scrollPercent * (min - max));
    
    track.style.transform = `translateX(${currentTranslate}px)`;
    scrollbarThumb.style.left = constrainedLeft + 'px';
});

document.addEventListener('mouseup', () => {
    scrollbarDragging = false;
});

// Click on scrollbar track to jump
scrollbarTrack.addEventListener('click', (e) => {
    if (e.target === scrollbarThumb) return;
    
    const rect = scrollbarTrack.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const thumbWidth = scrollbarThumb.offsetWidth;
    const maxThumbPos = container.offsetWidth - thumbWidth;
    const newLeft = Math.max(0, Math.min(maxThumbPos, clickX - thumbWidth / 2));
    
    const scrollPercent = maxThumbPos === 0 ? 0 : newLeft / maxThumbPos;
    const { min, max } = getBoundaries();
    currentTranslate = max + (scrollPercent * (min - max));
    
    track.style.transform = `translateX(${currentTranslate}px)`;
    scrollbarThumb.style.left = newLeft + 'px';
});

// Initialize
updateScrollbarSize();
updateScrollbar();

// Update on window resize
window.addEventListener('resize', () => {
    currentTranslate = constrainTranslate(currentTranslate);
    track.style.transform = `translateX(${currentTranslate}px)`;
    updateScrollbarSize();
    updateScrollbar();
});
