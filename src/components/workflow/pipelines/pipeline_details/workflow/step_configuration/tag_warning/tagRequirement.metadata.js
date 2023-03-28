import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

export const tagRequirementMetadata = {
  type: "Step Definition Tag Requirement Metadata",
  fields: [
    {
      label: "Tag",
      id: "tag",
      isRequired: true,
      inputMaskRegex: /^[A-Za-z0-9][A-Za-z0-9-.]*$/,
      lowercase: true,
      maxLength: 255,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
  ],
  newObjectFields: {
    tag: "",
  }
};
