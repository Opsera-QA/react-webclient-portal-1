import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
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
import MergeSyncTaskWizardSelectDeltaVersionButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/diff_viewer/MergeSyncTaskWizardSelectDeltaVersionButton";
import MergeSyncTaskWizardCommitFileDiffSelectionsButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/diff_viewer/MergeSyncTaskWizardCommitFileDiffSelectionsButton";

const MergeSyncTaskWizardCommitViewer = ({
  wizardModel,
  setWizardModel,
  diffFile,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonFileModel, setComparisonFileModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setComparisonFileModel(undefined);

    if (hasStringValue(diffFile?.committedFile)) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [diffFile]);

  const loadData = async (
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await getDiffFileList(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDiffFileList = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await mergeSyncTaskWizardActions.retrieveSelectedFileContent(
      getAccessToken,
      cancelSource,
      wizardModel?.getData("taskId"),
      wizardModel?.getData("runCount"),
      diffFile?.committedFile,
    );
    const newFileMetadata = response?.data?.data;

    if (isMounted?.current === true && newFileMetadata) {
      const newComparisonFileModel = modelHelpers.parseObjectIntoModel(newFileMetadata, comparisonFileMetadata);
      setComparisonFileModel(newComparisonFileModel);
    }
  };

  const getDiffOptions = () => {
    const deltas = comparisonFileModel?.getArrayData("deltas");

    if (!Array.isArray(deltas) || deltas.length === 0) {
      return "No changes returned from the service";
    }

    return (
      <MergeSyncTaskWizardDiffSelectorVerticalTabContainer
        deltaList={deltas}
        isLoading={isLoading}
        loadDataFunction={loadData}
        selectDeltaFunction={selectDeltaFunction}
        destinationContent={comparisonFileModel?.getData("destinationContent")}
        sourceContent={comparisonFileModel?.getData("sourceContent")}
      />
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
      {getDiffOptions()}
      <ButtonContainerBase className={"mt-2"}>
        <MergeSyncTaskWizardCommitFileDiffSelectionsButton
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          isLoading={isLoading}
          comparisonFileModel={comparisonFileModel}
        />
      </ButtonContainerBase>
    </div>
  );
};

MergeSyncTaskWizardCommitViewer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  diffFile: PropTypes.object,
};

export default MergeSyncTaskWizardCommitViewer;