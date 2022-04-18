export const SCRIPT_TYPES = {
  INLINE: "inline",
  PACKAGE: "package",
  SCRIPT: "script"
};

export const SCRIPT_TYPE_LABELS = {
  INLINE: "Inline",
  PACKAGE: "Package",
  SCRIPT: "Script"
};

export const SCRIPT_TYPE_SELECT_OPTIONS = [
  {
    value: SCRIPT_TYPES.INLINE,
    text: SCRIPT_TYPE_LABELS.INLINE
  },
  {
    value: SCRIPT_TYPES.PACKAGE,
    text: SCRIPT_TYPE_LABELS.PACKAGE
  },
  {
    value: SCRIPT_TYPES.SCRIPT,
    text: SCRIPT_TYPE_LABELS.SCRIPT
  },
];

export const getScriptTypeLabel = (scriptType) => {
  switch (scriptType) {
    case SCRIPT_TYPES.INLINE:
      return SCRIPT_TYPE_LABELS.INLINE;
    case SCRIPT_TYPES.PACKAGE:
      return SCRIPT_TYPE_LABELS.PACKAGE;
    case SCRIPT_TYPES.SCRIPT:
      return SCRIPT_TYPE_LABELS.SCRIPT;
    default:
      return scriptType;
  }
};