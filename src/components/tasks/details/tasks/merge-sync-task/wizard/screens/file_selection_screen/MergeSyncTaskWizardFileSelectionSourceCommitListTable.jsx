import React, {useState} from 'react';
import PropTypes from "prop-types";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import { EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS } from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpointInput.heights";
import FilterContainer from "components/common/table/FilterContainer";

const MergeSyncTaskWizardFileSelectionSourceCommitListTable = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  sourceCommitList,
  handleClose,
  isLoading,
  loadData,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getCurrentView = () => {
    return JSON.stringify(sourceCommitList);
    // return (
    //   <EndpointRequestHeaderConfigurationInput
    //     model={externalApiIntegratorModel}
    //     setModel={setExternalApiIntegratorModel}
    //     disabled={disabled}
    //   />
    // );
  };

  // TODO: Set height to what makes sense
  return (
    <FilterContainer
      icon={faFileCode}
      title={`Source File Selection`}
      loadData={loadData}
      isLoading={isLoading}
      minimumHeight={
        EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT
      }
      maximumHeight={
        EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT
      }
      body={getCurrentView()}
    />
  );
};

MergeSyncTaskWizardFileSelectionSourceCommitListTable.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  sourceCommitList: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};

export default MergeSyncTaskWizardFileSelectionSourceCommitListTable;