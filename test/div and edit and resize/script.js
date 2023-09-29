
class Div {
    constructor() {
        this.selectedElement = null;
        this.isResizing = false;
        this.resizeListener = null;

        // Create and set up and before the script tags
        this.element = document.createElement("div");
        let script = document.querySelector("script");
        document.body.insertBefore(this.element, script);



        // add width to the div
        this.element.style.height = "100px";
        this.element.style.width = "100px";
        this.element.style.border = "1px solid black";

    }

    startResize(e) {
        e.preventDefault();
        if (this.isResizing) {
            this.isResizing = false;
            document.removeEventListener("mousemove", this.resizeListener);
        } else {
            this.isResizing = true;
            this.resizeListener = (e) => resize(e);
            document.addEventListener("mousemove", this.resizeListener);

        }
        let resize = (e) => {
            if (this.isResizing) {
                this.element.style.width = e.clientX - this.element.offsetLeft + "px";
                this.element.style.height = e.clientY - this.element.offsetTop + "px";
            }
        }
    }
}

document.addEventListener("keydown", function (e) {
    if (e.key === "d" && e.ctrlKey) {
        e.preventDefault();
        new Div();
    }
});
