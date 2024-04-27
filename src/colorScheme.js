class ColorScheme {
  colors;

  constructor() {
    this.colors = {
      // hardcoded to start but this will come from localStorage

      // light mode backdrop scheme
      backdropLightest: [7, 48, 82],
      backdropLighter: [17, 48, 78],
      backdrop: [22, 48, 72],

      // dark mode backdrop scheme
      darkModeBackdrop: [22, 28, 22],
      darkModeBackdropDarker: [27, 18, 16],
      darkModeBackdropDarkest: [37, 21, 12],

      // components

      // display window
      displayWindow: [7, 35, 89],

      // calculator shell scheme
      calculatorShellLightest: [142, 78, 42],
      calculatorShellLighter: [142, 78, 37],
      calculatorShell: [142, 78, 32],
      calculatorShellDarker: [142, 40, 27],

      // operatorButtons
      operatorButtons: [-98, 58, 32],
      darkModeOperatorButtons: [-98, 58, 20],
    };
  }

  createCustomPalette() {
    const newBackdropColor = [
      Math.floor(Math.random() * 360), // hue between 0 and 360deg,
      Math.floor(Math.random() * 10) + 40, // saturation between 40% and 50%,
      Math.floor(Math.random() * 10) + 70, // light between 70% and 80%
    ];
    // customColorScheme.backdrop = newBackdropColor;
    this.colors.backdrop = newBackdropColor;

    // now, set other colors based on these new backdrop color values

    const newBackdropLighter = [
      newBackdropColor[0] - 5,
      newBackdropColor[1],
      newBackdropColor[2] + 6,
    ];

    this.colors.backdropLighter = newBackdropLighter;

    const newBackdropLightest = [
      newBackdropColor[0] - 15,
      newBackdropColor[1],
      newBackdropColor[2] + 10,
    ];

    this.colors.backdropLightest = newBackdropLightest;

    const newDarkModeBackdrop = [
      newBackdropColor[0],
      newBackdropColor[1],
      newBackdropColor[2] - 50,
    ];

    this.colors.darkModeBackdrop = newDarkModeBackdrop;

    const newDarkModeBackdropDarker = [
      newDarkModeBackdrop[0] + 5,
      newDarkModeBackdrop[1] - 10,
      newDarkModeBackdrop[2] - 6,
    ];

    this.colors.darkModeBackdropDarker = newDarkModeBackdropDarker;

    const newDarkModeBackdropDarkest = [
      newDarkModeBackdrop[0] + 15,
      newDarkModeBackdrop[1] - 7,
      newDarkModeBackdrop[2] - 10,
    ];

    this.colors.darkModeBackdropDarkest = newDarkModeBackdropDarkest;

    // new shell scheme //

    const newShell = [
      newBackdropColor[0] + 120,
      newBackdropColor[1] + 30,
      newBackdropColor[2] - 40,
    ];

    this.colors.calculatorShell = newShell;

    const newShellLightest = [
      newBackdropColor[0] + 120,
      newShell[1],
      newShell[2] + 10,
    ];

    this.colors.calculatorShellLightest = newShellLightest;

    const newShellLighter = [
      newBackdropColor[0] + 120,
      newShell[1],
      newShell[2] + 5,
    ];

    this.colors.calculatorShellLighter = newShellLighter;

    const newShellDarker = [
      newBackdropColor[0] + 120,
      newShell[1] - 38,
      newShell[2] - 5,
    ];

    this.colors.calculatorShellDarker = newShellDarker;

    const newDisplayWindow = [
      newBackdropLightest[0],
      newBackdropLightest[1],
      newBackdropLightest[2] + 7,
    ];

    this.colors.displayWindow = newDisplayWindow;

    const newOperatorButtons = [
      newBackdropColor[0] - 120,
      newBackdropColor[1] + 30,
      newBackdropColor[2] - 40,
    ];

    this.colors.operatorButtons = newOperatorButtons;

    const newDarkModeOperatorButtons = [
      newBackdropColor[0] - 120,
      newBackdropColor[1] + 30,
      newBackdropColor[2] - 60,
    ];

    this.colors.darkModeOperatorButtons = newDarkModeOperatorButtons;
  }
}

export default ColorScheme;
