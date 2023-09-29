// to give the user the ability to resize and rotate the element like in Figma
function makeResizableAndRotatable(element) {
    let isResizing = false;
    let isRotating = false;
    let startX, startY, startWidth, startHeight, startAngle;
    document.addEventListener('mousedown', (e) => {
        // log mouse position
        if (isCloseToCorner(e, element, 20)) {
            isRotating = true;
            startX = e.clientX;
            startY = e.clientY;
            startAngle = getRotationAngle(element);
        } else if (isCloseTo(e, element, 10)) {
            console.log('resizing');
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = element.offsetWidth;
            startHeight = element.offsetHeight;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isResizing) {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;
        } else if (isRotating) {
            const angle = startAngle + getAngle(e.clientX, e.clientY, startX, startY);
            element.style.transform = `rotate(${angle}deg)`;
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        isRotating = false;
    });

    // Helper function to calculate the angle between two points
    function getAngle(x1, y1, x2, y2) {
        const deltaX = x1 - x2;
        const deltaY = y1 - y2;
        const radians = Math.atan2(deltaY, deltaX);
        return radians * (180 / Math.PI);
    }

    // Helper function to get the current rotation angle of an element
    function getRotationAngle(element) {
        const transform = window.getComputedStyle(element).getPropertyValue('transform');
        const matrix = new DOMMatrix(transform);
        return Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
    }
}

// makeResizableAndRotatable(element);


// helper functions

// check if mouse is close to any corner of an element
function isCloseToCorner(e, element, R = element.offsetWidth / 6) {
    const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = element;
    const distances = [
        Math.sqrt((offsetLeft - e.clientX) ** 2 + (offsetTop - e.clientY) ** 2),
        Math.sqrt((offsetLeft + offsetWidth - e.clientX) ** 2 + (offsetTop - e.clientY) ** 2),
        Math.sqrt((offsetLeft - e.clientX) ** 2 + (offsetTop + offsetHeight - e.clientY) ** 2),
        Math.sqrt((offsetLeft + offsetWidth - e.clientX) ** 2 + (offsetTop + offsetHeight - e.clientY) ** 2),
    ];
    const minDistance = Math.min(...distances);

    if (minDistance < R) {
        return true;
    }
    return false;
}
// check if mouse is close to an element
function isCloseTo(e, element, R = element.offsetWidth / 6) {
    const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = element;
    const distances = [
        Math.abs(offsetLeft - e.clientX),
        Math.abs(offsetLeft + offsetWidth - e.clientX),
        Math.abs(offsetTop - e.clientY),
        Math.abs(offsetTop + offsetHeight - e.clientY),
    ];
    const minDistance = Math.min(...distances);

    if (minDistance < R) {
        return true;
    }
    return false;
}