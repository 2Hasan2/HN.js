// usage: resize the div


// Control function use for resize the div
function resizeControl(iframeBody, selectedEle) {
    // get all the resize div

    console.log(selectedEle);
    let resizeDivs = [...selectedEle.querySelectorAll('.resize div')];
    // add event listener to all the resize div
    resizeDivs.forEach((resizeDiv) => {
        resizeDiv.addEventListener("mousedown", (e) => {
            resize(selectedEle, e, e.target.classList[0]);
        });
    });
};

// resize function
function resize(ele, event, dir) {
    event.preventDefault();
    let initialWidth = parseFloat(getComputedStyle(ele).width);
    let initialHeight = parseFloat(getComputedStyle(ele).height);
    let initialX = event.clientX;
    let initialY = event.clientY;
    let initialLeft = parseFloat(getComputedStyle(ele).left);
    let initialTop = parseFloat(getComputedStyle(ele).top);

    iframeBody.addEventListener("mousemove", move);
    iframeBody.addEventListener("mouseup", end);

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
        iframeBody.removeEventListener("mousemove", move);
        iframeBody.removeEventListener("mouseup", end);
    }
}