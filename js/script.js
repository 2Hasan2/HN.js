// iframe
const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
const iframeBody = iframeDocument.body;
const iframeHead = iframeDocument.head;

// selected element
let selectedEle = null;
let copiedEle = null;

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
    animation: blink 4s infinite;
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
        bindElementStyle(selectedEle);
        ResizeAndRotete(selectedEle, iframeBody)
    });
}
iframeBody.addEventListener('dblclick', function (e) {
    if (selectedEle) {
        selectedEle.classList.remove('selected');
    }
    selectedEle = e.target;
    selectedEle.classList.add('selected');
    bindElementStyle(selectedEle);
    ResizeAndRotete(selectedEle, iframeBody)

});

function ShowTree(tree) {
    domTree.innerHTML = "";
    tree.forEach(element => showElement(element));
}

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
Export.onclick = e => {
    convert2img('png', selectedEle || iframeBody);
}
remove.onclick = e => {
    if (selectedEle) {
        if (selectedEle != iframeBody) {
            selectedEle.remove();
        }
        ShowTree(logDOMTree(iframeBody));
    }
}
edit.onclick = e => {
    if (iframeBody != selectedEle && selectedEle != null) {
        // make element editable
        selectedEle.contentEditable = true;
        selectedEle.focus();
        selectedEle.addEventListener('blur', function () {
            selectedEle.contentEditable = false;
        })
    }
}

copy.onclick = e => {
    if (selectedEle) {
        console.log(selectedEle);
        let copy = selectedEle.cloneNode(true);
        copy.id = Math.floor(Math.random() * 999999)
        copy.classList.remove('selected');
        selectedEle.parentElement.appendChild(copy);
        ShowTree(logDOMTree(iframeBody));
    }
}

// to appand element to another element
function appandElement(element, parent) {
    parent.appendChild(element);
}


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
function bindElementStyle(element = selectedEle) {
    if (!element) return;


    // show sytle of element
    function showStyle(element) {
        ['width', 'height', 'borderRadius', 'backgroundColor', , 'transform', 'color', 'borderColor', 'left', 'top'].forEach((style) => {
            if (style == 'transform') {
                let a = getComputedStyle(element).transform;
                // convert matrix to angle
                transform.value = Math.round(Math.asin(a.split(',')[1]) * (180 / Math.PI)) || 0;
            } if (style.includes('color') || style.includes('Color')) {
                eval(`${style}.value = rgbToHex(getComputedStyle(element).${style});`);
            } else {
                try {
                    eval(`${style}.value = parseInt(getComputedStyle(element).${style}) || 0;`);
                    eval(`units_${style}.value = getComputedStyle(element).${style}.split('px')[1] || 'px';`);
                } catch (e) {
                    console.log(`can't use ${style} on ${element.tagName}`);
                }
            }

        });

    }
    showStyle(element)


    //INPUTS
    function INPUT(type, input_value, input_unit) {
        function Do(input_value, input_unit) {
            let [value, unit] = [input_value.value, input_unit.value];
            if (['px', '%', 'em', 'rem', 'vw', 'vh'].includes(unit)) {
                input_value.style.display = 'block';
                selectedEle.style[type] = value + unit;
            } if (['auto', 'fit-content', '50%'].includes(unit)) {
                input_value.style.display = 'none';
                selectedEle.style[type] = unit;
            }
        }
        input_unit.addEventListener("input", function () {
            Do(input_value, input_unit);
        });
        input_value.addEventListener("input", function () {
            Do(input_value, input_unit);
        });
    }

    ['width', 'height', 'borderRadius', 'left', 'top', 'gap'].forEach((style) => {
        INPUT(style, eval(style), eval(`units_${style}`));
    });

    transform.onchange = e => {
        element.style.transform = `rotate(${e.target.value}deg)`;
    }
    backgroundColor.onchange = e => {
        element.style.backgroundColor = e.target.value;
    }
    color.onchange = e => {
        element.style.color = e.target.value;
    }
    borderColor.onchange = e => {
        element.style.borderColor = e.target.value;
    }
}

// flex element
let [a, b, c, d] = [...flex.children]

let flex_icons = [...a.children, ...b.children, ...c.children, ...d.children]
flex_icons.forEach((icon) => {
    icon.addEventListener('click', () => {
        if (selectedEle == null) return;
        if (icon.getAttribute('data-flex').includes('column')) {
            // rotate icon of justify-content and align-items
            let [Justify, Align] = [[...justify.children], [...align.children]]
            Justify.forEach((icon) => {
                icon.style.cssText = 'transform:rotate(90deg)'
            })
            Align.forEach((icon) => {
                icon.style.cssText = 'transform:rotate(0deg)'
            })
        } else if (icon.getAttribute('data-flex').includes('row')) {
            // rotate icon of justify-content and align-items
            let [Justify, Align] = [[...justify.children], [...align.children]]
            Justify.forEach((icon) => {
                icon.style.cssText = 'transform:rotate(0deg)'
            })
            Align.forEach((icon) => {
                icon.style.cssText = 'transform:rotate(90deg)'
            })
        }
        // change flex style
        selectedEle.style.cssText += `${icon.getAttribute('data-flex')}`
    })
})


window.onload = function () {
    ShowTree(logDOMTree(iframeBody));
}