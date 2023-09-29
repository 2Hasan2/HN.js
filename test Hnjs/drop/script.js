// Version: 1.0
document.addEventListener('click', () => {
    Draggable(document.body);
});

function Draggable(ele) {
    addDraggableAttribute(ele);
    function addDraggableAttribute(ele) {
        console.log(ele.tagName);
        if (['HTML', 'BODY', 'HEAD', "SCRIPT"].includes(ele.tagName)) return;
        ele.setAttribute('draggable', 'true');
        for (const childElement of ele.children) {
            addDraggableAttribute(childElement);
        }
    }
    let draggedElement = null;
    document.addEventListener("dragstart", (e) => {
        draggedElement = e.target;
    });
    document.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    document.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.target.tagName != "HTML") {
            e.target.appendChild(draggedElement);
        }
        draggedElement = null;
    });
}
