let selectedElement = null;
let isRotating = false;
let initialAngle = 0;
let currentAngle = 0;

function calculateAngle(x1, y1, x2, y2) {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
}

function startRotation(e) {
    selectedElement = e.currentTarget.parentElement; // Get the parent element (the selected element)
    isRotating = true;
    const centerX = selectedElement.offsetWidth / 2;
    const centerY = selectedElement.offsetHeight / 2;
    const mouseX = e.clientX - selectedElement.getBoundingClientRect().left;
    const mouseY = e.clientY - selectedElement.getBoundingClientRect().top;
    initialAngle = calculateAngle(centerX, centerY, mouseX, mouseY) - currentAngle;

    // Add mousemove and mouseup event listeners to the document
    document.addEventListener('mousemove', rotate);
    document.addEventListener('mouseup', stopRotation);
}

function rotate(e) {
    if (isRotating && selectedElement) {
        const centerX = selectedElement.offsetWidth / 2;
        const centerY = selectedElement.offsetHeight / 2;
        const mouseX = e.clientX - selectedElement.getBoundingClientRect().left;
        const mouseY = e.clientY - selectedElement.getBoundingClientRect().top;
        const newAngle = calculateAngle(centerX, centerY, mouseX, mouseY) - initialAngle;
        selectedElement.style.transform = `rotate(${newAngle}deg)`;
        currentAngle = newAngle;
    }
}

function stopRotation() {
    isRotating = false;

    // Remove mousemove and mouseup event listeners from the document
    document.removeEventListener('mousemove', rotate);
    document.removeEventListener('mouseup', stopRotation);
}

// Add a "mousedown" event listener to the "rotate" divs
document.querySelectorAll('.rotate').forEach((rotateHandle) => {
    rotateHandle.addEventListener('mousedown', startRotation);
});
