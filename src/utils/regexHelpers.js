const regexHelpers = {};

regexHelpers.regexTypes = {
  // TODO: #1 will be standard across most of the text fields, so once it's wired up it will not need to be included in metadata
  generalText: /^[A-Za-z0-9-_.:]*$/, // Letters, numbers, dashes, colons, underscores, and periods allowed
};

export default regexHelpers;