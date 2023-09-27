let isResizing = false;

document.addEventListener("DOMContentLoaded", () => {
    let allElements = [...document.body.children].filter(element => element.tagName !== "SCRIPT");
    allElements.forEach(ele => {
        ele.addEventListener("dblclick", () => editText(ele));
        ele.addEventListener("blur", () => saveText(ele));
        ele.addEventListener("click", (e) => {
            isResizing ? isResizing = false : isResizing = true;
            console.log(isResizing);
            e.stopPropagation(); // Prevent click event from bubbling up
        });
    });
});

let editText = (ele) => {
    console.log(ele);
    ele.contentEditable = true;
    ele.style.outline = "1px solid black";
    ele.focus();
}

let saveText = (ele) => {
    ele.style.outline = "none";
    ele.contentEditable = false;
}

document.addEventListener("mousemove", (e) => {
    if (isResizing) {
        const resizableElement = document.querySelector(".resizing");
        if (resizableElement) {
            resizableElement.style.width = e.clientX + "px";
            resizableElement.style.height = e.clientY + "px";
        }
    }
});
