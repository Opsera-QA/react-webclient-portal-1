import React, {useMemo, useContext, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faLink} from "@fortawesome/pro-light-svg-icons";
import toolEndpointsMetadata from "components/inventory/tools/details/endpoints/toolEndpoints.metadata";
import NewExternalApiIntegratorEndpointOverlay
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/NewExternalApiIntegratorEndpointOverlay";

function ExternalApiIntegratorEndpointsTable(
  {
    toolId,
    loadData,
    onRowSelect,
    isLoading,
    endpoints,
  }) {
  const fields = toolEndpointsMetadata.fields;
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
      getTableTextColumn(getField(fields, "requestType")),
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
        onRowSelect={onRowSelect}
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
      metadata={toolEndpointsMetadata}
      titleIcon={faLink}
      title={"Endpoints"}
    />
  );
}

ExternalApiIntegratorEndpointsTable.propTypes = {
  toolId: PropTypes.string,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  endpoints: PropTypes.array,
};

export default ExternalApiIntegratorEndpointsTable;