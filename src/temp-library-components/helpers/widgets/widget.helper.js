import { numberHelpers } from "components/common/helpers/number/number.helpers";

export const widgetHelper = {};
const WIDGET_SCALE = 50;

widgetHelper.getWidgetPixelSize = (
  size,
  defaultSize = 1,
) => {
  const parsedSize = numberHelpers.parseNumber(size);

  if (numberHelpers.isNumberGreaterThan(0, parsedSize) !== true) {
    const parsedDefaultSize = numberHelpers.parseNumber(defaultSize);

    if (numberHelpers.isNumberGreaterThan(0, parsedDefaultSize) === true) {
      `${parsedDefaultSize * WIDGET_SCALE}px`;
    }

    return `${WIDGET_SCALE}px`;
  }

  return  `${parsedSize * WIDGET_SCALE}px`;
};