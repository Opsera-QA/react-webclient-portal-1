import FilterModelBase from "core/data_model/filterModel.base";

const baseMetadata = {
  fields: [
    {
      label: "Current Page",
      id: "currentPage",
    },
    {
      label: "Page Size",
      id: "pageSize",
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
  },
};


export class GenericPaginationModel extends FilterModelBase{
  constructor() {
    super(baseMetadata);
  }

  showPagination = () => {
    return true;
  };
}

export default GenericPaginationModel;


