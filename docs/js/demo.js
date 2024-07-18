let PICKER_COMPLETE,
    PICKER_BASIC,
    PICKER_MINIMAL,
    PICKER_UNIQUE,
    PICKER_UNIQUE_CIRCLE,
    PICKER_UNIQUE_TRIANGLE,
    PICKER_UNIQUE_PALETTE;

const CHECKBOX_THEME = document.getElementById("DEMO_THEME"),
      CHECKBOX_CLASSIC = document.getElementById("DEMO_CLASSIC"),
      CHECKBOX_ALPHA = document.getElementById("DEMO_ALPHA"),
      CHECKBOX_NAME = document.getElementById("DEMO_NAME"),
      PICKERS = [],
      BTN_SHOW_COMPLETE = document.getElementById("DEMO_SHOW_COMPLETE");

window.addEventListener("load", () => {
    PICKER_COMPLETE = new R9Picker("DEMO_COMPLETE", R9Picker.TYPE.COMPLETE);
    PICKER_BASIC = new R9Picker("DEMO_BASIC", R9Picker.TYPE.BASIC);
    PICKER_MINIMAL = new R9Picker("DEMO_MINIMAL", R9Picker.TYPE.MINIMAL);
    PICKER_UNIQUE = new R9Picker("DEMO_UNIQUE", R9Picker.TYPE.UNIQUE);
    PICKER_UNIQUE_CIRCLE = new R9Picker("DEMO_UNIQUE--CIRCLE", R9Picker.TYPE.UNIQUE);
    PICKER_UNIQUE_TRIANGLE = new R9Picker("DEMO_UNIQUE--TRIANGLE", R9Picker.TYPE.UNIQUE);
    PICKER_UNIQUE_PALETTE = new R9Picker("DEMO_UNIQUE--PALETTE", R9Picker.TYPE.UNIQUE);

    PICKERS.push(PICKER_COMPLETE);
    PICKERS.push(PICKER_BASIC);
    PICKERS.push(PICKER_MINIMAL);
    PICKERS.push(PICKER_UNIQUE);
    PICKERS.push(PICKER_UNIQUE_CIRCLE);
    PICKERS.push(PICKER_UNIQUE_TRIANGLE);
    PICKERS.push(PICKER_UNIQUE_PALETTE);

    PICKER_COMPLETE.unhideTab(R9Picker.TAB.CIRCLE);
    PICKER_COMPLETE.unhideTab(R9Picker.TAB.TRIANGLE);

    PICKER_BASIC.unhideTab(R9Picker.TAB.CIRCLE);
    PICKER_BASIC.unhideTab(R9Picker.TAB.TRIANGLE);

    PICKER_MINIMAL.unhideTab(R9Picker.TAB.CIRCLE);
    PICKER_MINIMAL.unhideTab(R9Picker.TAB.TRIANGLE);

    PICKER_UNIQUE_CIRCLE.unhideTab(R9Picker.TAB.CIRCLE);
    PICKER_UNIQUE_CIRCLE.goToTab(R9Picker.TAB.CIRCLE);

    PICKER_UNIQUE_TRIANGLE.unhideTab(R9Picker.TAB.TRIANGLE);
    PICKER_UNIQUE_TRIANGLE.goToTab(R9Picker.TAB.TRIANGLE);

    PICKER_UNIQUE_PALETTE.goToTab(R9Picker.TAB.PALETTE);

    PICKER_COMPLETE.addPalette(R9Picker.PALETTE.CLASSIC);
    PICKER_BASIC.addPalette(R9Picker.PALETTE.CLASSIC_LIGHT);

    PICKER_UNIQUE_PALETTE.addPalette(R9Picker.PALETTE.MATERIAL_DESIGN);
    PICKER_UNIQUE_PALETTE.addPalette(R9Picker.PALETTE.CLASSIC);
    PICKER_UNIQUE_PALETTE.addPalette(R9Picker.PALETTE.HUE_24);
    PICKER_UNIQUE_PALETTE.addPalette(R9Picker.PALETTE.CLASSIC_LIGHT);

    PICKER_BASIC.SIZE = 150;
    PICKER_MINIMAL.SIZE = 150;

    PICKER_UNIQUE.SIZE = 150;
    PICKER_UNIQUE_CIRCLE.SIZE = 140;
    PICKER_UNIQUE_TRIANGLE.SIZE = 130;
    PICKER_UNIQUE_PALETTE.SIZE = 120;

    PICKER_BASIC.COLOR = "#D1DE1F";
    PICKER_MINIMAL.COLOR = "#43A46B";
    PICKER_UNIQUE.COLOR = "#D48FCD";
    PICKER_UNIQUE_CIRCLE.COLOR = "#931DC6";
    PICKER_UNIQUE_TRIANGLE.COLOR = "#D8403D";

    PICKERS.forEach((picker) => {
        picker.addEventListener(R9Picker.EVENT.CANCELED, () => {
            PICKER_COMPLETE.hide();

            BTN_SHOW_COMPLETE.style.display = "inline-block";
        });

        picker.addEventListener(R9Picker.EVENT.SET, (data) => {
            PICKER_COMPLETE.UI_COLOR = data.current.hex;
            PICKER_BASIC.UI_COLOR = data.current.hex;
            PICKER_MINIMAL.UI_COLOR = data.current.hex;
    
            document.getElementById("DEMO_EV_SET").style.backgroundColor = data.current.hex;
            document.getElementById("DEMO_EV_SET").style.color = R9.constrastRatio(data.current.hex, R9.Color.black, R9.WCAG.AA_NORMAL) ? R9.Color.black : R9.Color.white;
            document.getElementById("DEMO_EV_SET").innerHTML = data.current.hex;
        });

        picker.addEventListener(R9Picker.EVENT.PICKING, (data) => {    
            document.getElementById("DEMO_EV_PICKING").style.backgroundColor = data.hex;
            document.getElementById("DEMO_EV_PICKING").style.color = R9.constrastRatio(data.hex, R9.Color.black, R9.WCAG.AA_NORMAL) ? R9.Color.black : R9.Color.white;
            document.getElementById("DEMO_EV_PICKING").innerHTML = data.hex;
        });

        picker.addEventListener(R9Picker.EVENT.PICKING_END, (data) => {    
            document.getElementById("DEMO_EV_END").style.backgroundColor = data.hex;
            document.getElementById("DEMO_EV_END").style.color = R9.constrastRatio(data.hex, R9.Color.black, R9.WCAG.AA_NORMAL) ? R9.Color.black : R9.Color.white;
            document.getElementById("DEMO_EV_END").innerHTML = data.hex;
        });

        picker.addEventListener(R9Picker.EVENT.INPUT, (data) => {    
            document.getElementById("DEMO_EV_INPUT").style.backgroundColor = data.color.hex;
            document.getElementById("DEMO_EV_INPUT").style.color = R9.constrastRatio(data.color.hex, R9.Color.black, R9.WCAG.AA_NORMAL) ? R9.Color.black : R9.Color.white;
            document.getElementById("DEMO_EV_INPUT").innerHTML = data.color.hex;
        });

        picker.addEventListener(R9Picker.EVENT.COLOR_SAVED, (data) => {    
            document.getElementById("DEMO_EV_SAVED").style.backgroundColor = data.color.hex;
            document.getElementById("DEMO_EV_SAVED").style.color = R9.constrastRatio(data.color.hex, R9.Color.black, R9.WCAG.AA_NORMAL) ? R9.Color.black : R9.Color.white;
            document.getElementById("DEMO_EV_SAVED").innerHTML = data.color.hex;
        });

    });

//============================================================================
    CHECKBOX_THEME.addEventListener("click", () => {
        PICKERS.forEach((picker) => {
            picker.setDarkMode(CHECKBOX_THEME.checked);
        });
    });

    CHECKBOX_CLASSIC.addEventListener("click", () => {
        PICKERS.forEach((picker) => {
            picker.setClassic(CHECKBOX_CLASSIC.checked);
        });
    });

    CHECKBOX_ALPHA.addEventListener("click", () => {
        PICKERS.forEach((picker) => {
            picker.setAlphaEnabled(CHECKBOX_ALPHA.checked);
        });
    });

    CHECKBOX_NAME.addEventListener("click", () => {
        PICKERS.forEach((picker) => {
            picker.showColorNameOnPalette(CHECKBOX_NAME.checked);
        });
    });

    BTN_SHOW_COMPLETE.addEventListener("click", () => {
        PICKER_COMPLETE.show();

        BTN_SHOW_COMPLETE.style.display = "none";
    });
});