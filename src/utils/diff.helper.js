import { diff_match_patch } from "diff-match-patch";
import { hasStringValue } from "components/common/helpers/string-helpers";

const DIFF_MATCH_LINE_CATEGORIES = {
  NO_CHANGES: 0,
  DELETED_LINE: -1,
  INSERTED_LINE: 1
};

export const diffHelper = {};

diffHelper.getDiffFromStrings = (text1, text2) => {
  if (hasStringValue(text1, false) !== true || hasStringValue(text2, false) !== true) {
    return [];
  }

  const dmp = new diff_match_patch();
  const a = dmp.diff_linesToChars_(text1, text2);
  const lineText1 = a.chars1;
  const lineText2 = a.chars2;
  const lineArray = a.lineArray;
  const diffs = dmp.diff_main(lineText1, lineText2, false);
  dmp.diff_charsToLines_(diffs, lineArray);
  dmp.diff_cleanupSemantic(diffs);
  return diffs;
};

diffHelper.getSeparatedDiffLineNumbers = (text1, text2) => {
  const diffs = diffHelper.getDiffFromStrings(text1, text2);

  const separatedResults = {
    firstString: {
      unchangedLineNumbers: [],
      deletedLineNumbers: [],
      insertedLineNumbers: [],
    },
    secondString: {
      unchangedLineNumbers: [],
      deletedLineNumbers: [],
      insertedLineNumbers: [],
    },
  };

  if (Array.isArray(diffs) && diffs.length !== 0) {
    // const diffedLines = {
    //   left: [],
    //   right: [],
    // };

    const cursor = {
      left: 1,
      right: 1
    };

    diffs.forEach((diff) => {
      const diffType = diff[0];
      const text = diff[1];

      if (hasStringValue(text, false) !== true) {
        return;
      }

      let lineCount = text.split("\n").length - 1;
      const firstChar = text[0];
      const lastChar = text[text.length - 1];
      let linesToHighlight = 0;


      switch (diffType) {
        case DIFF_MATCH_LINE_CATEGORIES.NO_CHANGES:
          for (let i = cursor.left; i < cursor.left + lineCount; i++) {
            separatedResults.firstString.unchangedLineNumbers.push(i);
          }

          for (let i = cursor.right; i < cursor.right + lineCount; i++) {
            separatedResults.secondString.unchangedLineNumbers.push(i);
          }

          cursor.left += lineCount;
          cursor.right += lineCount;

          break;
        case DIFF_MATCH_LINE_CATEGORIES.DELETED_LINE:
          // If the deletion starts with a newline, push the cursor down to that line
          if (firstChar === "\n") {
            cursor.left++;
            lineCount--;
          }

          linesToHighlight = lineCount;

          // If the deletion does not include a newline, highlight the same line on the right
          if (linesToHighlight === 0) {
            separatedResults.secondString.deletedLineNumbers.push(cursor.right);
          }

          // If the last character is a newline, we don't want to highlight that line
          if (lastChar === "\n") {
            linesToHighlight -= 1;
          }

          for (let i = cursor.left; i <= cursor.left + linesToHighlight; i++) {
            separatedResults.firstString.deletedLineNumbers.push(i);
          }

          cursor.left += lineCount;
          break;
        case DIFF_MATCH_LINE_CATEGORIES.INSERTED_LINE:
          // If the insertion starts with a newline, push the cursor down to that line
          if (firstChar === "\n") {
            cursor.right++;
            lineCount--;
          }

          linesToHighlight = lineCount;

          // If the insertion does not include a newline, highlight the same line on the left
          if (linesToHighlight === 0) {
            separatedResults.firstString.insertedLineNumbers.push(cursor.left);
          }

          // If the last character is a newline, we don't want to highlight that line
          if (lastChar === "\n") {
            linesToHighlight -= 1;
          }

          for (let i = cursor.right; i <= cursor.right + linesToHighlight; i++) {
            separatedResults.secondString.insertedLineNumbers.push(i);
          }

          cursor.right += lineCount;
          break;
        default:
          console.error("Diff had no category");
      }
    });
  }

  return separatedResults;
};
