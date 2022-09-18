import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const heightHelper = {};
const TITLE_BAR_HEIGHT = 47;

heightHelper.subtractTitleBarHeightForCssHeight = (
  heightString,
) => {
  const parsedSize = DataParsingHelper.parseString(heightString);

  if (parsedSize) {
    return `calc(${parsedSize} - ${TITLE_BAR_HEIGHT}px`;
  }
};