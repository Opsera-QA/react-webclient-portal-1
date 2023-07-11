import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {Button} from "react-bootstrap";
import {faArrowLeft} from "@fortawesome/pro-light-svg-icons";
import CancelButton from "components/common/buttons/CancelButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import SfdcPipelineWizardValidatedSfdcFilesTable
from "components/workflow/wizards/sfdc_pipeline_wizard/file_upload_validation/sfdc/SfdcPipelineWizardValidatedSfdcFilesTable";
import SfdcPipelineWizardInvalidSfdcFilesTable
from "components/workflow/wizards/sfdc_pipeline_wizard/file_upload_validation/sfdc/SfdcPipelineWizardInvalidSfdcFilesTable";
import SfdcPipelineWizardSubmitSfdcFilesButton
from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSubmitSfdcFilesButton";
import IconBase from "components/common/icons/IconBase";
import sfdcDependencyAnalyserActions from "../sfdc-dependency-analyser-actions";
import { DEPENDENCY_ANALYSER_SCREENS } from "../DependencyAnalyser";
import DependencyAnalyserSubmitFileButton from "./DependencyAnalyserSubmitFileButton";

const DependencyAnalyserFileValidationScreen = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, }) => {
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
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const toggleFileValidation = async (cancelSource = cancelTokenSource) => {
    if (pipelineWizardModel?.getData("isXml") === true) {
      await sfdcDependencyAnalyserActions.toggleSfdcXmlFilesValidation(
        getAccessToken,
        cancelSource,
        pipelineWizardModel,
      );
    } else if (pipelineWizardModel?.getData("isCsv") === true) {
      await sfdcDependencyAnalyserActions.toggleSfdcCsvFilesValidation(
        getAccessToken,
        cancelSource,
        pipelineWizardModel,
      );
    }
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
        <Row className="mt-2 d-flex" style={{minWidth: "1400px"}}>
          <Col xs={6} className={"pr-1"} style={{minWidth: "675px"}}>
            <SfdcPipelineWizardValidatedSfdcFilesTable
              pipelineWizardModel={pipelineWizardModel}
              setFilteredFileCount={setFilteredFileCount}
              setPipelineWizardModel={setPipelineWizardModel}
              setFilePullCompleted={setFilePullCompleted}
              filePullCompleted={filePullCompleted}
            />
          </Col>
          <Col xs={6} className={"pl-1"} style={{minWidth: "675px"}}>
            <SfdcPipelineWizardInvalidSfdcFilesTable pipelineWizardModel={pipelineWizardModel} />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div>
      {getBody()}
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => {setPipelineWizardScreen(DEPENDENCY_ANALYSER_SCREENS.INITIALIZATION_SCREEN);}}>
          <IconBase icon={faArrowLeft} className={"mr-1"}/>Back
        </Button>
        <DependencyAnalyserSubmitFileButton
          setPipelineWizardScreen={setPipelineWizardScreen}
          pipelineWizardModel={pipelineWizardModel}
          filteredFileCount={filteredFileCount}
          isLoading={isLoading}
        />
        <CancelButton size={"sm"} className={"ml-2"} cancelFunction={handleClose} />
      </SaveButtonContainer>
    </div>
  );
};

DependencyAnalyserFileValidationScreen.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default DependencyAnalyserFileValidationScreen;