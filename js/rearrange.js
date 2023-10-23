// functon to move an element up, down, out, or in
function Ele_Actions(ele, action) {
    let parent = ele.parentNode;
    let children = parent.children;
    switch (action) {
        case 'up':
            // move it one step up
            parent.insertBefore(ele, children[0]);
            break;
        case 'down':
            // move it one step down
            parent.insertBefore(ele, children[children.length - 1].nextSibling);
            break;
        case 'out':
            // move it from the parent to the grandparent
            var grandparent = parent.parentNode;
            grandparent.insertBefore(ele, parent.nextSibling);
            break;
        case 'in':
            // move it from the grandparent to the (previous) parent
            var grandparent = parent.parentNode;
            parent.insertBefore(ele, grandparent);
            break;
        case 'delete':
            // delete the element
            parent.removeChild(ele);
            break;
        case 'clone':
            // clone the element
            var clone = ele.cloneNode(true);
            parent.insertBefore(clone, ele.nextSibling);
            break;
        case 'save':
            // save the element as reusable component
            break;
        case 'drag':
            // drag the element
            break;
    }
}