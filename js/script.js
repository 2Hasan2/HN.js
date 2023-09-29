// dom-tree
let domTree = document.getElementById('dom-tree');

// iframe
const iframe = document.getElementById('frame');
const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
const iframeBody = iframeDocument.body;
const iframeHead = iframeDocument.head;

// selected element
let selectedEle = null;


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
.selected {
    outline: 2px solid #100;
    animation: blink 1s infinite;
}
@keyframes blink {
    0% {
        outline: 2px solid #100;
    }

    50% {
        outline: 2px solid #fff;
    }

    100% {
        outline: 2px solid #100;
    }
}
`;
iframeHead.appendChild(style);

// to get the dom tree
function logDOMTree(node, depth = 0, tree = []) {
    let indent = '';
    if (depth > 0) {
        indent = ' '.repeat(depth * 3) + '|-';
    }
    tree.push(`${indent}${node.tagName}#${node.id}`);
    console.log();
    if (node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
            logDOMTree(node.children[i], depth + 1, tree);
        }
    }
    return tree;
}

// to show the dom tree
function showElement(element) {
    let div = document.createElement('div');
    let depth = (element.split(' ').length - 1) / 3;
    div.style.color = '#' + (depth * 1111111).toString(16);
    div.innerText = element;
    domTree.appendChild(div);
    div.addEventListener('click', function () {
        if (selectedEle) {
            selectedEle.classList.remove('selected');
        }
        selectedEle = iframeDocument.getElementById(`${div.innerText.split('#')[1]}`);
        selectedEle.classList.add('selected');
        bindElementStyle(selectedEle)
    });
}
iframeBody.addEventListener('click', function (e) {
    if (selectedEle) {
        selectedEle.classList.remove('selected');
    }
    selectedEle = e.target;
    selectedEle.classList.add('selected');
    bindElementStyle(selectedEle)

});
function ShowTree(tree) {
    domTree.innerHTML = "";
    tree.forEach(element => showElement(element));
}


// btns to add element
const add_div = document.getElementById('add-div');
const add_p = document.getElementById('add-p');
const add_span = document.getElementById('add-span');
const add_button = document.getElementById('add-button');
const add_input = document.getElementById('add-input');
const add_a = document.getElementById('add-a');
const add_img = document.getElementById('add-img');

// add element function
function addElement(tagName, parent) {
    let element = document.createElement(tagName);
    element.innerText = 'new element';
    element.id = Math.floor(Math.random() * 999999)
    parent.appendChild(element);
}


add_div.onclick = e => {
    addElement('div', selectedEle || iframeBody);
    ShowTree(logDOMTree(iframeBody));
}
add_p.onclick = e => {
    addElement('p', selectedEle || iframeBody);
    ShowTree(logDOMTree(iframeBody));
}
add_span.onclick = e => {
    addElement('span', selectedEle || iframeBody);
    ShowTree(logDOMTree(iframeBody));
}
add_button.onclick = e => {
    addElement('button', selectedEle || iframeBody);
    ShowTree(logDOMTree(iframeBody));
}
add_input.onclick = e => {
    addElement('input', selectedEle || iframeBody);
    ShowTree(logDOMTree(iframeBody));
}
add_a.onclick = e => {
    addElement('a', selectedEle || iframeBody);
    ShowTree(logDOMTree(iframeBody));
}
add_img.onclick = e => {
    addElement('img', selectedEle || iframeBody);
    ShowTree(logDOMTree(iframeBody));
}



// to remove element
function removeElement(element) {
    element.remove();
}

// to edit element
function editElement(element, text) {
    element.innerText = text;
}

// to appand element to another element
function appandElement(element, parent) {
    parent.appendChild(element);
}

ShowTree(logDOMTree(iframeBody));

// Function to convert RGB to Hex
function rgbToHex(rgb) {
    // Extract the individual color values
    const values = rgb.match(/\d+/g);
    const r = parseInt(values[0]);
    const g = parseInt(values[1]);
    const b = parseInt(values[2]);

    // Convert to hex format
    const hex = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    return hex;
}
// bind element style
function bindElementStyle(element) {
    const bgInput = document.getElementById('bg');
    const fontColor = document.getElementById("fc");
    const borderColor = document.getElementById("br")
    const X = document.getElementById("x");
    const Y = document.getElementById("y");
    const width = document.getElementById("w");
    const height = document.getElementById("h");
    const A = document.getElementById("a");
    const radius = document.getElementById("r");

    // id flex
    const flex = document.getElementById('flex');
    console.log(getComputedStyle(element));


    // show sytle of element
    width.value = parseInt(getComputedStyle(element).width);
    height.value = parseInt(getComputedStyle(element).height);
    // angle 
    let a = getComputedStyle(element).transform;
    // convert matrix to angle
    a = Math.round(Math.asin(a.split(',')[1]) * (180 / Math.PI)) || 0;
    A.value = a;
    radius.value = parseInt(getComputedStyle(element).borderRadius.split('px')[0]);
    bgInput.value = rgbToHex(getComputedStyle(element).backgroundColor);
    fontColor.value = rgbToHex(getComputedStyle(element).color);
    borderColor.value = rgbToHex(getComputedStyle(element).borderColor);
    X.value = parseInt(getComputedStyle(element).left) || 0;
    Y.value = parseInt(getComputedStyle(element).top) || 0;

    // change style of element
    width.onchange = e => {
        element.style.width = e.target.value + 'px';
    }
    height.onchange = e => {
        element.style.height = e.target.value + 'px';
    }
    A.onchange = e => {
        element.style.transform = `rotate(${e.target.value}deg)`;
    }
    radius.onchange = e => {
        element.style.borderRadius = e.target.value + 'px';
    }
    bgInput.onchange = e => {
        element.style.backgroundColor = e.target.value;
    }
    fontColor.onchange = e => {
        element.style.color = e.target.value;
    }
    borderColor.onchange = e => {
        element.style.borderColor = e.target.value;
    }
    X.onchange = e => {
        element.style.left = e.target.value + 'px';
    }
    Y.onchange = e => {
        element.style.top = e.target.value + 'px';
    }
}

