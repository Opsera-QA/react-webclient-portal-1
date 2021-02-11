const regexHelpers = {};

regexHelpers.regexTypes = {
  // TODO: #1 will be standard across most of the text fields, so once it's wired up it will not need to be included in metadata
  generalText: /^[A-Za-z0-9-_.:]*$/, // Letters, numbers, dashes, colons, underscores, and periods allowed
  generalTextWithSpaces: /^[A-Za-z0-9'-_.: ]*$/, // Letters, numbers, spaces, dashes, apostrophes, colons, underscores, and periods allowed
  email: /^[A-Za-z0-9'-_.@]*$/, // Letters, numbers, dashes, apostrophes, colons, underscores, @, and periods allowed
  alphanumeric: /^[A-Za-z0-9]*$/, // Letters, numbers
  alphanumericPlusSpaces: /^[A-Za-z0-9 ]*$/, // Letters, numbers and spaces allowed
};

export default regexHelpers;