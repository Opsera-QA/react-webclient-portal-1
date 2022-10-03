import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getTableTextColumn,
  getTableDateTimeColumn,
} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import { getField } from "components/common/metadata/metadata-helpers";
import unassignedRulesItemsMetadata from "./unassignedRulesItems.metadata";

function UnassignedRulesItemsTable({
  items,
  isLoading,
  paginationModel,
  setPaginationModel,
  loadDataFunction,
}) {
  const fields = unassignedRulesItemsMetadata.fields;
  const history = useHistory();

  const onRowSelect = (grid, row) => {
    if (row?.type === "pipeline" && row?.id) {
      history.push(`/workflow/details/${row.id}/summary`);
    }

    if (row?.type === "task" && row?.id) {
      history.push(`/task/details/${row.id}`);
    }

    if (row?.type === "tool" && row?.id) {
      history.push(`/inventory/tools/details/${row.id}`);
    }

    if (row?.type === "script" && row?.id) {
      history.push(`/inventory/scripts`);
    }

    if (row?.type === "parameter" && row?.id) {
      history.push(`/inventory/parameters`);
    }
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
      getTableDateTimeColumn(
        getField(fields, "createdAt"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
    ],
    [],
  );

  return (
    <VanityTable
      columns={columns}
      onRowSelect={onRowSelect}
      loadData={loadDataFunction}
      data={items}
      isLoading={isLoading}
      setPaginationModel={setPaginationModel}
      paginationModel={paginationModel}
    />
  );
}

UnassignedRulesItemsTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
};

export default UnassignedRulesItemsTable;
