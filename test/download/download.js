/*
    this script will download the current page 
    as html file without any script tag and comment tag
*/
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
            const fileContent = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/<!--(.*?)-->/g, '');
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            const fileName = prompt("inter file name and extension");
            if (!fileName) {
                return;
            }
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(a.href);
            alert('file downloaded');
        }
    });
});
