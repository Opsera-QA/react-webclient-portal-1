import React, {useState, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingDialog from "components/common/status_notifications/loading";
import {
  comparisonFileMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/comparisonFile.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import MergeSyncTaskWizardDiffSelectorVerticalTabContainer
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/diff_viewer/MergeSyncTaskWizardDiffSelectorVerticalTabContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import MergeSyncTaskWizardCommitFileDiffSelectionsButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/diff_viewer/MergeSyncTaskWizardCommitFileDiffSelectionsButton";
import MergeSyncTaskWizardAdvancedFileEditingButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/file_editor/MergeSyncTaskWizardAdvancedFileEditingButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import SideBySideCodeComparisonField from "components/common/fields/file/comparison/SideBySideCodeComparisonField";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import MergeSyncTaskWizardSelectFileOptionButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/file_editor/MergeSyncTaskWizardSelectFileOptionButton";
import MergeSyncTaskWizardFileEditor
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/file_editor/MergeSyncTaskWizardFileEditor";

const MergeSyncTaskWizardAdvancedEditingModePanel = (
  {
    wizardModel,
    setWizardModel,
    comparisonFileModel,
    setComparisonFileModel,
    isLoading,
  }) => {
  if (isLoading === true) {
    return (<LoadingDialog size={"sm"} message={"Loading Selected File Changes"} />);
  }

  // TODO: If we eventually want to add editing from either side, comment this back in,
  //  it will need some tweaking since I had to change things to disable it
  // if (hasStringValue(comparisonFileModel?.getData("manualContent")) !== true) {
  //     return (
  //       <div>
  //         <SideBySideCodeComparisonField
  //           titleText={"Select Source or Destination File to Start Editing"}
  //           isLoading={isLoading}
  //           leftSideCode={comparisonFileModel?.getData("sourceContent")}
  //           leftSideTitleText={"File on Source Branch"}
  //           rightSideCode={comparisonFileModel?.getData("destinationContent")}
  //           rightSideTitleText={"File on Destination Branch"}
  //           maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_DIFF_HEIGHT}
  //           minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_SELECTION_DIFF_HEIGHT}
  //           language={comparisonFileModel?.getData("language")}
  //         />
  //         <SaveButtonContainer
  //           extraButtons={
  //             <MergeSyncTaskWizardSelectFileOptionButton
  //               comparisonFileModel={comparisonFileModel}
  //               setComparisonFileModel={setComparisonFileModel}
  //               fileContentFieldName={"sourceContent"}
  //               isLoading={isLoading}
  //               buttonText={"Start Editing From Changes on Source Branch"}
  //             />
  //           }
  //         >
  //           <MergeSyncTaskWizardSelectFileOptionButton
  //             comparisonFileModel={comparisonFileModel}
  //             setComparisonFileModel={setComparisonFileModel}
  //             fileContentFieldName={"destinationContent"}
  //             isLoading={isLoading}
  //             buttonText={"Start Editing From Content on Destination Branch"}
  //           />
  //         </SaveButtonContainer>
  //       </div>
  //     );
  //   }


    return (
    <MergeSyncTaskWizardFileEditor
      comparisonFileModel={comparisonFileModel}
      setComparisonFileModel={setComparisonFileModel}
      isLoading={isLoading}
      fileContentFieldName={comparisonFileModel?.getData("fileContentFieldName")}
      wizardModel={wizardModel}
    />
  );
};

MergeSyncTaskWizardAdvancedEditingModePanel.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardAdvancedEditingModePanel;