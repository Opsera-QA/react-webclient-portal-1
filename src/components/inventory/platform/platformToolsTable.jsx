import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {getTableDateColumn, getTableTextColumn} from "../../common/table/table-column-helpers";
import platformMetadata from "./platform-metadata";

function PlatformToolsTable({ data, isLoading }) {
  const fields = platformMetadata.fields;

  // TODO: Pull from metadata
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
    <>
      <div className="table-content-block">
      <CustomTable 
        columns={columns} 
        data={data}
        tableStyleName="custom-table-2"
        isLoading={isLoading}
      />
      </div>
    </>
  );
}

PlatformToolsTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool
};

export default PlatformToolsTable;