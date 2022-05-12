import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { faBracketsCurly, faCheckCircle, faTrash } from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import SideBySideDeltaDiffField from "components/common/fields/file/diff/delta/SideBySideDeltaDiffField";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import MergeSyncTaskWizardSelectDeltaVersionButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/diff_viewer/MergeSyncTaskWizardSelectDeltaVersionButton";

const MergeSyncTaskWizardDiffSelectorVerticalTabContainer = (
  {
    deltaList,
    isLoading,
    loadDataFunction,
    selectDeltaFunction,
    sourceContent,
    destinationContent,
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

    if (activeTab == null && Array.isArray(deltaList) && deltaList?.length > 0) {
      setActiveTab('0');
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [deltaList]);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getDeltaTab = (index) => {
    return (
      <VanitySetVerticalTab
        key={index}
        tabText={`${index}`}
        tabName={`${index}`}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    if (Array.isArray(deltaList) && deltaList.length > 0) {
      return (
        <VanitySetVerticalTabContainer>
          {deltaList?.map((delta, index) => {
            return getDeltaTab(index);
          })}
        </VanitySetVerticalTabContainer>
      );
    }
  };

  const getCurrentView = () => {
    if (activeTab && Array.isArray(deltaList) && deltaList.length > 0) {
      const delta = deltaList[Number(activeTab)];

      if (delta) {
        return (
          <div className={"m-2"}>
            <SideBySideDeltaDiffField
              delta={delta}
              loadDataFunction={loadDataFunction}
              isLoading={isLoading}
              maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_DIFF_HEIGHT}
              minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_DIFF_HEIGHT}
              leftSideTitleIcon={delta?.ignoreIncoming === true ? faCheckCircle : faTrash}
              rightSideTitleIcon={delta?.ignoreIncoming === false ? faCheckCircle : faTrash}
              sourceCode={sourceContent}
              destinationCode={destinationContent}
            />
            <SaveButtonContainer
              extraButtons={
                <MergeSyncTaskWizardSelectDeltaVersionButton
                  selectDeltaFunction={() => selectDeltaFunction(Number(activeTab), true)}
                  isLoading={isLoading}
                  fieldName={"destinationContent"}
                  fileContent={destinationContent}
                  type={"Destination Branch"}
                  selected={delta?.ignoreIncoming === true}
                  buttonText={"Keep Existing Changes on Destination Branch"}
                  savingButtonText={"Saving Commit Selection"}
                  savedButtonText={"Keeping Original Changes on Destination Branch"}
                />
              }
            >
              <MergeSyncTaskWizardSelectDeltaVersionButton
                selectDeltaFunction={() => selectDeltaFunction(Number(activeTab), false)}
                isLoading={isLoading}
                fieldName={"sourceContent"}
                fileContent={sourceContent}
                type={"Source Branch"}
                selected={delta?.ignoreIncoming === false}
                buttonText={"Merge In Changes from Source Branch"}
                savingButtonText={"Saving Commit Selection"}
                savedButtonText={"Merging in Changes from Source Branch"}
              />
            </SaveButtonContainer>
          </div>
        );
      }
    }
  };

  return (
    <VanitySetTabAndViewContainer
      icon={faBracketsCurly}
      title={`Diff Selection`}
      verticalTabContainer={getVerticalTabContainer()}
      bodyClassName={"mx-0"}
      currentView={getCurrentView()}
      isLoading={isLoading}
      loadDataFunction={loadDataFunction}
      minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_CONTAINER_HEIGHT}
      maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_CONTAINER_HEIGHT}
    />
  );
};

MergeSyncTaskWizardDiffSelectorVerticalTabContainer.propTypes = {
  selectDeltaFunction: PropTypes.func,
  deltaList: PropTypes.array,
  isLoading: PropTypes.bool,
  loadDataFunction: PropTypes.func,
  sourceContent: PropTypes.string,
  destinationContent: PropTypes.string,
};

export default MergeSyncTaskWizardDiffSelectorVerticalTabContainer;