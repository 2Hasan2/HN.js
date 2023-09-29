function convert2img(imgType = 'png', ele = document.body) {
    html2canvas(ele).then(function (canvas) {
        const imgDataUrl = canvas.toDataURL(`image/${imgType}`);
        const link = document.createElement('a');
        link.download = `export.${imgType}`;
        link.href = imgDataUrl;
        link.click();
    });
}