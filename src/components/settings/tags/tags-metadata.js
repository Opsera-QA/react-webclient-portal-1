// TODO: put metadata on node server and pull down that way?
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const tagEditorMetadata = {
  idProperty: "_id",
  type: "Tag",
  activeField: "active",
  detailView: function(record) {
    return `/settings/tags/${record.getData("_id")}`;
  },
  detailViewTitle: function(record) {
    return `Tag Details [${capitalizeFirstLetter(record?.getData("type"))}: ${capitalizeFirstLetter(record?.getData("value"))}]`;
  },
  fields: [
    {
      label: "Account",
      id: "account"
    },
    {
      label: "ID",
      id: "_id"
    },
    {
      label: "Created",
      id: "createdAt"
    },
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Value",
      id: "value",
      isRequired: true,
      inputMaskRegex: /^[A-Za-z0-9][A-Za-z0-9-.]*$/,
      lowercase: true
    },
    {
      label: "Configuration Properties",
      id: "configuration"
    },
    {
      label: "Status",
      id: "active",
    },
  ],
  newObjectFields: {
    key: "",
    value: "",
    configuration: {},
    active: true,
  }
};

export default tagEditorMetadata;