// TODO: put metadata on node server and pull with new route
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";

const tagMetadata = {
  idProperty: "_id",
  type: "Tag",
  activeField: "active",
  detailView: function(record) {
    return `/settings/tags/${record.getData("_id")}`;
  },
  detailViewTitle: function(record) {
    return `${capitalizeFirstLetter(record?.getOriginalValue("type"))}: ${capitalizeFirstLetter(record?.getOriginalValue("value"))}`;
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
      lowercase: true,
      maxLength: 255,
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

export default tagMetadata;