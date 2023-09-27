// usage
// Draggable(the element you want to make draggable)
// it will make all the children of the element draggable too
document.addEventListener("DOMNodeInserted", () => {
    Draggable(document.body);
});

function Draggable(ele) {
    addDraggableAttribute(ele);
    function addDraggableAttribute(ele) {
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
            console.log();
        }
        draggedElement = null;
    });
}
