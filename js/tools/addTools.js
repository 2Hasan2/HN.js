
let tools = `
<div id="tools" not-draggable='true'>
<div class="radius-controllers" not-draggable='true'>
            <div class="radius-controller top-left" id="top-left" not-draggable='true'></div>
            <div class="radius-controller top-right" id="top-right" not-draggable='true'></div>
            <div class="radius-controller bottom-left" id="bottom-left" not-draggable='true'></div>
            <div class="radius-controller bottom-right" id="bottom-right" not-draggable='true'></div>
</div>
<div class="resize" not-draggable='true'>
            <!-- top -->
            <div class="top-left" not-draggable='true'></div>
            <div class="top-center" not-draggable='true'></div>
            <div class="top-right" not-draggable='true'></div>
            <!-- center -->
            <div class="center-left" not-draggable='true'></div>
            <div class="center-right" not-draggable='true'></div>
            <!-- bottom -->
            <div class="bottom-left" not-draggable='true'></div>
            <div class="bottom-center" not-draggable='true'></div>
            <div class="bottom-right" not-draggable='true'></div>
</div>
<div class="rotate" id="rotate" not-draggable='true'></div>
</div>
`

// add styles to the iframe
function setstyle(iframeHead) {
    iframeHead.innerHTML += `
    <link rel="stylesheet" href="./css/tools/radius.css">
    <link rel="stylesheet" href="./css/tools/resize.css">
    <link rel="stylesheet" href="./css/tools/rotate.css">
`;
    // add class on the head use style tag
    let style = document.createElement('style');
    style.innerHTML = `
*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    position: relative;
    min-height: fit-content;
    min-width: fit-content;
    transition: all 0.3s;
    cursor: move;
}
div, p, span, button, input, a, img {
    display: flex;
}
#tools {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
`;
    iframeHead.appendChild(style);
}
// add tools to the iframe
function settools(iframeDocument, selectedEle) {
    let oldTools = iframeDocument.querySelector('#tools');
    console.log(oldTools);
    if (oldTools) {
        oldTools.remove();
    }
    selectedEle.innerHTML += tools;
}