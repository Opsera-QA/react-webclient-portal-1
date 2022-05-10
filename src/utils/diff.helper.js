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
      changedLines: [],
    },
    secondString: {
      unchangedLineNumbers: [],
      deletedLineNumbers: [],
      insertedLineNumbers: [],
      changedLines: [],
    },
  };

  if (Array.isArray(diffs) && diffs.length !== 0) {
    const maxLinesForFile = Math.max(text1.split("\n").length, text2.split("\n").length);
    const cursor = {
      left: 1,
      right: 1
    };

    diffs.forEach((diff) => {
      const diffType = diff[0];
      const text = diff[1];

      if (hasStringValue(text) !== true) {
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
            separatedResults.secondString.changedLines(cursor.right);
          }

          // If the last character is a newline, we don't want to highlight that line
          if (lastChar === "\n") {
            linesToHighlight -= 1;
          }

          for (let i = cursor.left; i <= cursor.left + linesToHighlight; i++) {
            separatedResults.firstString.deletedLineNumbers.push(i);
            separatedResults.firstString.changedLines(i);
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
            separatedResults.firstString.changedLines(cursor.left);
          }

          // If the last character is a newline, we don't want to highlight that line
          if (lastChar === "\n") {
            linesToHighlight -= 1;
          }

          for (let i = cursor.right; i <= cursor.right + linesToHighlight; i++) {
            separatedResults.secondString.insertedLineNumbers.push(i);
            separatedResults.secondString.changedLines.push(i);
          }

          cursor.right += lineCount;
          break;
        default:
          console.error("Diff had no category");
      }
    });

    // const conflicts = diffHelper.calculateConflicts(maxLinesForFile, separatedResults);
    // separatedResults.conflictChunks = conflicts;
  }

  return separatedResults;
};

diffHelper.calculateConflicts = (maxLinesForFile, results) => {
  const conflicts = [];

  const firstStringChangedLines = results?.firstString?.changedLines;
  const secondStringChangedLines = results?.secondString?.changedLines;

  if (Array.isArray(firstStringChangedLines) && Array.isArray(secondStringChangedLines)) {
    if (maxLinesForFile > 0) {
      for (let i = 1; i <= maxLinesForFile; i++) {
        const isLineChanged = firstStringChangedLines.includes(i) || secondStringChangedLines.includes(i);

        if (isLineChanged !== true) {
          console.log("line: " + i + " is not changed");
          continue;
        }

        const closeConflict = conflicts.findIndex((conflict) => conflict.lineNumbers.includes(i - 1));

        if (closeConflict === -1) {
          const newConflict = {
            lineNumbers: [i],
          };

          conflicts.push(newConflict);
          continue;
        }

        const conflictCopy = conflicts[closeConflict];

        if (conflictCopy.lineNumbers.includes(i) === false) {
          conflictCopy.lineNumbers.push(i);
          conflicts[closeConflict] = conflictCopy;
        }
      }
    }
  }


  return conflicts;
};
