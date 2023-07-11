import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { getTableTextColumn, getTableDateTimeColumn, getFormattedLabelWithFunctionColumnDefinition } from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import { getField } from "components/common/metadata/metadata-helpers";
import { unsecureItemsReportMetadata } from "components/settings/unsecured_items/unsecuredItemReport.metadata";
import opseraResourceTypeConstants from "@opsera/definitions/constants/resources/opseraResourceType.constants";

function UnsecuredItemReportTable({
  items,
  isLoading,
  paginationModel,
  setPaginationModel,
  loadDataFunction,
  tableHeight,
}) {
  const fields = unsecureItemsReportMetadata.fields;
  const history = useHistory();

  const onRowSelect = (grid, row) => {
    if (row?.object_type === "pipeline" && row?._id) {
      history.push(`/workflow/details/${row._id}/summary`);
    }

    if (row?.object_type === "task" && row?._id) {
      history.push(`/task/details/${row._id}`);
    }

    if (row?.object_type === "tool" && row?._id) {
      history.push(`/inventory/tools/details/${row._id}`);
    }

    if (row?.object_type === "script" && row?._id) {
      history.push(`/inventory/scripts`);
    }

    if (row?.object_type === "parameter" && row?._id) {
      history.push(`/inventory/parameters`);
    }
  };

  const getTooltipTemplate = () => {
    return "Click row to view/edit details";
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(
        getField(fields, "name"),
        "no-wrap-inline",
        undefined,
        undefined,
        getTooltipTemplate,
      ),
      getFormattedLabelWithFunctionColumnDefinition(
        getField(fields, "object_type"),
        opseraResourceTypeConstants.getResourceTypeLabel,
        undefined,
        getTooltipTemplate,
      ),
      getTableTextColumn(
        getField(fields, "owner_email"),
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
      tableHeight={tableHeight}
    />
  );
}

UnsecuredItemReportTable.propTypes = {
  items: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  tableHeight: PropTypes.any,
};

export default UnsecuredItemReportTable;
