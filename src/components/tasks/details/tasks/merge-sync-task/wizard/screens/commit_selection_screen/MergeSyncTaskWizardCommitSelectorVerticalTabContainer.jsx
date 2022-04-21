import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import {
  EXTERNAL_API_INTEGRATOR_ENDPOINT_PARAMETER_INPUT_HEIGHTS
} from "components/inventory/tools/details/identifiers/external_api_integrator/endpoints/externalApiIntegratorEndpointInput.heights";
import MergeSyncTaskWizardCommitViewer
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/commit_selection_screen/MergeSyncTaskWizardCommitViewer";
import axios from "axios";

const MergeSyncTaskWizardCommitSelectorVerticalTabContainer = (
  {
    diffFileList,
    isLoading,
    filePullCompleted,
    loadDataFunction,
    wizardModel,
    setWizardModel,
  }) => {
  const [activeTab, setActiveTab] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setActiveTab(undefined);

    if (Array.isArray(diffFileList) && diffFileList?.length > 0) {
      setActiveTab('0');
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [diffFileList]);

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
    if (activeTab && Array.isArray(diffFileList) && diffFileList.length > 0) {
      return (
        <MergeSyncTaskWizardCommitViewer
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          diffFile={diffFileList[activeTab]}
        />
      );
    }
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
      loadDataFunction={loadDataFunction}
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
  filePullCompleted: PropTypes.bool,
  loadDataFunction: PropTypes.func,
};

export default MergeSyncTaskWizardCommitSelectorVerticalTabContainer;