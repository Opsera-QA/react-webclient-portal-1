import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import { faBracketsCurly, faCheckCircle, faTrash } from "@fortawesome/pro-light-svg-icons";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import MonacoCodeDiffInput, {
  MONACO_CODE_THEME_TYPES
} from "components/common/inputs/code/monaco/MonacoCodeDiffInput";
import MonacoEditorCodeDiffInputBase
  from "components/common/inputs/code/monaco/MonacoEditorCodeDiffInputBase";
import ToggleThemeIcon from "components/common/buttons/toggle/ToggleThemeIcon";
import ToggleDiffViewIcon from "components/common/buttons/toggle/ToggleDiffViewIcon";
import MergeSyncTaskWizardSubmitEditedFileButton from "../file_editor/MergeSyncTaskWizardSubmitEditedFileButton";

const MergeSyncTaskWizardDiffSelectorVerticalTabContainer = ({
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
}) => {

  const [internalTheme, setInternalTheme] = useState(
    MONACO_CODE_THEME_TYPES.LIGHT,
  );
  const [inlineDiff, setInlineDiff] = useState(false);

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
        <MergeSyncTaskWizardSubmitEditedFileButton
            fileName={comparisonFileModel?.getData("file")}
            fileContent={comparisonFileModel?.getData("manualContent")}
            comparisonFileModel={comparisonFileModel}
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
        />
      </div>
    );
  };

  const onChangeHandler = (editedContent) => {
    const newComparisonFileModel = { ...comparisonFileModel };
    newComparisonFileModel?.setData("manualContent", editedContent);
    setComparisonFileModel({ ...newComparisonFileModel });
  };

  const getCurrentView = () => {
    if (destinationContent.length < 1 && sourceContent.length < 1) {
      return <div className={"m-2"}>No changes returned from the service</div>;
    }

    return (
      <div className={"m-2"}>
        <MonacoEditorCodeDiffInputBase
          originalContent={destinationContent}
          modifiedContent={sourceContent}
          isLoading={isLoading}
          disabled={isLoading}
          height={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_CONTAINER_HEIGHT}
          theme={internalTheme}
          inlineDiff={inlineDiff}
          onChangeHandler={onChangeHandler}
        />
      </div>
    );
  };

  return (
    <VanitySetTabAndViewContainer
      icon={faBracketsCurly}
      title={`Diff Editor`}
      tabColumnSize={0}
      titleRightSideButton={getTitleBarActionButtons()}
      bodyClassName={"mx-0"}
      currentView={getCurrentView()}
      isLoading={isLoading}
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
};

export default MergeSyncTaskWizardDiffSelectorVerticalTabContainer;