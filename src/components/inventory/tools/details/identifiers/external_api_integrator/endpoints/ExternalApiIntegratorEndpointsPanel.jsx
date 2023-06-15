import React, {useState} from "react";
import ExternalApiIntegratorEndpointsTable from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointsTable";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import ExternalApiIntegratorEndpointEditorPanel
  from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/ExternalApiIntegratorEndpointEditorPanel";
import externalApiIntegratorEndpointMetadata from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpoint.metadata";
import useGetExternalApiIntegratorEndpoints
  from "hooks/tools/external_api_integrator/endpoints/useGetExternalApiIntegratorEndpoints";

function ExternalApiIntegratorEndpointsPanel({ toolId }) {
  const [externalApiIntegratorModel, setExternalApiIntegratorModel] = useState(undefined);
  const {
    endpoints,
    isLoading,
    error,
    loadData,
  } = useGetExternalApiIntegratorEndpoints(toolId);

  const handleRowSelectFunction = (rowData) => {
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, externalApiIntegratorEndpointMetadata);
    setExternalApiIntegratorModel({...parsedModel});
  };

  const closePanelFunction = async () => {
    setExternalApiIntegratorModel(null);
    await loadData();
  };

  if (externalApiIntegratorModel != null) {
    return (
      <ExternalApiIntegratorEndpointEditorPanel
        closePanelFunction={closePanelFunction}
        externalApiIntegratorModel={externalApiIntegratorModel}
        setExternalApiIntegratorModel={setExternalApiIntegratorModel}
        toolId={toolId}
        loadData={loadData}
      />
    );
  }

  return (
    <ExternalApiIntegratorEndpointsTable
      isLoading={isLoading}
      endpoints={endpoints}
      toolId={toolId}
      loadData={loadData}
      handleRowSelectFunction={handleRowSelectFunction}
    />
  );
}

ExternalApiIntegratorEndpointsPanel.propTypes = {
  toolId: PropTypes.string,
};

export default ExternalApiIntegratorEndpointsPanel;
