import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import platformToolsMetadata from "components/inventory/platform/platformTools.metadata";
import {getTableDateColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import { faTools} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function PlatformToolsTable({ platformApplication, applicationTools, isLoading }) {
  const fields = platformToolsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "port")),
      getTableTextColumn(getField(fields, "toolStatus")),
      getTableTextColumn(getField(fields, "versionNumber")),
      getTableDateColumn(getField(fields, "installationDate")),
      getTableTextColumn(getField(fields, "toolURL")),
      getTableTextColumn(getField(fields, "dnsName")),
    ],
    []
  );

  const getNoDataMessage = () => {
    if (isMongoDbId(platformApplication) === true) {
      return ("No Tools are currently configured for this application.");
    }

    return ("Select a Platform Application to view its Tools.");
  };

  const getPlatformToolsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={applicationTools}
        isLoading={isLoading}
        noDataMessage={getNoDataMessage()}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      showBorder={false}
      body={getPlatformToolsTable()}
      metadata={platformToolsMetadata}
      titleIcon={faTools}
      title={"Tools"}
    />
  );
}

PlatformToolsTable.propTypes = {
  platformApplication: PropTypes.string,
  applicationTools: PropTypes.array,
  isLoading: PropTypes.bool
};

export default PlatformToolsTable;