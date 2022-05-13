import { hasStringValue } from "components/common/helpers/string-helpers";

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
        const line = hasStringValue(lines[i]) === true ? lines[i] : "";
        beginningAddedLines++;
        arrayCopy.unshift(line);
      }

      for (let i = endPosition; i >= 0 && i < lines.length && i <= endPosition + 5; i++) {
        const line = hasStringValue(lines[i]) === true ? lines[i] : "";
        arrayCopy.push(line);
      }
    }

    return {
      array: arrayCopy,
      beginningAddedLines: beginningAddedLines,
    };
  }
};