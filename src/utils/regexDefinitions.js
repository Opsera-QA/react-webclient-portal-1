// TODO: Ensure this is up to date with Node
const regexDefinitions = {};

regexDefinitions.portField = {
  regex:/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
  errorFormText: "Only numbers allowed and should not be greater than 65,535"
};

regexDefinitions.generalText = {
  regex: /^[A-Za-z0-9-_.:]*$/,
  formText: "Letters, numbers, dashes, colons, underscores, and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, colons, underscores, and periods are allowed"
};

regexDefinitions.generalTextWithSpaces = {
  regex: /^[A-Za-z0-9'\-_.: ]*$/,
  formText: "Spaces, letters, numbers dashes, colons, underscores, and periods are allowed",
  errorFormText: "Only spaces, letters, numbers dashes, colons, underscores, and periods are allowed"
};

regexDefinitions.nameField = {
  regex: /^[a-zA-Z0-9-_.]*$/,
  formText: "Letters, numbers, dashes, underscores, and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, underscores, and periods are allowed",
};

regexDefinitions.generalTextWithSpacesSlash = {
  regex: /^[A-Za-z0-9'\\/\-_.: ]*$/,
  formText: "Letters, numbers, spaces, slashes, dashes, apostrophes, colons, underscores, and periods are allowed",
  errorFormText: "Only letters, numbers, spaces, slashes, dashes, apostrophes, colons, underscores, and periods are allowed",
};

regexDefinitions.expandedTextAndSymbolsWithSpaces = {
  regex: /^[A-Za-z0-9'\-,._&+*()! ]*$/,
  formText: "Spaces, letters, numbers, underscores, dashes, periods, commas, parentheses, plus symbols, asterisks, ampersands, and exclamation marks are allowed",
  errorFormText: "Only spaces, letters, numbers, underscores, dashes, periods, commas, parentheses, plus symbols, asterisks, ampersands, and exclamation marks are allowed",
};

regexDefinitions.limitedTextWithSpaces = {
  regex: /^[A-Za-z0-9-_. ]*$/,
  formText: "Letters, numbers, spaces, dashes, underscores, and periods are allowed",
  errorFormText: "Only letters, numbers, spaces, dashes, underscores, and periods are allowed",
};

regexDefinitions.limitedText = {
  regex: /^[A-Za-z0-9-_.]*$/,
  formText: "Letters, numbers, dashes, underscores, and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, underscores, and periods are allowed",
};

regexDefinitions.email = {
  regex: /^[A-Za-z0-9'\-_.@]*$/,
  formText: "Letters, numbers, dashes, apostrophes, colons, underscores, at signs (@), and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, apostrophes, colons, underscores, at signs (@), and periods are allowed",
};

regexDefinitions.alphabetic = {
  regex: /^[A-Za-z]*$/,
  formText: "Only letters are allowed",
  errorFormText: "Only letters are allowed",
};

regexDefinitions.alphanumeric = {
  regex: /^[A-Za-z0-9]*$/,
  formText: "Letters and numbers are allowed",
  errorFormText: "Only letters and numbers are allowed",
};

regexDefinitions.alphanumericPlusSpaces = {
  regex: /^[A-Za-z0-9 ]*$/,
  formText: "Letters, numbers, and spaces are allowed",
  errorFormText: "Only letters, numbers, and spaces are allowed",
};

regexDefinitions.pathField = {
  regex: /^[A-Za-z0-9\-_:./\\]*$/,
  formText: "Letters, numbers, dashes, slashes, colons, underscores, and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, slashes, colons, underscores, and periods are allowed"
};

regexDefinitions.domainNameField = {
  regex: /^[A-Za-z0-9\-.]*$/,
  formText: "Letters, numbers, dashes, and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, and periods are allowed",
};

regexDefinitions.domainField = {
  regex: /^[a-z0-9](?!.*?[^\na-z0-9-]).*?[a-z0-9]$/,
  formText: "This field must begin and end with an alphanumeric character. Alphanumeric and Dashes are allowed otherwise.",
  errorFormText: "This field must begin and end with an alphanumeric character. Alphanumeric and Dashes are allowed otherwise.",
};

regexDefinitions.mongoId = {
  regex: /^[0-9a-fA-F]{24}$/,
  formText: "This field must be an ID",
  errorFormText: "This field must be an ID",
};

regexDefinitions.generalTextWithoutSpacesPeriod = {
  regex: /^[A-Za-z0-9\-_,]*$/,
  formText: "Letters, numbers, dashes, and commas are allowed",
  errorFormText: "Only letters, numbers, dashes, and commas are allowed",
};

regexDefinitions.ecrRepoField = {
  regex: /^[a-z0-9](?!.*?[^\na-z0-9-_/]).*?[a-z0-9]$/,
  formText: "This field must start and end with a letter and can only contain lowercase letters, numbers, hyphens, underscores, and forward slashes",
  errorFormText: "This field must start and end with a letter and can only contain lowercase letters, numbers, hyphens, underscores, and forward slashes",
};

regexDefinitions.numericalField = {
  regex: /^[0-9]*$/,
  formText: "Only numbers are allowed",
  errorFormText: "Only numbers are allowed",
};

regexDefinitions.hostnameRegex = {
  regex: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
  formText: "Host names must follow the RFC 1123 standard",
  errorFormText: "Host names must follow the RFC 1123 standard",
};

regexDefinitions.genericFileName = {
  regex: /^[A-Za-z0-9-_.]*$/,
  formText: "Letters, numbers, dashes, underscores and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, underscores and periods are allowed",
};

regexDefinitions.octopusFileList = {
  regex: /^[A-Za-z0-9-_.*\n]*$/,
  formText: "Letters, numbers, dashes, underscores, asterisk, periods and new lines are allowed",
  errorFormText: "Only letters, numbers, dashes, underscores, asterisk, periods and new lines are allowed",
};

regexDefinitions.customParameterValueRegex = {
  regex: /^[a-zA-Z0-9-+|!.$@&:_; [\]\\/]*$/,
  formText: "Value can contain alphanumeric characters, spaces, and these symbols: @ ! & + - _ / \\ . $ [ ] : ; |",
  errorFormText: "Value can contain alphanumeric characters, spaces, and these symbols: @ ! & + - _ / \\ . $ [ ] : ; |",
};

regexDefinitions.customParameterNameRegex = {
  regex: /^opsera-[a-z0-9-_.]*$/,
  formText: "Name must begin with \"opsera-\" and can contain lowercase letters, numbers, dashes, and periods",
  errorFormText: "Name must begin with \"opsera-\" and can contain lowercase letters, numbers, dashes, and periods",
};

export default regexDefinitions;