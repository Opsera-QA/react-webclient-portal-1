import React from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function TreeAndTableBase(
  {
    data,
    isLoading,
    noDataMessage,
    tableComponent,
    treeComponent,
    loadData,
    paginationModel,
    setPaginationModel,
    tableHeight,
    treeColumnSize,
  }) {
  const getTabColumnSize = () => {
    if (typeof treeColumnSize === "number" && treeColumnSize >= 1 && treeColumnSize <= 11) {
      return treeColumnSize;
    }

    return 2;
  };

  const getViewColumnSize = () => {
    if (typeof treeColumnSize === "number" && treeColumnSize >= 1 && treeColumnSize <= 11) {
      return 12 - treeColumnSize;
    }

    return 10;
  };

  const getTreeComponent = () => {
    if (treeComponent != null) {
      return (treeComponent);
    }
  };

  const getTableBody = () => {
    return (
      <PaginationContainer
        loadData={loadData}
        setFilterDto={setPaginationModel}
        filterDto={paginationModel}
        isLoading={isLoading}
        scrollOnLoad={false}
      >
        <TableBodyLoadingWrapper
          isLoading={isLoading}
          data={data}
          noDataMessage={noDataMessage}
          tableHeight={tableHeight}
          tableComponent={tableComponent}
        />
      </PaginationContainer>
    );
  };

  // return (
  //   <Row className={"mx-0"}>
  //     <Col sm={getTabColumnSize()} className={"px-0"}>
  //       {getTreeComponent()}
  //     </Col>
  //     <Col sm={getViewColumnSize()} className={"px-0"}>
  //       <div>
  //         {getTableBody()}
  //       </div>
  //     </Col>
  //   </Row>
  // );

  return (

    <div className={"d-flex w-100"}>
      {getTreeComponent()}
      {getTableBody()}
    </div>
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
  setPaginationModel: PropTypes.func,
  tableHeight: PropTypes.string,
  treeColumnSize: PropTypes.number,
};

export default TreeAndTableBase;