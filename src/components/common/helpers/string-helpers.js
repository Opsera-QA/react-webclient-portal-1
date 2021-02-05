export function capitalizeFirstLetter(string, wordDelimiter, noDataString) {

  if (string && string.length > 0) {
    let capitalizedString = "";
    const words = string.split(wordDelimiter);

    for (let word of words) {
      if (capitalizedString.length > 0 && word.length > 0) {
        capitalizedString += " ";
      }

      capitalizedString += word.charAt(0).toUpperCase() + word.slice(1);
    }

    return capitalizedString;
  }

  return noDataString;
}

export function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function cutOffExcessCharacters(initialString, characterLimit, postFix = "...") {
  let parsedString = initialString;

  if (parsedString != null && typeof parsedString === "string" && parsedString.length > characterLimit) {
    parsedString = `${parsedString.substring(0, characterLimit)}${postFix}`;
  }

  return parsedString;
}