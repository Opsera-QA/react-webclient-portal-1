import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { faBracketsCurly, faCheckCircle, faTrash } from "@fortawesome/pro-light-svg-icons";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import MonacoEditorCodeDiffInputBase
  from "components/common/inputs/code/monaco/MonacoEditorCodeDiffInputBase";
import MergeSyncTaskWizardSubmitEditedFileButton from "../file_editor/MergeSyncTaskWizardSubmitEditedFileButton";

const MergeSyncTaskWizardDiffSelectorVerticalTabContainer = ({
  file,
  deltaList,
  isLoading,
  loadDataFunction,
  selectDeltaFunction,
  comparisonFileModel,
  setComparisonFileModel,
  wizardModel,
  setWizardModel,
  sourceContent,
  destinationContent,
  theme,
  inlineDiff,
}) => {

  const onChangeHandler = (editedContent) => {
    const newComparisonFileModel = { ...comparisonFileModel };
    newComparisonFileModel?.setData("manualContent", editedContent);
    setComparisonFileModel({ ...newComparisonFileModel });
  };

  const getCurrentView = () => {
    if (destinationContent?.length < 1 && sourceContent?.length < 1) {
      return <div className={"m-2"}>No changes returned from the service</div>;
    }

    return (
      <div className={"mt-2"}>
        <MonacoEditorCodeDiffInputBase
          mode={file?.fileExtension?.split(".").join("")}
          originalContent={destinationContent}
          modifiedContent={sourceContent}
          isLoading={isLoading}
          disabled={isLoading || !file || file.commitAction === "removed"}
          height={
            MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_CONTAINER_HEIGHT
          }
          theme={theme}
          inlineDiff={inlineDiff}
          onChangeHandler={onChangeHandler}
        />
      </div>
    );
  };

  return (
    <VanitySetTabAndViewContainer
      titleBar={false}
      icon={faBracketsCurly}
      title={`Diff Editor`}
      tabColumnSize={0}
      // titleRightSideButton={getTitleBarActionButtons()}
      bodyClassName={"mx-0"}
      currentView={getCurrentView()}
      isLoading={isLoading}
      titleClassName={"code-diff-title-bar"}
      loadDataFunction={loadDataFunction}
      minimumHeight={
        MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_CONTAINER_HEIGHT
      }
      maximumHeight={
        MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_CONTAINER_HEIGHT
      }
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
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  file: PropTypes.object,
  theme: PropTypes.string,
  inlineDiff: PropTypes.bool
};

MergeSyncTaskWizardDiffSelectorVerticalTabContainer.defaultProps = {
  theme: "light",
  inlineDiff: false
};

export default MergeSyncTaskWizardDiffSelectorVerticalTabContainer;