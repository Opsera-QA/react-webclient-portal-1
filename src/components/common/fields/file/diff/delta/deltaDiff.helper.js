import { hasStringValue, hasStringValueWithoutTrim } from "components/common/helpers/string-helpers";
import { commitDiffConstants } from "components/common/fields/file/diff/commitDiff.constants";

export const deltaDiffHelper = {};

deltaDiffHelper.addDeltaContextLines = (position, originalArray, totalLineString, endPosition) => {
  if (Array.isArray(originalArray)) {
    const arrayCopy = [...originalArray];

    const lines =
      hasStringValue(totalLineString, false)
        ? totalLineString.split("\n")
        : undefined;

    let beginningAddedLines = 0;
    if (Array.isArray(lines) && position >= 1) {
      for (let i = position - 1; i >= 0 && i >= position - 5 && i < lines.length; i--) {
        const line = hasStringValue(lines[i], false) === true ? lines[i] : "";
        beginningAddedLines++;
        arrayCopy.unshift(line);
      }

      for (let i = endPosition; i >= 0 && i < lines.length && i <= endPosition + 5; i++) {
        const line = hasStringValue(lines[i], false) === true ? lines[i] : "";
        arrayCopy.push(line);
      }
    }

    return {
      array: arrayCopy,
      beginningAddedLines: beginningAddedLines,
    };
  }
};

deltaDiffHelper.getDeltaContextLines = (position, totalLineString, endPosition) => {
  const topContextLines = [];
  const bottomContextLines = [];

  if (hasStringValue(totalLineString) === true) {
    const lines =
      hasStringValue(totalLineString, false)
        ? totalLineString.split("\n")
        : undefined;

    if (Array.isArray(lines) && position >= 1) {
      for (let i = position - 1; i >= 0 && i >= position - 5 && i < lines.length; i--) {
        const line = hasStringValue(lines[i], false) === true ? lines[i] : "";
        topContextLines.unshift(line);
      }

      for (let i = endPosition; i >= 0 && i < lines.length && i <= endPosition + 5; i++) {
        const line = hasStringValue(lines[i], false) === true ? lines[i] : "";
        bottomContextLines.push(line);
      }
    }
  }

  return {
    topContextLines: topContextLines,
    bottomContextLines: bottomContextLines,
  };
};

deltaDiffHelper.getLineNumberStyling = (backgroundColor) => {
  const style = {
    display: "block",
    fontSize: "12px",
    paddingLeft: "5px",
    paddingRight: "5px",
  };

  if (backgroundColor) {
    style.backgroundColor = backgroundColor;
  }

  return { style };
};

deltaDiffHelper.getAddedLinesStyling = () => {
  return deltaDiffHelper.getLineNumberStyling(commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.ADDED);
};

deltaDiffHelper.getRemovedLinesStyling = () => {
  return deltaDiffHelper.getLineNumberStyling(commitDiffConstants.COMMIT_CHANGE_TYPE_COLOR_STRINGS.REMOVED);
};