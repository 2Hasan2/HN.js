const selected = document.getElementById('selected');
const controllers = document.querySelectorAll('.radius-controller');

let isDragging = false;
let startX;
let startY;
let initialRadius;

function updateBorderRadius(event) {
    const currentX = event.clientX;
    const currentY = event.clientY;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    const W = selected.offsetWidth;
    const H = selected.offsetHeight;



    // make the controllers move on line to the element center depending on the direction of the mouse move
    controllers.forEach((controller, i) => {
        let X = selected.offsetWidth - controller.offsetWidth;
        let Y = selected.offsetHeight - controller.offsetHeight;

        if (deltaY < 0 && Math.abs(deltaY) < H) {

            if (i === 0 || i === 1) {
                controller.style.top = `${Y + deltaY}px`;
            } else {
                controller.style.top = `${- deltaY}px`;
            }

        }
        if (deltaX < 0 && Math.abs(deltaX) < W) {
            if (i === 0 || i === 2) {
                controller.style.left = `${X + deltaX}px`;
            } else {
                controller.style.left = `${- deltaX}px`;
            }
        }


    });

    if (deltaX < 0 && deltaY < 0 && Math.abs(deltaX) < W && Math.abs(deltaY) < H) {
        const newRadius = Math.max(initialRadius - deltaX, 0);
        selected.style.borderRadius = `${newRadius}px`;
    }
}

function onMouseUp() {
    if (isDragging) {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

function onMouseMove(e) {
    if (!isDragging) return;
    updateBorderRadius(e);
}

controllers.forEach(controller => {
    controller.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        initialRadius = parseFloat(getComputedStyle(selected).borderRadius);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});