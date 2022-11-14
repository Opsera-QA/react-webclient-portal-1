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
import {faPlus, faMinus, faEdit} from "@fortawesome/free-solid-svg-icons";
import IconBase from "../../../../../../../common/icons/IconBase";
import ToggleThemeIcon from "../../../../../../../common/buttons/toggle/ToggleThemeIcon";
import ToggleDiffViewIcon from "../../../../../../../common/buttons/toggle/ToggleDiffViewIcon";
import {MONACO_CODE_THEME_TYPES} from "../../../../../../../common/inputs/code/monaco/MonacoCodeDiffInput";

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
  const [internalTheme, setInternalTheme] = useState(
      MONACO_CODE_THEME_TYPES.LIGHT,
  );
  const [inlineDiff, setInlineDiff] = useState(false);

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

  const toggleTheme = () => {
    const newTheme =
        internalTheme === MONACO_CODE_THEME_TYPES.DARK
            ? MONACO_CODE_THEME_TYPES.LIGHT
            : MONACO_CODE_THEME_TYPES.DARK;
    setInternalTheme(newTheme);
  };

  const toggleDiffView = () => {
    const oldInlineDiff = inlineDiff;
    setInlineDiff(!oldInlineDiff);
  };

  const getShortenedName = (diffFile) => {
    const fileName = diffFile?.committedFile;
    const fileAction = diffFile?.commitAction;
    if (hasStringValue(fileName)) {
      const lastIndexOf = fileName.lastIndexOf('/');
      return <>{getActionIcon(fileAction)} {fileName.substring(lastIndexOf + 1)}</>;
    }
  };

  const getActionIcon = (action) => {
    switch(action?.toLowerCase()) {
      case "added":
        return (<IconBase icon={faPlus} className={"mr-1 green"}/>);
      case "modified":
        return (<IconBase icon={faEdit} className={"mr-1 yellow"}/>);
      case "removed":
        return (<IconBase icon={faMinus} className={"mr-1 red"}/>);
      default:
        return (<></>);
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
              theme={internalTheme}
              inlineDiff={inlineDiff}
          />
      );
    }
  };

  const getLoadingBody = () => {
    if (isLoading === true) {
      return (
          <CenterLoadingIndicator
              customMessage={"Please wait while we pull the files and calculate selection options in order to handle the comparison of changes.  This may take some time."}
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

  const getTitleBarActionButtons = () => {
    return (
        <div className={"d-flex"}>
          <ToggleThemeIcon
              theme={internalTheme}
              toggleTheme={toggleTheme}
          />
          <ToggleDiffViewIcon
              toggleDiffView={toggleDiffView}
              className={"mr-2 ml-2"}
          />
        </div>
    );
  };

  return (
      <VanitySetTabAndViewContainer
          icon={faBracketsCurly}
          title={`Merge Change Selection`}
          titleRightSideButton={getTitleBarActionButtons()}
          verticalTabContainer={getVerticalTabContainer()}
          bodyClassName={"mx-0"}
          currentView={getCurrentView()}
          isLoading={isLoading}
          loadDataFunction={loadDataFunction}
          minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.MAIN_CONTAINER}
          maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.MAIN_CONTAINER}
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