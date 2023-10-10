// resize function use for resize the div
let resizeControl = (selectedEle) => {
    // get all the resize div
    let resizeDivs = [...selectedEle.querySelectorAll('.resize div')];

    // add event listener to all the resize div
    resizeDivs.forEach((resizeDiv) => {
        resizeDiv.addEventListener("mousedown", (e) => {
            resize(selectedEle, e, e.target.classList[0]);
        });
    });
};
let selectedEle = document.querySelector('.selected');

resizeControl(selectedEle);

// resize function
function resize(ele, event, dir) {
    event.preventDefault();
    let initialWidth = parseFloat(getComputedStyle(ele).width);
    let initialHeight = parseFloat(getComputedStyle(ele).height);
    let initialX = event.clientX;
    let initialY = event.clientY;
    let initialLeft = parseFloat(getComputedStyle(ele).left);
    let initialTop = parseFloat(getComputedStyle(ele).top);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);

    function move(e) {
        let widthChange = e.clientX - initialX;
        let heightChange = e.clientY - initialY;

        let newWidth, newHeight, newLeft, newTop;

        switch (dir) {
            case "top-left":
                newWidth = initialWidth - widthChange;
                newHeight = initialHeight - heightChange;
                newLeft = initialLeft + widthChange;
                newTop = initialTop + heightChange;
                break;
            case "top-center":
                newHeight = initialHeight - heightChange;
                newTop = initialTop + heightChange;
                break;
            case "top-right":
                newWidth = initialWidth + widthChange;
                newHeight = initialHeight - heightChange;
                newTop = initialTop + heightChange;
                break;
            case "center-left":
                newWidth = initialWidth - widthChange;
                newLeft = initialLeft + widthChange;
                break;
            case "center-right":
                newWidth = initialWidth + widthChange;
                break;
            case "bottom-left":
                newWidth = initialWidth - widthChange;
                newHeight = initialHeight + heightChange;
                newLeft = initialLeft + widthChange;
                break;
            case "bottom-center":
                newHeight = initialHeight + heightChange;
                break;
            case "bottom-right":
                newWidth = initialWidth + widthChange;
                newHeight = initialHeight + heightChange;
                break;
        }

        // Set new styles
        ele.style.width = newWidth + "px";
        ele.style.height = newHeight + "px";
        ele.style.left = newLeft + "px";
        ele.style.top = newTop + "px";
    }

    function end() {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", end);
    }
}
// Radius control
let radiusHandles = document.querySelectorAll('.radius-handle');
let isResizingRadius = false;
let initialRadiusX, initialRadiusY, initialWidth, initialHeight, centerX, centerY;

radiusHandles.forEach((radiusHandle) => {
    radiusHandle.addEventListener('mousedown', (e) => {
        isResizingRadius = true;
        initialRadiusX = e.clientX;
        initialRadiusY = e.clientY;
        initialWidth = parseFloat(getComputedStyle(selectedEle).width);
        initialHeight = parseFloat(getComputedStyle(selectedEle).height);
        centerX = selectedEle.offsetLeft + selectedEle.offsetWidth / 2;
        centerY = selectedEle.offsetTop + selectedEle.offsetHeight / 2;
        document.addEventListener('mousemove', resizeRadius);
        document.addEventListener('mouseup', endRadiusResize);
    });
});
function resizeRadius(e) {
    if (!isResizingRadius) return;

    const centerX = selectedEle.offsetLeft + selectedEle.offsetWidth / 2;
    const centerY = selectedEle.offsetTop + selectedEle.offsetHeight / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate the angle of the line from the center to the mouse
    const angle = Math.atan2(deltaY, deltaX);

    // Calculate the distance from the center to the mouse
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Calculate the new radius values
    const newRadiusX = Math.abs(Math.cos(angle) * distance);
    const newRadiusY = Math.abs(Math.sin(angle) * distance);

    // Update the border radius properties
    selectedEle.style.borderTopLeftRadius = newRadiusX + 'px ' + newRadiusY + 'px';
    selectedEle.style.borderTopRightRadius = newRadiusX + 'px ' + newRadiusY + 'px';
    selectedEle.style.borderBottomLeftRadius = newRadiusX + 'px ' + newRadiusY + 'px';
    selectedEle.style.borderBottomRightRadius = newRadiusX + 'px ' + newRadiusY + 'px';

    // Update the position of the radius handles to follow the line
    radiusHandles.forEach((radiusHandle) => {
        radiusHandle.style.left = centerX + Math.cos(angle) * radiusHandle.offsetWidth / 2 + 'px';
        radiusHandle.style.top = centerY + Math.sin(angle) * radiusHandle.offsetHeight / 2 + 'px';
    });
}



function endRadiusResize() {
    isResizingRadius = false;
    document.removeEventListener('mousemove', resizeRadius);
    document.removeEventListener('mouseup', endRadiusResize);
}


// Rotation control
let rotateHandle = document.querySelector('.rotate-handle');
let isRotating = false;
let initialAngle;

rotateHandle.addEventListener('mousedown', (e) => {
    isRotating = true;
    initialAngle = getRotationAngle(selectedEle, e);
    document.addEventListener('mousemove', rotate);
    document.addEventListener('mouseup', endRotation);
});

function getRotationAngle(ele, event) {
    const centerX = ele.offsetLeft + ele.offsetWidth / 2;
    const centerY = ele.offsetTop + ele.offsetHeight / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
}

function rotate(e) {
    if (!isRotating) return;

    const currentAngle = getRotationAngle(selectedEle, e);
    const angleDiff = currentAngle - initialAngle;
    const currentRotation = parseFloat(getComputedStyle(selectedEle).transform.replace(/[^0-9-.,]/g, ''));

    selectedEle.style.transform = `rotate(${currentRotation + angleDiff}deg)`;
}

function endRotation() {
    isRotating = false;
    document.removeEventListener('mousemove', rotate);
    document.removeEventListener('mouseup', endRotation);
}

// Add event listener to allow resizing after rotation
selectedEle.addEventListener('mousedown', (e) => {
    if (e.target !== rotateHandle) {
        resizeControl(selectedEle);
    }
});