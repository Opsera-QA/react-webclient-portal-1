import { faCheckCircle, faExclamationCircle } from "@fortawesome/pro-light-svg-icons";

export const buttonLabelHelper = {};

buttonLabelHelper.BUTTON_STATES = {
  READY: "ready",
  BUSY: "busy",
  SUCCESS: "success",
  ERROR: "error",
};

buttonLabelHelper.BUTTON_VARIANTS = {
  PRIMARY: "primary",
};

buttonLabelHelper.getLabelForStatus = (
  buttonState,
  normalText,
  busyText,
  successText,
  errorText,
) => {
  switch (buttonState) {
    case buttonLabelHelper.BUTTON_STATES.READY:
      return normalText;
    case buttonLabelHelper.BUTTON_STATES.BUSY:
      return busyText;
    case buttonLabelHelper.BUTTON_STATES.SUCCESS:
      return successText;
    case buttonLabelHelper.BUTTON_STATES.ERROR:
      return errorText;
    default:
      throw "Invalid button state given";
  }
};

buttonLabelHelper.getVariantForState = (
  normalVariant = "primary",
  buttonState,
) => {
  switch (buttonState) {
    case buttonLabelHelper.BUTTON_STATES.READY:
    case buttonLabelHelper.BUTTON_STATES.BUSY:
      return normalVariant;
    case buttonLabelHelper.BUTTON_STATES.SUCCESS:
      return "success";
    case buttonLabelHelper.BUTTON_STATES.ERROR:
      return "danger";
    default:
      throw "Invalid button state given";
  }
};

buttonLabelHelper.getIconForState = (
  icon,
  buttonState,
) => {
  switch (buttonState) {
    case buttonLabelHelper.BUTTON_STATES.READY:
    case buttonLabelHelper.BUTTON_STATES.BUSY:
      return icon;
    case buttonLabelHelper.BUTTON_STATES.SUCCESS:
      return faCheckCircle;
    case buttonLabelHelper.BUTTON_STATES.ERROR:
      return faExclamationCircle;
    default:
      throw "Invalid button state given";
  }
};