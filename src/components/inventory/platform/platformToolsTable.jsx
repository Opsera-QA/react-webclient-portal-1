import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import platformMetadata from "components/inventory/platform/platform-metadata";
import {getTableDateColumn, getTableTextColumn} from "components/common/table/table-column-helpers";

function PlatformToolsTable({ data, isLoading }) {
  const fields = platformMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "port"})),
      getTableTextColumn(fields.find(field => { return field.id === "toolStatus"})),
      getTableTextColumn(fields.find(field => { return field.id === "versionNumber"})),
      getTableDateColumn(fields.find(field => { return field.id === "installationDate"})),
      getTableTextColumn(fields.find(field => { return field.id === "toolURL"})),
      getTableTextColumn(fields.find(field => { return field.id === "dnsName"})),
    ],
    []
  );

  return (
    <CustomTable columns={columns} data={data} isLoading={isLoading} />
  );
}

PlatformToolsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default PlatformToolsTable;