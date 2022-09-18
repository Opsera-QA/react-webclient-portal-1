export const THEMES = {
  LIGHT: "light",
  NIGHT: "night",
};

export const THEME_LABELS = {
  LIGHT: "Light",
  NIGHT: "Light Up The Night",
};

export const getThemeLabel = (theme) => {
  switch (theme) {
    case THEMES.LIGHT:
      return THEME_LABELS.LIGHT;
    case THEMES.NIGHT:
      return THEME_LABELS.NIGHT;
    default:
      return theme;
  }
};

export const THEME_SELECT_OPTIONS = [
  {
    text: THEMES.LIGHT,
    value: THEME_LABELS.LIGHT,
  },
  {
    text: THEMES.NIGHT,
    value: THEME_LABELS.NIGHT,
  },
];