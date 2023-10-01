// to give the user the ability to resize and rotate the element like in Figma
function makeResizableAndRotatable(element) {
    let isResizing = false;
    let isRotating = false;
    let startX, startY, startWidth, startHeight, startAngle;

    document.addEventListener('mouseover', (e) => {
        // log mouse position
        if (isCloseToCorner(e, element)) {
            element.style.cursor = '-webkit-grab';
            // element.style.cursor = "url('rotation-cursor.png'), auto";
        } else if (isCloseTo(e, element, 10)) {
            element.style.cursor = 'ew-resize';
        }
        else {
            element.style.cursor = 'auto'
        }
    });

    document.addEventListener('mouseout', (e) => {
        // log mouse position
        if (isCloseToCorner(e, element, 20)) {
            element.style.cursor = 'auto';
        } else if (isCloseTo(e, element, 10)) {
            element.style.cursor = 'auto';
        }
    });


    document.addEventListener('mousedown', (e) => {
        // log mouse position
        if (isCloseToCorner(e, element, 20)) {
            isRotating = true;
            startX = e.clientX;
            startY = e.clientY;
            startAngle = getRotationAngle(element);
        } else if (isCloseTo(e, element, 10)) {
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
}
// Helper function to calculate the angle between two points
makeResizableAndRotatable(element);

// helper functions

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

// check if mouse is close to any corner of an element
function isCloseToCorner(e, element, R = element.offsetWidth / 6) {
    const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = element;

    // Get the computed style of the element to extract its rotation
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.getPropertyValue('transform');

    // Parse the rotation from the transform property
    const matrix = new DOMMatrixReadOnly(transform);
    const rotation = Math.atan2(matrix.b, matrix.a); // Extract rotation in radians

    // Calculate the element's center point
    const centerX = offsetLeft + offsetWidth / 2;
    const centerY = offsetTop + offsetHeight / 2;

    // Calculate the mouse cursor position relative to the center
    const relativeX = e.clientX - centerX;
    const relativeY = e.clientY - centerY;

    // Calculate the rotated mouse position using the rotation matrix
    const rotatedX = relativeX * Math.cos(-rotation) - relativeY * Math.sin(-rotation);
    const rotatedY = relativeX * Math.sin(-rotation) + relativeY * Math.cos(-rotation);

    // Calculate distances to the rotated corners
    const distances = [
        Math.sqrt((rotatedX - offsetWidth / 2) ** 2 + (rotatedY - offsetHeight / 2) ** 2),
        Math.sqrt((rotatedX + offsetWidth / 2) ** 2 + (rotatedY - offsetHeight / 2) ** 2),
        Math.sqrt((rotatedX - offsetWidth / 2) ** 2 + (rotatedY + offsetHeight / 2) ** 2),
        Math.sqrt((rotatedX + offsetWidth / 2) ** 2 + (rotatedY + offsetHeight / 2) ** 2),
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