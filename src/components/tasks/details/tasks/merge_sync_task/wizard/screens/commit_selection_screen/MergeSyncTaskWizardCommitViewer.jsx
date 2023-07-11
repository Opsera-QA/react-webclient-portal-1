import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import mergeSyncTaskWizardActions from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { comparisonFileMetadata } from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/comparisonFile.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import MergeSyncTaskWizardDiffSelectorVerticalTabContainer from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/diff_viewer/MergeSyncTaskWizardDiffSelectorVerticalTabContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import MergeSyncTaskWizardAdvancedEditingModePanel from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/file_editor/MergeSyncTaskWizardAdvancedEditingModePanel";
import MergeSyncTaskWizardSubmitEditedFileButton from "./file_editor/MergeSyncTaskWizardSubmitEditedFileButton";
import RefreshButton from "../../../../../../../common/buttons/data/RefreshButton";
import ToggleJsonViewIconButton from "../../../../../../../common/buttons/toggle/ToggleJsonViewIconButton";

const MergeSyncTaskWizardCommitViewer = ({
  wizardModel,
  setWizardModel,
  diffFile,
  theme,
  inlineDiff,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonFileModel, setComparisonFileModel] = useState(undefined);
  const [inEditingMode, setInEditingMode] = useState(false);
  const [inJsonView, setInJsonView] = useState(false);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  useEffect(() => {
    setComparisonFileModel(undefined);
    setInEditingMode(false);
    setInJsonView(false);

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

  const toggleView = async () => {
    const oldInJsonView = inJsonView;
    if (oldInJsonView && hasStringValue(diffFile?.committedFile)) {
      await loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
    setInJsonView(!oldInJsonView);
  };

  const getDiffFileList = async () => {
    // console.log(diffFile);
    if (!diffFile?.whitelisted) {
      setComparisonFileModel(undefined);
      return;
    }
    const response =
      await mergeSyncTaskWizardActions.retrieveSelectedFileContent(
        getAccessToken,
        cancelTokenSource,
        wizardModel?.getData("taskId"),
        wizardModel?.getData("runCount"),
        diffFile?.committedFile,
      );

    const fileContent = response?.data?.data;

    if (isMounted?.current === true && fileContent) {
      const newComparisonFileModel = modelHelpers.parseObjectIntoModel(
        fileContent,
        comparisonFileMetadata,
      );
      setComparisonFileModel(newComparisonFileModel);
    }
  };

  const getCurrentView = () => {
    if (inEditingMode === true) {
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

    // FYI : Deltas are not being sent anymore to improve performance : so just show file contents on UI
    // if (!Array.isArray(deltas) || deltas.length === 0) {
    //   return "No changes returned from the service";
    // }

    return (
      <div>
        <MergeSyncTaskWizardDiffSelectorVerticalTabContainer
          file={diffFile}
          deltaList={deltas}
          isLoading={isLoading}
          loadDataFunction={loadData}
          selectDeltaFunction={selectDeltaFunction}
          comparisonFileModel={comparisonFileModel}
          setComparisonFileModel={setComparisonFileModel}
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          destinationContent={comparisonFileModel?.getData(
            "destinationContent",
          )}
          sourceContent={comparisonFileModel?.getData("sourceContent")}
          theme={theme}
          inlineDiff={inlineDiff}
          inJsonView={inJsonView}
          setInJsonView={setInJsonView}
        />
        {/*<div>*/}
        {/*  <ButtonContainerBase className={"mt-2"}>*/}
        {/*    <MergeSyncTaskWizardSubmitEditedFileButton*/}
        {/*      fileName={comparisonFileModel?.getData("file")}*/}
        {/*      fileContent={comparisonFileModel?.getData("manualContent")}*/}
        {/*      comparisonFileModel={comparisonFileModel}*/}
        {/*      wizardModel={wizardModel}*/}
        {/*      setWizardModel={setWizardModel}*/}
        {/*    />*/}
        {/*  </ButtonContainerBase>*/}
        {/*</div>*/}
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
      setComparisonFileModel({ ...comparisonFileModel });
    }
  };

  if (isLoading === true) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading Selected File Changes"}
      />
    );
  }

  const getCommitActionLabel = (action) => {
    switch (action?.toLowerCase()) {
    case "modified":
      return (
        <span style={{
          display: "flex",
          backgroundColor: "#b3d4ff",
          borderColor: "#b3d4ff",
          color: "#0052cc", border: 1,
          padding: "2px 5px",
          textAlign: 'center',
          borderRadius: 3,
          fontWeight: 500,
          alignItems: 'center',
          textTransform: 'capitalize',
          marginLeft: 10 
        }}>{action}</span>
      );
    case "added":
      return (
        <span style={{
          display: "flex",
          backgroundColor: "#00875a",
          borderColor: "#00875a",
          color: "#fff", border: 1,
          padding: "2px 5px",
          textAlign: 'center',
          borderRadius: 3,
          fontWeight: 500,
          alignItems: 'center',
          textTransform: 'capitalize',
          marginLeft: 10
        }}>{action}</span>
      );
    case "removed":
      return (
        <span style={{
          display: "flex",
          backgroundColor: "#E57373",
          borderColor: "#E57373",
          color: "#fff", border: 1,
          padding: "2px 5px",
          textAlign: 'center',
          borderRadius: 3,
          fontWeight: 500,
          alignItems: 'center',
          textTransform: 'capitalize',
          marginLeft: 10
        }}>{action}</span>
      );
    case "conflict":
      return (
        <span style={{
          display: "flex",
          backgroundColor: "#ffab00",
          borderColor: "#ffab00",
          color: "#253858", border: 1,
          padding: "2px 5px",
          textAlign: 'center',
          borderRadius: 3,
          fontWeight: 500,
          alignItems: 'center',
          textTransform: 'capitalize',
          marginLeft: 10
        }}>{action}</span>
      );
    default:
      return (
        <span style={{
          display: "flex",
          backgroundColor: "#00897b",
          borderColor: "#00897b",
          color: "#fff", border: 1,
          padding: "2px 5px",
          textAlign: 'center',
          borderRadius: 3,
          fontWeight: 500,
          alignItems: 'center',
          textTransform: 'capitalize',
          marginLeft: 10
        }}>{action}</span>
      );
    }
  };

  const getTitleActionButtons = () => {
    return (
      <div className={"d-flex justify-content-between"}>
        <div className="flex">
          <TextFieldBase
            dataObject={comparisonFileModel}
            fieldName={"file"}
            className={"my-auto"}
          />
          {getCommitActionLabel(diffFile?.commitAction)}
        </div>
        <div className={"d-flex"}>
          <RefreshButton
            loadDataFunction={loadData}
            isLoading={isLoading}
          />
          {diffFile?.componentType === "Profile" &&
            <ToggleJsonViewIconButton
              toggleView={toggleView}
              className={"mr-2 ml-2"}
            />
          }
          {!inJsonView &&
            <MergeSyncTaskWizardSubmitEditedFileButton
              fileName={comparisonFileModel?.getData("file")}
              fileContent={comparisonFileModel?.getData("manualContent")}
              comparisonFileModel={comparisonFileModel}
              wizardModel={wizardModel}
              setWizardModel={setWizardModel}
              className={"ml-2 my-auto"}
            />
          }
        </div>
      </div>
    );
  };

  if (diffFile && !diffFile?.whitelisted) {
    return <div className={"m-2"}>Unsupported File Format</div>;
  }

  return (
    <div
      className={"mt-1 mx-3"}
      style={{ overflowX: "hidden" }}
    >
      {getTitleActionButtons()}
      {getCurrentView()}
    </div>
  );
};

MergeSyncTaskWizardCommitViewer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  diffFile: PropTypes.object,
  theme: PropTypes.string,
  inlineDiff: PropTypes.bool,
};

export default MergeSyncTaskWizardCommitViewer;
