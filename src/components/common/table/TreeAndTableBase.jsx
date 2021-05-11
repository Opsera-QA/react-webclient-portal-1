import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";

function TreeAndTableBase({ data, isLoading, noDataMessage, tableComponent, treeComponent, loadData, paginationModel, setPaginationModel }) {
  const getTableBody = () => {
    return (
      <PaginationContainer
        loadData={loadData}
        setFilterDto={setPaginationModel}
        filterDto={paginationModel}
        isLoading={isLoading}
        scrollOnLoad={false}
      >
        <div className={"d-flex w-100"}>
          {treeComponent}
          {tableComponent}
        </div>
      </PaginationContainer>
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading}
      data={data}
      noDataMessage={noDataMessage}
      tableComponent={getTableBody()}
    />
  );
}

TreeAndTableBase.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  noDataMessage: PropTypes.string,
  tableComponent: PropTypes.object,
  treeComponent: PropTypes.object,
  loadData: PropTypes.func,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func
};

export default TreeAndTableBase;