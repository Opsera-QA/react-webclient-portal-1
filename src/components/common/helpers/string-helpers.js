export function capitalizeFirstLetter(string, wordDelimiter = " ", noDataString = "") {
  if (hasStringValue(string) === true) {
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

export function hasStringValue(string, requireText = true, trimString = true) {
  if (typeof string !== "string") {
    return false;
  }

  if (requireText === false) {
    return true;
  }

  if (trimString === true) {
    return string.trim() !== "";
  }

  return string !== "";
}

export function stringIncludesValue(string, searchTerm) {
  return hasStringValue(string) && hasStringValue(searchTerm) && string.toLowerCase().includes(searchTerm.toLowerCase());
}

export function truncateString(string, maxLength, addEllipsis = true){
  if (hasStringValue(string) !== true) {
    return "";
  }

  if (typeof maxLength !== "number" || maxLength < 1) {
    return string;
  }

  if (string.length <= maxLength) {
    return string;
  }

  const truncatedString = string.slice(0, maxLength);

  if (addEllipsis !== false) {
    return (`${truncatedString}...`);
  }

  return truncatedString;
}

export function removeSpacesFromString(string){
  if (hasStringValue(string) !== true) {
    return "";
  }

  return string.replace(/\s/g, '');
}

export function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export function getSingularOrPluralString(count, singularText, pluralText) {
  return count === 1 ? singularText : pluralText;
}

export function cutOffExcessCharacters(initialString, characterLimit, postFix = "...") {
  let parsedString = initialString;

  if (parsedString != null && typeof parsedString === "string" && parsedString.length > characterLimit) {
    parsedString = `${parsedString.substring(0, characterLimit)}${postFix}`;
  }

  return parsedString;
}

export function camalize (str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function csvStringToObj  (csvString) {
  const dataStringLines = csvString.split(/\r\n|\n/);
  const headersRaw = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
  let headers = [];
  headersRaw.map(header => {
    headers.push(camalize(header));
  });
  // console.log(headers);
  const list = [];
  for (let i = 1; i < dataStringLines.length; i++) {
    const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    if (headers && row.length == headers.length) {
      // console.log(row)
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        let d = row[j];
        if (d.length > 0) {
          if (d[0] == '"')
            d = d.substring(1, d.length - 1);
          if (d[d.length - 1] == '"')
            d = d.substring(d.length - 2, 1);
        }
        if (headers[j]) {
          obj[headers[j]] = d;
        }
      }

      // remove blank rows
      if (Object.values(obj).filter(x => x).length > 0) {
        list.push(obj);
      }
    }
  }
  // console.log(list);
  return list;
}