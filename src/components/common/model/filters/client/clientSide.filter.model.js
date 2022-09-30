import FilterModelBase from "core/data_model/filterModel.base";
import { capitalizeFirstLetter, hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";

const clientSideSearchFilterMetadata = {
  idProperty: "_id",
  type: "Tool",
  fields: [
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Current Page",
      id: "currentPage",
    },
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Total Count",
      id: "totalCount",
    },
  ],
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    totalCount: 0,
    search: "",
  },
};

export default class ClientSideFilterModel extends FilterModelBase {
  constructor() {
    super(clientSideSearchFilterMetadata);
  }

  canClientSideSearch = () => {
    return true;
  };

  showPagination = () => {
    return true;
  };
}


