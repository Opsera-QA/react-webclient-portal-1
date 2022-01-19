// TODO: Ensure this is up to date with Node
const regexDefinitions = {};

regexDefinitions.generalText = {
  regex: /^[A-Za-z0-9-_.:]*$/,
  formText: "Letters, numbers, dashes, colons, underscores, and periods are allowed",
  errorFormText: "Only letters, numbers, dashes, colons, underscores, and periods are allowed"
};

regexDefinitions.portField = {
  regex:/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
  errorFormText: "Only numbers allowed and should not be greater than 65,535"
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

// TODO: Validate
regexDefinitions.imagePathField = {
  regex: /^\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi,
  formText: "Only links with valid image file extensions allowed",
  errorFormText: "Only links with valid image file extensions allowed",
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

regexDefinitions.alphanumericPlusSpacesAndForwardSlash = {
  regex: /^[A-Za-z0-9 /]*$/,
  formText: "Letters, numbers, forward slashes, and spaces are allowed",
  errorFormText: "Only letters, numbers, forward slashes, and spaces are allowed",
};

regexDefinitions.gitBranchName = {
  regex: /^[A-Za-z0-9\-_./']*[A-Za-z0-9'\-_]$/,
  formText: "Letters, numbers, dashes, forward slashes, apostrophes, underscores, and periods are allowed. The inputted value cannot end with a slash or period",
  errorFormText: "Only letters, numbers, dashes, forward slashes, apostrophes, underscores, and periods are allowed. The inputted value cannot end with a slash or period"
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

regexDefinitions.decimalField = {
  regex: /^\d*\.?\d*$/,
  formText: "Only numbers (including decimals) are allowed",
  errorFormText: "Only numbers (including decimals) are allowed",
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
  regex: /^opsera-[a-z0-9-_]*$/,
  formText: "Name must begin with \"opsera-\" and can contain lowercase letters, numbers, and dashes",
  errorFormText: "Name must begin with \"opsera-\" and can contain lowercase letters, numbers, and dashes",
};

regexDefinitions.dockerName = {
  regex: /^[a-z0-9_.-]*$/,
  formText: "Accepts lowercase alphanumeric characters, periods, dashes, and underscores without spaces.",
  errorFormText: "Accepts lowercase alphanumeric characters, periods, dashes, and underscores without spaces.",
};

regexDefinitions.jsonFile = {
  regex: /^[a-zA-Z0-9\-_/\\]*\.json$/,
  formText: "Accepts .json file as input",
  errorFormText: "Only .json files are accepted as input. Only letters, numbers, dashes, underscores and slashes are allowed",
};

regexDefinitions.collectionName = {
  regex: /^[a-zA-Z0-9_-]*(?:\.[a-zA-Z0-9_-]+)$/,
  formText: "Accepts input in [DatabaseName].[CollectionName] format",
  errorFormText: "Input should be in [DatabaseName].[CollectionName] format. Only letters, numbers, dashes, underscores and periods are allowed",
};

regexDefinitions.azureLabels = {
  regex: /^[a-z0-9-]*$/,
  formText: "Accepts lowercase alphanumeric characters and dashes without spaces.",
  errorFormText: "The name must consist of lower case alphanumeric characters or '-', start with an alphabetic character, and end with an alphanumeric character (e.g. 'my-name', or 'abc-123')"
};

regexDefinitions.azureFunctionsLabel = {
  regex: /^[a-z0-9]*$/,
  formText: "Accepts lowercase alphanumeric characters without spaces.",
  errorFormText: "The name must consist of lowercase alphanumeric characters (e.g. 'name', or 'abc123')"
};

regexDefinitions.argumentList = {
  regex: /^[A-Za-z0-9-_.$=\n]*$/,
  formText: "Letters, numbers, dashes, underscores, equals sign, dollar sign, periods and new lines are allowed",
  errorFormText: "Only letters, numbers, dashes, underscores, equals sign, dollar sign, periods and new lines are allowed"
};

regexDefinitions.informaticaValidationRules = {
  regex: /^[A-Za-z0-9\-_?*]*$/,
  formText: "Letters, numbers, dashes, underscores, astrix and question mark are allowed",
  errorFormText: "Only Letters, numbers, dashes, underscores, astrix and question marks are allowed"
};

export default regexDefinitions;
