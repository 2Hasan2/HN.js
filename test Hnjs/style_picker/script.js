// log the files in the current directory
window.addEventListener('load', () => {
  const stylePicker = document.createElement('div');
  const cssPiker = document.createElement('style');
  cssPiker.innerHTML = `.stylePicker{display:flex;flex-direction:column;gap:10px;padding:10px;width:300px;height:fit-content;border-radius:10px;background:#fff;box-shadow:0 1px 4px 2px #0000007a;position:absolute;cursor:grab}.stylePicker label{display:flex;justify-content:space-between;width:100%;align-items:center;flex-wrap:nowrap;gap:10px}.stylePicker label input[type="number"]{width:100%;max-width:fit-content}.stylePicker label input[type="color"]{width:60px;height:30px;border-radius:5px;border:none;cursor:pointer}label.row{display:flex;flex-direction:row;justify-content:space-between;align-items:center;flex-wrap:nowrap;gap:10px}label.row input[type="number"]{width:30px;border:1px solid #0000007a;cursor:pointer}`
  document.head.appendChild(cssPiker);
  stylePicker.id = 'stylepicker';
  stylePicker.style.position = 'absolute';

  stylePicker.innerHTML = `<div id="stylePicker" class="stylePicker">
    <label for="color">Text Color
      <input name="color" type="color">
    </label>
    <label for="bg">Background Color
      <input name="bg" type="color">
    </label>
    <label for="font-size">Font Size 
      <input name="font-size" type="number" min="1">
    </label>
    <label for="margin">Margin 
      <input name="margin" type="number" min="0">
      <label  name='custom-margin-label' for='custom-margin' class='row'>
        <input name="margin-top" type="number" min="0" placeholder="Top">
        <input name="margin-right" type="number" min="0" placeholder="Right">
        <input name="margin-bottom" type="number" min="0" placeholder="Bottom">
        <input name="margin-left" type="number" min="0" placeholder="Left">
      </label>
      <input name='custom-margin' type='checkbox' id='custom-margin'>
    </label>
    <label for="padding">Padding 
        <input name="padding" type="number" min="0">
      <label  name='custom-padding-label' for='custom-padding' class='row'>
        <input name="padding-top" type="number" min="0" placeholder="Top">
        <input name="padding-right" type="number" min="0" placeholder="Right">
        <input name="padding-bottom" type="number" min="0" placeholder="Bottom">
        <input name="padding-left" type="number" min="0" placeholder="Left">
     </label>
      <input name='custom-padding' type='checkbox' id='custom-padding'>
    </label>
    <label for="border">Border 
      <input name="border-width" type="number" min="0" placeholder="Width">
      <select name="border-style">
        <option value="none">None</option>
        <option value="solid">Solid</option>
        <option value="dotted">Dotted</option>
        <option value="dashed">Dashed</option>
        <option value="double">Double</option>
        <option value="groove">Groove</option>
        <option value="ridge">Ridge</option>
        <option value="inset">Inset</option>
        <option value="outset">Outset</option>
      </select>
      <input name="border-color" type="color" placeholder="Color">
    </label>
    <label for="border-radius">Border Radius 
      <input name="border-radius" type="number" min="0">
    </label>
    <label for="width">Width 
      <input name="width" type="number" min="1">
    </label>
    <label for="height">Height 
      <input name="height" type="number" min="1">
    </label>
    <label for="line-height">Line Height 
      <input name="line-height" type="number" min="1">
    </label>
    <label for="text-align">Text Align
      <select name="text-align">
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="justify">Justify</option>
      </select>
    </label>
    <label for="text-decoration">Text Decoration
      <select name="text-decoration">
        <option value="none">None</option>
        <option value="underline">Underline</option>
        <option value="overline">Overline</option>
        <option value="line-through">Line Through</option>
        <option value="blink">Blink</option>
      </select>
    </label>
    <label for="font-weight">Font Weight
      <select name="font-weight">
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="bolder">Bolder</option>
        <option value="lighter">Lighter</option>
      </select>
    </label>
    <label for="font-style">Font Style
      <select name="font-style">
        <option value="normal">Normal</option>
        <option value="italic">Italic</option>
        <option value="oblique">Oblique</option>
      </select>
    </label>
    <label for="text-transform">Text Transform
      <select name="text-transform">
        <option value="none">None</option>
        <option value="uppercase">Uppercase</option>
        <option value="lowercase">Lowercase</option>
        <option value="capitalize">Capitalize</option>
      </select>
    </label>
    <label for="box-shadow">Box Shadow
      <input name="box-shadow" type="text" placeholder="e.g., 2px 2px 4px rgba(0, 0, 0, 0.2)">
    </label>
    <label for="opacity">Opacity (0-1)
      <input name="opacity" type="number" step="0.1" min="0" max="1">
    </label>
    <label for="transform">Transform
      <input name="transform" type="text" placeholder="e.g., rotate(45deg) scale(1.5)">
    </label>
    <button>OK</button>
  </div>
`
  let currentTarget;
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const target = e.target;

    if (target.tagName !== 'HTML') {
      document.body.appendChild(stylePicker);
      currentTarget = target;
      const x = e.pageX;
      const y = e.pageY;
      if (stylePicker.style.display != 'flex') stylePicker.style.display = 'flex';
      stylePicker.style.left = `${x}px`;
      stylePicker.style.top = `${y}px`;
      const colorInput = stylePicker.querySelector('input[name="color"]');
      const bgInput = stylePicker.querySelector('input[name="bg"]');
      const fontSizeInput = stylePicker.querySelector('input[name="font-size"]');
      const marginInput = stylePicker.querySelector('input[name="margin"]');
      const customMarginInput = stylePicker.querySelector('input[name="custom-margin"]');
      const customMarginLabel = stylePicker.querySelector('label[name="custom-margin-label"]');
      const marginTopInput = stylePicker.querySelector('input[name="margin-top"]');
      const marginRightInput = stylePicker.querySelector('input[name="margin-right"]');
      const marginBottomInput = stylePicker.querySelector('input[name="margin-bottom"]');
      const marginLeftInput = stylePicker.querySelector('input[name="margin-left"]');
      const paddingInput = stylePicker.querySelector('input[name="padding"]');
      const customPaddingInput = stylePicker.querySelector('input[name="custom-padding"]');
      const customPaddingLabel = stylePicker.querySelector('label[name="custom-padding-label"]');
      const paddingTopInput = stylePicker.querySelector('input[name="padding-top"]');
      const paddingRightInput = stylePicker.querySelector('input[name="padding-right"]');
      const paddingBottomInput = stylePicker.querySelector('input[name="padding-bottom"]');
      const paddingLeftInput = stylePicker.querySelector('input[name="padding-left"]');
      const borderWidthInput = stylePicker.querySelector('input[name="border-width"]');
      const borderStyleInput = stylePicker.querySelector('select[name="border-style"]');
      const borderColorInput = stylePicker.querySelector('input[name="border-color"]');
      const borderRadiusInput = stylePicker.querySelector('input[name="border-radius"]');
      const widthInput = stylePicker.querySelector('input[name="width"]');
      const heightInput = stylePicker.querySelector('input[name="height"]');
      const lineHeightInput = stylePicker.querySelector('input[name="line-height"]');
      const textAlignInput = stylePicker.querySelector('select[name="text-align"]');
      const textDecorationInput = stylePicker.querySelector('select[name="text-decoration"]');
      const fontWeightInput = stylePicker.querySelector('select[name="font-weight"]');
      const fontStyleInput = stylePicker.querySelector('select[name="font-style"]');
      const textTransformInput = stylePicker.querySelector('select[name="text-transform"]');
      const boxShadowInput = stylePicker.querySelector('input[name="box-shadow"]');
      const opacityInput = stylePicker.querySelector('input[name="opacity"]');
      const transformInput = stylePicker.querySelector('input[name="transform"]');
      // Set initial values from the clicked element
      colorInput.value = rgbToHex(getComputedStyle(currentTarget).color);
      bgInput.value = rgbToHex(getComputedStyle(currentTarget).backgroundColor);
      fontSizeInput.value = parseInt(getComputedStyle(currentTarget).fontSize);
      marginInput.value = parseInt(getComputedStyle(currentTarget).margin);
      marginTopInput.value = parseInt(getComputedStyle(currentTarget).marginTop);
      marginRightInput.value = parseInt(getComputedStyle(currentTarget).marginRight);
      marginBottomInput.value = parseInt(getComputedStyle(currentTarget).marginBottom);
      marginLeftInput.value = parseInt(getComputedStyle(currentTarget).marginLeft);
      paddingTopInput.value = parseInt(getComputedStyle(currentTarget).paddingTop);
      paddingRightInput.value = parseInt(getComputedStyle(currentTarget).paddingRight);
      paddingBottomInput.value = parseInt(getComputedStyle(currentTarget).paddingBottom);
      paddingLeftInput.value = parseInt(getComputedStyle(currentTarget).paddingLeft);
      borderWidthInput.value = parseInt(getComputedStyle(currentTarget).borderWidth);
      borderStyleInput.value = getComputedStyle(currentTarget).borderStyle;
      borderColorInput.value = rgbToHex(getComputedStyle(currentTarget).borderColor);
      borderRadiusInput.value = parseInt(getComputedStyle(currentTarget).borderRadius);
      widthInput.value = parseInt(getComputedStyle(currentTarget).width);
      heightInput.value = parseInt(getComputedStyle(currentTarget).height);
      lineHeightInput.value = parseInt(getComputedStyle(currentTarget).lineHeight == 'normal' ? 10 : getComputedStyle(currentTarget).lineHeight);
      textAlignInput.value = getComputedStyle(currentTarget).textAlign;
      textDecorationInput.value = getComputedStyle(currentTarget).textDecoration;
      fontWeightInput.value = getComputedStyle(currentTarget).fontWeight;
      fontStyleInput.value = getComputedStyle(currentTarget).fontStyle;
      textTransformInput.value = getComputedStyle(currentTarget).textTransform;
      boxShadowInput.value = getComputedStyle(currentTarget).boxShadow;
      opacityInput.value = parseFloat(getComputedStyle(currentTarget).opacity);
      transformInput.value = getComputedStyle(currentTarget).transform;

      // Set initial margin value
      if (marginTopInput.value == marginRightInput.value && marginTopInput.value == marginBottomInput.value && marginTopInput.value == marginLeftInput.value) {
        marginInput.value = marginTopInput.value;
        customMarginInput.checked = false;
        customMarginLabel.style.display = 'none';
      }
      // Set initial padding value
      if (paddingTopInput.value == paddingRightInput.value && paddingTopInput.value == paddingBottomInput.value && paddingTopInput.value == paddingLeftInput.value) {
        paddingInput.value = paddingTopInput.value;
        customPaddingInput.checked = false;
        customPaddingLabel.style.display = 'none';
      }


      // Update styles in real-time
      colorInput.addEventListener('input', () => {
        currentTarget.style.color = colorInput.value;
      });
      bgInput.addEventListener('input', () => {
        currentTarget.style.backgroundColor = bgInput.value;
      });
      fontSizeInput.addEventListener('input', () => {
        currentTarget.style.fontSize = fontSizeInput.value + 'px';
      });
      marginInput.addEventListener('input', () => {
        currentTarget.style.margin = marginInput.value + 'px';
        marginTopInput.value = marginInput.value;
        marginRightInput.value = marginInput.value;
        marginBottomInput.value = marginInput.value;
        marginLeftInput.value = marginInput.value;
      })
      customMarginInput.addEventListener('change', () => {
        if (customMarginInput.checked) {
          customMarginLabel.style.display = 'block';
          marginInput.style.display = 'none';

        } else {
          customMarginLabel.style.display = 'none';
          marginInput.style.display = 'block';
          marginInput.value = marginTopInput.value;
          currentTarget.style.margin = marginInput.value + 'px';
        }
      });
      marginTopInput.addEventListener('input', () => {
        currentTarget.style.marginTop = marginTopInput.value + 'px';
      });
      marginRightInput.addEventListener('input', () => {
        currentTarget.style.marginRight = marginRightInput.value + 'px';
      });
      marginBottomInput.addEventListener('input', () => {
        currentTarget.style.marginBottom = marginBottomInput.value + 'px';
      });
      marginLeftInput.addEventListener('input', () => {
        currentTarget.style.marginLeft = marginLeftInput.value + 'px';
      });
      paddingInput.addEventListener('input', () => {
        currentTarget.style.padding = paddingInput.value + 'px';
        paddingTopInput.value = paddingInput.value;
        paddingRightInput.value = paddingInput.value;
        paddingBottomInput.value = paddingInput.value;
        paddingLeftInput.value = paddingInput.value;
      });
      customPaddingInput.addEventListener('change', () => {
        if (customPaddingInput.checked) {
          customPaddingLabel.style.display = 'block';
          paddingInput.style.display = 'none';
        } else {
          customPaddingLabel.style.display = 'none';
          paddingInput.style.display = 'block';
          paddingInput.value = paddingTopInput.value;
          currentTarget.style.padding = paddingInput.value + 'px';
        }
      })
      paddingTopInput.addEventListener('input', () => {
        currentTarget.style.paddingTop = paddingTopInput.value + 'px';
      });
      paddingRightInput.addEventListener('input', () => {
        currentTarget.style.paddingRight = paddingRightInput.value + 'px';
      });
      paddingBottomInput.addEventListener('input', () => {
        currentTarget.style.paddingBottom = paddingBottomInput.value + 'px';
      });
      paddingLeftInput.addEventListener('input', () => {
        currentTarget.style.paddingLeft = paddingLeftInput.value + 'px';
      });
      borderWidthInput.addEventListener('input', () => {
        currentTarget.style.borderWidth = borderWidthInput.value + 'px';
      });
      borderStyleInput.addEventListener('change', () => {
        currentTarget.style.borderStyle = borderStyleInput.value;
      });
      borderColorInput.addEventListener('input', () => {
        currentTarget.style.borderColor = borderColorInput.value;
      });
      borderRadiusInput.addEventListener('input', () => {
        currentTarget.style.borderRadius = borderRadiusInput.value + 'px';
      });
      widthInput.addEventListener('input', () => {
        currentTarget.style.width = widthInput.value + 'px';
      });
      heightInput.addEventListener('input', () => {
        currentTarget.style.height = heightInput.value + 'px';
      });
      lineHeightInput.addEventListener('input', () => {
        currentTarget.style.lineHeight = lineHeightInput.value + 'px';
      });
      textAlignInput.addEventListener('change', () => {
        currentTarget.style.textAlign = textAlignInput.value;
      });
      textDecorationInput.addEventListener('change', () => {
        currentTarget.style.textDecoration = textDecorationInput.value;
      });
      fontWeightInput.addEventListener('change', () => {
        currentTarget.style.fontWeight = fontWeightInput.value;
      });
      fontStyleInput.addEventListener('change', () => {
        currentTarget.style.fontStyle = fontStyleInput.value;
      });
      textTransformInput.addEventListener('change', () => {
        currentTarget.style.textTransform = textTransformInput.value;
      });
      boxShadowInput.addEventListener('input', () => {
        currentTarget.style.boxShadow = boxShadowInput.value;
      });
      opacityInput.addEventListener('input', () => {
        currentTarget.style.opacity = opacityInput.value;
      });
      transformInput.addEventListener('input', () => {
        currentTarget.style.transform = transformInput.value;
      });
      stylePicker.children[0].children[18].addEventListener('click', () => {
        stylePicker.remove();

      });
    } else {
      stylePicker.style.display = 'none';
      stylePicker.remove();
    }
  });
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
  // move the style picker with the mouse cursor
  let isDragging = false;
  let offsetX, offsetY;

  stylePicker.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - stylePicker.getBoundingClientRect().left;
    offsetY = e.clientY - stylePicker.getBoundingClientRect().top;
    stylePicker.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    stylePicker.style.left = `${newX}px`;
    stylePicker.style.top = `${newY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    stylePicker.style.cursor = "grab";
  });
});