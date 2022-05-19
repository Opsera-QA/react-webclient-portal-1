import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { faBracketsCurly } from "@fortawesome/pro-light-svg-icons";
import MergeSyncTaskWizardCommitViewer
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/MergeSyncTaskWizardCommitViewer";
import axios from "axios";
import InfoContainer from "components/common/containers/InfoContainer";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import { hasStringValue } from "components/common/helpers/string-helpers";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

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
  const noDataFilesPulledMessage = "The Comparison Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Comparison Files list has not been received. Please click the table's refresh button to resume polling for the files.";

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

  const getShortenedName = (diffFile) => {
    const fileName = diffFile?.committedFile;

    if (hasStringValue(fileName)) {
      const lastIndexOf = fileName.lastIndexOf('/');
      return fileName.substring(lastIndexOf + 1);
    }
  };

  const getCommitFileTab = (diffFile, index) => {
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={getShortenedName(diffFile)}
        tabName={`${index}`}
        handleTabClick={handleTabClick}
        tooltipText={diffFile?.committedFile}
        activeTab={activeTab}
        className={"small-label-text"}
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

  const getLoadingBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          customMessage={"Pulling Files and calculating selection options to handle Diff Comparison. Please Note: this may take some time."}
        />
      );
    }

    if (filePullCompleted === true) {
      return noDataFilesPulledMessage;
    }

    return noDataFilesNotPulledMessage;
  };

  if (!Array.isArray(diffFileList) || diffFileList.length === 0) {
    return (
      <InfoContainer
        titleText={`Merge Change Selection`}
        titleIcon={faBracketsCurly}
        loadDataFunction={loadDataFunction}
        isLoading={isLoading}
        minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.MAIN_CONTAINER}
        maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.MAIN_CONTAINER}
      >
        <div className={"m-3"}>
          {getLoadingBody()}
        </div>
      </InfoContainer>
    );
  }

  return (
    <>
      {/*<InlineWarning*/}
      {/*  warningMessage={"Please Note: The line numbers shown do not correspond to the lines in the actual file."}*/}
      {/*/>*/}
      <VanitySetTabAndViewContainer
        icon={faBracketsCurly}
        title={`Merge Change Selection`}
        verticalTabContainer={getVerticalTabContainer()}
        bodyClassName={"mx-0"}
        currentView={getCurrentView()}
        isLoading={isLoading}
        loadDataFunction={loadDataFunction}
        minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.MAIN_CONTAINER}
        maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.MAIN_CONTAINER}
      />
    </>
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