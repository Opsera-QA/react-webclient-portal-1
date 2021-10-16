import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import platformToolsMetadata from "components/inventory/platform/platformTools.metadata";
import {getTableDateColumn, getTableTextColumn} from "components/common/table/table-column-helpers";

function PlatformToolsTable({ platformApplication, isLoading }) {
  const fields = platformToolsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "port";})),
      getTableTextColumn(fields.find(field => { return field.id === "toolStatus";})),
      getTableTextColumn(fields.find(field => { return field.id === "versionNumber";})),
      getTableDateColumn(fields.find(field => { return field.id === "installationDate";})),
      getTableTextColumn(fields.find(field => { return field.id === "toolURL";})),
      getTableTextColumn(fields.find(field => { return field.id === "dnsName";})),
    ],
    []
  );

  const getNoDataMessage = () => {
    if (platformApplication != null) {
      return ("No Tools are currently configured for this application.");
    }

    return ("Select a Platform Application to view its Tools.");
  };

  return (
    <CustomTable
      columns={columns}
      data={platformApplication?.tools}
      isLoading={isLoading}
      noDataMessage={getNoDataMessage()}
    />
  );
}

PlatformToolsTable.propTypes = {
  platformApplication: PropTypes.object,
  isLoading: PropTypes.bool
};

export default PlatformToolsTable;