import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import azureApplicationsMetadata from "../azure-application-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import AzureApplicationOverlay
  from "components/inventory/tools/tool_details/tool_jobs/azure/applications/AzureApplicationOverlay";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function AzureApplicationsTable({ toolData, azureApplications, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = azureApplicationsMetadata.fields;

  const createAzureApplication = () => {
    toastContext.showOverlayPanel(<AzureApplicationOverlay toolData={toolData} loadData={loadData} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "credentialName")),
      getTableTextColumn(getField(fields, "resource")),
      getTableBooleanIconColumn(getField(fields, "active"))
    ],
    []
  );

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={azureApplications}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Azure Application Credentials"}
      type={"Azure Application Credential"}
      titleIcon={faBrowser}
      addRecordFunction={toolData?.data?.configuration ? createAzureApplication : undefined}
      body={getTable()}
      showBorder={false}
    />
  );
}

AzureApplicationsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  azureApplications: PropTypes.array
};

export default AzureApplicationsTable;
