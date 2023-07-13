import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import mergeSyncTaskWizardActions from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import { Button } from "react-bootstrap";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import CancelButton from "components/common/buttons/CancelButton";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import LoadingDialog from "components/common/status_notifications/loading";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import MergeSyncTaskWizardValidatedFilesTable
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_upload_validation/MergeSyncTaskWizardValidatedFilesTable";
import MergeSyncTaskWizardInvalidFilesTable
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_upload_validation/MergeSyncTaskWizardInvalidFilesTable";
import MergeSyncTaskWizardSubmitSelectedFilesButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/MergeSyncTaskWizardSubmitSelectedFilesButton";
import IconBase from "components/common/icons/IconBase";

const MergeSyncTaskWizardValidatedFileViewer = ({ wizardModel, setWizardModel, setCurrentScreen, handleClose, mergeSyncType}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filteredFileCount, setFilteredFileCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filePullCompleted, setFilePullCompleted] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await toggleFileValidation(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showInlineErrorMessage(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const toggleFileValidation = async (cancelSource = cancelTokenSource) => {
    await mergeSyncTaskWizardActions.toggleTaskFilesValidation(getAccessToken, cancelSource, wizardModel);
  };

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog size={"sm"} message={"Requesting Files"} />;
    }

    return (
      <>
        <InlineWarning
          className={"ml-2"}
          warningMessage={"Warning: Use of the keyword search filter in the tables below will not alter the final file list."}
        />
        <Row className="mt-2 d-flex" style={{ minWidth: "1400px" }}>
          <Col xs={6} className={"pr-1"} style={{ minWidth: "675px" }}>
            <MergeSyncTaskWizardValidatedFilesTable
              wizardModel={wizardModel}
              setFilteredFileCount={setFilteredFileCount}
              setWizardModel={setWizardModel}
              setFilePullCompleted={setFilePullCompleted}
              filePullCompleted={filePullCompleted}
            />
          </Col>
          <Col xs={6} className={"pl-1"} style={{ minWidth: "675px" }}>
            <MergeSyncTaskWizardInvalidFilesTable wizardModel={wizardModel} />
          </Col>
        </Row>
      </>
    );
  };

  const getView = () => {
    return (
      <div>
        {getBody()}
        <SaveButtonContainer>
          <Button variant="secondary" size="sm" className="mr-2" onClick={() => { setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN); }}>
            <IconBase icon={faArrowLeft} className={"mr-1"} />Back
          </Button>
          <MergeSyncTaskWizardSubmitSelectedFilesButton
            setCurrentScreen={setCurrentScreen}
            wizardModel={wizardModel}
            filteredFileCount={filteredFileCount}
            isLoading={isLoading}
            newRecord={false}
          />
          <CancelButton size={"sm"} className={"ml-2"} cancelFunction={handleClose} />
        </SaveButtonContainer>
      </div>
    );
  }

  return (
    <div>
      <div className="h5">{mergeSyncType} Task Run: Validated File Viewer</div>
      <div className="text-muted mb-2">
        View validation results for the uploaded file.
      </div>
      {getView()}
    </div>
  );
};

MergeSyncTaskWizardValidatedFileViewer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  mergeSyncType: PropTypes.string,
};

export default MergeSyncTaskWizardValidatedFileViewer;
