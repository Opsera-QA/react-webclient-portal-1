export const mouseHelper = {};

export const MOUSE_CURSORS = {
  DEFAULT: "default",
  NOT_ALLOWED: "not-allowed",
  POINTER: "pointer",
};

mouseHelper.getMouseCursor = (
  onClickFunction,
  disabled,
) => {
  if (disabled === true) {
    return MOUSE_CURSORS.NOT_ALLOWED;
  }

  if (typeof onClickFunction === "function") {
    return MOUSE_CURSORS.POINTER;
  }

  return MOUSE_CURSORS.DEFAULT;
};

mouseHelper.getLinkMousePointer = (
  onClickFunction,
  disabled,
  activeLink,
) => {
  if (activeLink === true) {
    return MOUSE_CURSORS.DEFAULT;
  }

  return mouseHelper.getMouseCursor(
    onClickFunction,
    disabled,
  );
};