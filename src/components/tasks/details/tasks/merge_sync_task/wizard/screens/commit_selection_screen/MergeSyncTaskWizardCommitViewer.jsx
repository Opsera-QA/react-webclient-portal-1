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
import MergeSyncTaskWizardAdvancedEditingModePanel
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/file_editor/MergeSyncTaskWizardAdvancedEditingModePanel";

const MergeSyncTaskWizardCommitViewer = ({
  wizardModel,
  setWizardModel,
  diffFile,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonFileModel, setComparisonFileModel] = useState(undefined);
  const [inEditingMode, setInEditingMode] = useState(false);
  const { isMounted, cancelTokenSource} = useComponentStateReference();

  useEffect(() => {
    setComparisonFileModel(undefined);
    setInEditingMode(false);

    if (hasStringValue(diffFile?.committedFile)) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [diffFile]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getDiffFileList();
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDiffFileList = async () => {
    const response = await mergeSyncTaskWizardActions.retrieveSelectedFileContent(
      getAccessToken,
      cancelTokenSource,
      wizardModel?.getData("taskId"),
      wizardModel?.getData("runCount"),
      diffFile?.committedFile,
    );
    const fileContent = response?.data?.data;

    if (isMounted?.current === true && fileContent) {
      const newComparisonFileModel = modelHelpers.parseObjectIntoModel(fileContent, comparisonFileMetadata);
      setComparisonFileModel(newComparisonFileModel);
    }
  };

  const getCurrentView = () => {
    if (inEditingMode) {
      return (
        <MergeSyncTaskWizardAdvancedEditingModePanel
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          comparisonFileModel={comparisonFileModel}
          setComparisonFileModel={setComparisonFileModel}
          isLoading={isLoading}
        />
      );
    }

    const deltas = comparisonFileModel?.getArrayData("deltas");

    if (!Array.isArray(deltas) || deltas.length === 0) {
      return "No changes returned from the service";
    }

    return (
      <div>
        <MergeSyncTaskWizardDiffSelectorVerticalTabContainer
          deltaList={deltas}
          isLoading={isLoading}
          loadDataFunction={loadData}
          selectDeltaFunction={selectDeltaFunction}
          destinationContent={comparisonFileModel?.getData("destinationContent")}
          sourceContent={comparisonFileModel?.getData("sourceContent")}
        />
        <div>
          <ButtonContainerBase
            className={"mt-2"}
            leftSideButtons={
              <MergeSyncTaskWizardAdvancedFileEditingButton
                comparisonFileModel={comparisonFileModel}
                setComparisonFileModel={setComparisonFileModel}
                isLoading={isLoading}
                inEditingMode={inEditingMode}
                setInEditingMode={setInEditingMode}
              />
            }
          >
            <MergeSyncTaskWizardCommitFileDiffSelectionsButton
              wizardModel={wizardModel}
              setWizardModel={setWizardModel}
              isLoading={isLoading}
              comparisonFileModel={comparisonFileModel}
            />
          </ButtonContainerBase>
        </div>
      </div>
    );
  };

  const selectDeltaFunction = (index, ignoreIncoming) => {
    const deltas = comparisonFileModel?.getArrayData("deltas");
    if (Array.isArray(deltas) && deltas.length > index) {
      const delta = deltas[index];
      delta.ignoreIncoming = ignoreIncoming;
      deltas[index] = delta;
      comparisonFileModel.setData("deltas", [...deltas]);
      setComparisonFileModel({...comparisonFileModel});
    }
  };

  if (isLoading === true) {
    return (<LoadingDialog size={"sm"} message={"Loading Selected File Changes"} />);
  }

  return (
    <div className={"mt-1 mx-3"} style={{ overflowX: "hidden" }}>
      <TextFieldBase
        dataObject={comparisonFileModel}
        fieldName={"file"}
      />
      {getCurrentView()}
    </div>
  );
};

MergeSyncTaskWizardCommitViewer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  diffFile: PropTypes.object,
};

export default MergeSyncTaskWizardCommitViewer;