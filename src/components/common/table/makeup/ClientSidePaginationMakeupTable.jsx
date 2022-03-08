import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import VanityPaginationContainer from "components/common/pagination/v2/VanityPaginationContainer";
import MakeupTableBase from "components/common/table/makeup/MakeupTableBase";
import GenericPaginationModel from "core/data_model/genericPaginationModel";
import {paginateData} from "components/common/helpers/pagination.helpers";

function ClientSidePaginationMakeupTable(
  {
    className,
    columns,
    data,
    noDataMessage,
    onRowSelect,
    rowStyling,
    isLoading,
    initialState,
  }) {
  const [paginationModel, setPaginationModel] = useState(undefined);

  useEffect(() => {
    const newPaginationModel = new GenericPaginationModel();

    if (Array.isArray(data)) {
      newPaginationModel.setTotalCount(data.length);
    }

    loadData(newPaginationModel);

  }, [data]);

  const loadData = (newPaginationModel) => {
    setPaginationModel({...newPaginationModel});
  };

  const getPaginatedData = () => {
    const currentPage = paginationModel?.getData("currentPage");
    const pageSize = paginationModel?.getPageSize("pageSize");
    return paginateData(data, currentPage, pageSize);
  };

  if (paginationModel == null) {
    return null;
  }

  return (
    <VanityPaginationContainer
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={paginationModel}
    >
      <MakeupTableBase
        data={getPaginatedData()}
        isLoading={isLoading}
        columns={columns}
        rowStyling={rowStyling}
        onRowSelect={onRowSelect}
        noDataMessage={noDataMessage}
        className={className}
        initialState={initialState}
      />
    </VanityPaginationContainer>
  );
}

ClientSidePaginationMakeupTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  onRowSelect: PropTypes.func,
  rowStyling: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  initialState: PropTypes.object,
};

export default ClientSidePaginationMakeupTable;