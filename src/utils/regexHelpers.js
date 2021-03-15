const regexHelpers = {};

// TODO: Make corresponding form texts that automatically apply based on these
regexHelpers.regexTypes = {
  // TODO: #1 will be standard across most of the text fields, so once it's wired up it will not need to be included in metadata
  // Letters, numbers, dashes, colons, underscores, and periods allowed
  generalText: /^[A-Za-z0-9-_.:]*$/,

  // Letters, numbers, spaces, dashes, apostrophes, colons, underscores, and periods allowed
  generalTextWithSpaces: /^[A-Za-z0-9'\-_.: ]*$/,

  // spaces, upper and lower case letters, numbers, dashes, periods, comma
  nameField: /^[A-Za-z0-9\-_., ]*$/,

  // spaces, upper and lower case letters, numbers, underscore, dash, period, comma, parentheses, plus symbol, asterisk, ampersand and exclamation mark
  expandedTextAndSymbolsWithSpaces: /^[A-Za-z0-9'\-._&+*()! ]*$/,

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

  // Letters, numbers, dashes, slashes, underscores, and periods allowed - char limit 0 to 100
  pathField: /^[A-Za-z0-9\-_.\/]{0,100}$/,
};

export default regexHelpers;