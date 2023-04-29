export const lightThemeConstants = {};

// TODO: Simplify, rename colors to what general contexts are to make different themes easier to understand
lightThemeConstants.COLOR_PALETTE = {
  WHITE: "#FFFFFF",
  RED: "#FF0000",
  DANGER_RED: "#dc3545",
  DANGER_SECONDARY: "#FFAAAA",

  // Blue
  SALESFORCE_BLUE: "#1798c1",
  BLUE: "#0f3f91",
  BLUE_ALT: "#40a7ed",
  LIGHT_BLUE: "#67C1E3",

  // Purple
  GRAY_PURPLE: "#DFD1FF",
  MUTED_PURPLE: "#EBE4FA",
  MUTED_PURPLE_ALT: "#9494DC",
  LIGHT_PURPLE: "#B9A1F9",
  LIGHT_PURPLE_ALT: "#AC8EF8",
  PURPLE: "#7141DC",
  DEEP_PURPLE: "#46376F",
  OPSERA_HEADER_PURPLE: "#352F54",
  BACKGROUND_PURPLE: "#F7F6FB",
  BACKGROUND_LAVENDER: "#E3E1EC",

  // Gold
  LIGHT_GOLD: "#E5C27E",
  GOLD: "#FFBE3F",
  OPSERA_GOLD: "#CF940C",
  GOLD_HIGHLIGHT: "#cF940C",

  // Orange
  ORANGE: "#FA7245",
  LIGHT_SALMON: "#FE8C83",

  //Green
  LIGHT_MINT: "#95D0D5",
  GREEN: "green",
  GREEN_ALT: "#31c486",

  //Gray
  GRAY: "#6E6C78",
  TEXT_GRAY: "#878787",
  DARK_GRAY: "#616161",
  BACKGROUND_GRAY: "#E5E5E5",
  DISABLED_BACKGROUND: "#E5E5E5",

  // Black
  BLACK: "#000000",
};

lightThemeConstants.RESOURCE_COLORS = {
  PIPELINES: lightThemeConstants.COLOR_PALETTE.BLUE,
  TASKS: lightThemeConstants.COLOR_PALETTE.BLUE_ALT,
  TOOLS: lightThemeConstants.COLOR_PALETTE.DARK_GRAY,
};

lightThemeConstants.BORDER_COLORS = {
  GRAY: "#D7D7D7",
};