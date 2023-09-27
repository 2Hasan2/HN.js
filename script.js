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
function ShowTree(tree) {
    tree.forEach(element => {
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
    });
}

// to add element
function addElement(tagName, parent) {
    let element = document.createElement(tagName);
    element.innerText = 'new element';
    element.id = iframeBody.children.length + 1;
    parent.appendChild(element);
}
addElement('div', iframeBody);
addElement('div', iframeBody);
addElement('div', iframeBody);
addElement('div', iframeBody);

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

// must use after add elements to iframe
ShowTree(logDOMTree(iframeBody))


// bind the selected element styles to the input use jquery
function bindElementStyle(element) {
    let style = window.getComputedStyle(element);
    console.log(style.width);
    console.log(style.height);
    console.log(style.left);
    console.log(style.top);
    $('#w').val(style.width.split('px')[0]);
    $('#h').val(style.height.split('px')[0]);
    $('#x').val(style.left.split('px')[0]);
    $('#y').val(style.top.split('px')[0]);
}