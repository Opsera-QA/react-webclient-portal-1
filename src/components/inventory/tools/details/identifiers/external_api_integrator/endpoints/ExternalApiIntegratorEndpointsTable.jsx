import React, {useMemo, useContext, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { DialogToastContext } from "contexts/DialogToastContext";
import { getFormattedLabelWithFunctionColumnDefinition, getLimitedTableTextColumn, getTableTextColumn } from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faLink} from "@fortawesome/pro-light-svg-icons";
import externalApiIntegratorEndpointMetadata from "@opsera/definitions/constants/registry/tools/external_api_integrator/externalApiIntegratorEndpoint.metadata";
import NewExternalApiIntegratorEndpointOverlay from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/NewExternalApiIntegratorEndpointOverlay";
import endpointTypeConstants from "@opsera/definitions/constants/api/request/endpoint/endpointType.constants";
import endpointRequestTypeConstants from "@opsera/definitions/constants/api/request/endpoint/endpointRequestType.constants";

function ExternalApiIntegratorEndpointsTable(
  {
    toolId,
    loadData,
    handleRowSelectFunction,
    isLoading,
    endpoints,
  }) {
  const fields = externalApiIntegratorEndpointMetadata.fields;
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);

  useEffect(()=>{
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  },[]);

  const createEndpoint = () => {
    toastContext.showOverlayPanel(
      <NewExternalApiIntegratorEndpointOverlay
        toolId={toolId}
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), endpointTypeConstants.getEndpointTypeLabel),
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "requestType"), endpointRequestTypeConstants.getEndpointRequestTypeLabel),
      getTableTextColumn(getField(fields, "url")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
    ],
    []
  );

  const getEndpointsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={endpoints}
        onRowSelect={handleRowSelectFunction}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  const getExportAndImportButtons = () => {
    return (
      <>
      </>
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      addRecordFunction={createEndpoint}
      body={getEndpointsTable()}
      isLoading={isLoading}
      metadata={externalApiIntegratorEndpointMetadata}
      inlineFilters={getExportAndImportButtons()}
      titleIcon={faLink}
      title={"Endpoints"}
      className={"mt-2"}
    />
  );
}

ExternalApiIntegratorEndpointsTable.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  handleRowSelectFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  endpoints: PropTypes.array,
};

export default ExternalApiIntegratorEndpointsTable;