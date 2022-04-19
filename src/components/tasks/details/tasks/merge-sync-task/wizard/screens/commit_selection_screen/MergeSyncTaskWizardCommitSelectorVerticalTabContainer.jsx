import React, {useState} from 'react';
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import {
  EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS
} from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpointInput.heights";

const MergeSyncTaskWizardCommitSelectorVerticalTabContainer = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  diffFileList,
  handleClose,
  isLoading,
  // loadData,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getCommitFileTab = (diffFile, index) => {
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={diffFile?.committedFile}
        tabName={`${index}`}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    if (Array.isArray(diffFileList) && diffFileList.length > 0) {
      return (
        <VanitySetVerticalTabContainer>
          {diffFileList?.map((fieldData, index) => {
            return getCommitFileTab(fieldData, index);
          })}
        </VanitySetVerticalTabContainer>
      );
    }
  };

  const getCurrentView = () => {
    return diffFileList[activeTab];
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
    <VanitySetTabAndViewContainer
      icon={faBracketsCurly}
      title={`Merge Change Selection`}
      verticalTabContainer={getVerticalTabContainer()}
      bodyClassName={"mx-0"}
      currentView={getCurrentView()}
      isLoading={isLoading}
      minimumHeight={
        EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT
      }
      maximumHeight={
        EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS.EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETERS_CONTAINER_HEIGHT
      }
    />
  );
};

MergeSyncTaskWizardCommitSelectorVerticalTabContainer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  diffFileList: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardCommitSelectorVerticalTabContainer;