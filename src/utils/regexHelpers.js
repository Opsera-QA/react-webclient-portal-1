const regexHelpers = {};

// TODO: Make corresponding form texts that automatically apply based on these
regexHelpers.regexTypes = {
  // TODO: #1 will be standard across most of the text fields, so once it's wired up it will not need to be included in metadata
  // Letters, numbers, dashes, colons, underscores, and periods allowed
  generalText: /^[A-Za-z0-9-_.:]*$/,

  // Letters, numbers, spaces, dashes, apostrophes, colons, underscores, and periods allowed
  generalTextWithSpaces: /^[A-Za-z0-9'\-_.: ]*$/,

  // Letters, numbers, spaces, slash, dashes, apostrophes, colons, underscores, and periods allowed
  generalTextWithSpacesSlash: /^[A-Za-z0-9'\/\-_.: ]*$/,

  // spaces, upper and lower case letters, numbers, dashes, periods, comma
  nameField: /^[A-Za-z0-9\-_., ]*$/,

  // spaces, upper and lower case letters, numbers, underscore, dash, period, comma, parentheses, plus symbol, asterisk, ampersand and exclamation mark
  expandedTextAndSymbolsWithSpaces: /^[A-Za-z0-9'\-,._&+*()! ]*$/,

  // Letters, numbers, spaces, dashes, underscores, and periods allowed
  limitedTextWithSpaces: /^[A-Za-z0-9-_. ]*$/,

  // Letters, numbers, dashes, underscores, and periods allowed
  limitedText: /^[A-Za-z0-9-_.]*$/,

  // Letters, numbers, dashes, apostrophes, colons, underscores, @, and periods allowed
  email: /^[A-Za-z0-9'\-_.@]*$/,

  // Letters, numbers
  alphanumeric: /^[A-Za-z0-9]*$/,

  // Letters, numbers and spaces allowed
  alphanumericPlusSpaces: /^[A-Za-z0-9 ]*$/,

  // Letters, numbers, dashes, slashes, colons, underscores, and periods allowed
  pathField: /^[A-Za-z0-9\-_:./\\]*$/,

  // Letters, numbers, dashes, and periods allowed
  domainNameField: /^[A-Za-z0-9\-.]*$/,

  // Must begin and end with an alphanumeric character. Alphanumeric and Dashes allowed otherwise
  domainField: /^[a-z0-9](?!.*?[^\na-z0-9-]).*?[a-z0-9]$/,

  //Mongo ID
  mongoId: /^[0-9a-fA-F]{24}$/,
  
  // upper and lower case letters, numbers, dashes, comma
  generalTextWithoutSpacesPeriod: /^[A-Za-z0-9\-_,]*$/,

  // only lower case letters
  loweCaseLetters: /^[a-z]*$/,

  // must start and end with a letter and can only contain lowercase letters, numbers, hyphens, underscores, and forward slashes
  ecrRepoField: /^[a-z0-9](?!.*?[^\na-z0-9-_/]).*?[a-z0-9]$/,

  //only numbers
  numericalField : /^[0-9]*$/,

  // hostnameRegex is valid as per RFC 1123
  hostnameRegex: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,

  // Letters, numbers, dashes, underscores and periods allowed
  fileName: /^[A-Za-z0-9-_.]*$/,

  // Letters, numbers, dashes, underscores, commas, spaces and periods allowed
  fileList: /^[A-Za-z0-9-_., ]*$/,
};

export default regexHelpers;