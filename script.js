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
.selected {
    background-color: #007bff;
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

// to add element
const add_div = document.getElementById('add-div');
const add_p = document.getElementById('add-p');
const add_span = document.getElementById('add-span');
const add_button = document.getElementById('add-button');
const add_input = document.getElementById('add-input');
const add_a = document.getElementById('add-a');
const add_img = document.getElementById('add-img');

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
