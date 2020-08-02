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