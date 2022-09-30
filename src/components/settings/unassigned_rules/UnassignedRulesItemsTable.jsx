import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { faCalendarAlt } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";
import { getField } from "components/common/metadata/metadata-helpers";
import unassignedRulesItemsMetadata from "./unassignedRulesItems.metadata";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UnassignedRulesItemsVerticalTabContainer from "./UnassignedRulesItemsVerticalTabContainer";

function UnassignedRulesItemsTable({
  items,
  isLoading,
  paginationModel,
  setPaginationModel,
  loadDataFunction,
  isMounted,
  itemFilterModel,
}) {
  const fields = unassignedRulesItemsMetadata.fields;

  const onRowSelect = (grid, row) => {
    console.log(row);
  };

  const getTooltipTemplate = () => {
    return "Click row to view/edit details";
  };
  const columns = useMemo(
    () => [
      getTableTextColumn(
        getField(fields, "id"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
      getTableTextColumn(
        getField(fields, "type"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
      getTableTextColumn(
        getField(fields, "name"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
      getTableTextColumn(
        getField(fields, "owner"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
      getTableTextColumn(
        getField(fields, "createdAt"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
    ],
    [],
  );

  const getUnassignedRulesItemsTable = () => {
    return (
      <Row className={"mx-0"}>
        <Col
          sm={2}
          className={"px-0 makeup-tree-container"}
        >
          <UnassignedRulesItemsVerticalTabContainer
            isLoading={isLoading}
            loadData={loadDataFunction}
            itemFilterModel={itemFilterModel}
          />
        </Col>
        <Col
          sm={10}
          className={"px-0"}
        >
          <VanityTable
            columns={columns}
            onRowSelect={onRowSelect}
            loadData={loadDataFunction}
            data={items}
            isLoading={isLoading}
            setPaginationModel={setPaginationModel}
            paginationModel={paginationModel}
          />
        </Col>
      </Row>
    );
  };

  if (isMounted?.current === false) {
    return null;
  }

  return (
    <FilterContainer
      loadData={loadDataFunction}
      isLoading={isLoading}
      titleIcon={faCalendarAlt}
      type={"Unassinged Rules Items"}
      title={"Unassinged Rules Items"}
      metadata={unassignedRulesItemsMetadata}
      body={getUnassignedRulesItemsTable()}
      className={"mt-3 mx-3"}
    />
  );
}

UnassignedRulesItemsTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  isMounted: PropTypes.object,
  s3ToolId: PropTypes.string,
  taskFilterModel: PropTypes.object,
  setTaskFilterModel: PropTypes.func,
  itemFilterModel: PropTypes.object,
};

export default UnassignedRulesItemsTable;
