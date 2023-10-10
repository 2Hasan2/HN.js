// Version: 1.0
iframeBody.addEventListener('click', () => {
    Draggable(iframeBody);
});

function Draggable(ele, selectedEle) {

    addDraggableAttribute(ele);
    function addDraggableAttribute(ele) {
        if (!['HTML', 'BODY', 'HEAD', "SCRIPT"].includes(ele.tagName)) {
            ele.setAttribute('draggable', 'true');
        };
        if (ele.hasAttribute('not-draggable') || ele.classList.contains('selected')) {
            ele.setAttribute('draggable', 'false');
        }
        for (const childElement of ele.children) {
            addDraggableAttribute(childElement);
        }
    }

    let draggedElement = null;
    iframeBody.addEventListener("dragstart", (e) => {

        draggedElement = e.target;
    });

    iframeBody.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    iframeBody.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.target.tagName != "HTML" || !e.target.hasAttribute('not-draggable')) {
            e.target.appendChild(draggedElement);
            ShowTree(logDOMTree(iframeBody));

        }
        draggedElement = null;
    });
}
