import React, {useMemo, useContext, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faLink} from "@fortawesome/pro-light-svg-icons";
import externalApiIntegratorEndpointMetadata from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoint.metadata";
import NewExternalApiIntegratorEndpointOverlay
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/NewExternalApiIntegratorEndpointOverlay";
import {
  getEndpointRequestTypeLabel
} from "components/common/list_of_values_input/tools/extermal_api_integrator/request/types/endpointRequestType.constants";

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
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "requestType"), getEndpointRequestTypeLabel),
      getTableTextColumn(getField(fields, "url")),
      getTableTextColumn(getField(fields, "description")),
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

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      addRecordFunction={createEndpoint}
      body={getEndpointsTable()}
      isLoading={isLoading}
      metadata={externalApiIntegratorEndpointMetadata}
      titleIcon={faLink}
      title={"Endpoints"}
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