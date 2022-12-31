import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {Button} from "react-bootstrap";
import {faStepBackward} from "@fortawesome/pro-light-svg-icons";
import CancelButton from "components/common/buttons/CancelButton";
import SfdcPipelineWizardOriginOrganizationFilesTable
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/org_to_org/SfdcPipelineWizardOriginOrganizationFilesTable";
import SfdcPipelineWizardDestinationOrganizationFilesTable
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/org_to_org/SfdcPipelineWizardDestinationOrganizationFilesTable";
import {DialogToastContext} from "contexts/DialogToastContext";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import LoadingDialog from "components/common/status_notifications/loading";
import SfdcPipelineWizardSubmitSfdcFilesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSubmitSfdcFilesButton";
import SfdcPipelineWizardSfdcRulesInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSfdcRulesInput";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import IconBase from "components/common/icons/IconBase";

const SfdcPipelineWizardOrgToOrgFileSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, }) => {
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
      await pullOrgToOrgFiles(cancelSource);
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

  const pullOrgToOrgFiles = async (cancelSource = cancelTokenSource) => {
   await sfdcPipelineActions.triggerOrgToOrgFilesPullV2(getAccessToken, cancelSource, pipelineWizardModel);
  };

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog size={"sm"} message={"Requesting Files"} />;
    }

    return (
      <>
        <SfdcPipelineWizardSfdcRulesInput
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
          isLoading={isLoading}
          filePullCompleted={filePullCompleted}
        />
        <InlineWarning
          className={"ml-2"}
          warningMessage={"Warning: Use of the component or keyword search filter in the tables below will not alter the final filtered file list."}
        />
        <Row className="mt-2 d-flex" style={{minWidth: "1400px"}}>
          <Col xs={6} className={"pr-1"} style={{minWidth: "675px"}}>
            <SfdcPipelineWizardOriginOrganizationFilesTable
              pipelineWizardModel={pipelineWizardModel}
              setFilteredFileCount={setFilteredFileCount}
              setPipelineWizardModel={setPipelineWizardModel}
              setFilePullCompleted={setFilePullCompleted}
              filePullCompleted={filePullCompleted}
            />
          </Col>
          <Col xs={6} className={"pl-1"} style={{minWidth: "675px"}}>
            <SfdcPipelineWizardDestinationOrganizationFilesTable pipelineWizardModel={pipelineWizardModel} />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div>
      <div className="h5">Salesforce Pipeline Run: File Selection for {pipelineWizardModel?.getArrayData("selectedComponentTypes")?.length} Components</div>
      <div className="text-muted mb-2">
        Select which files will have changes impacted in this pipeline run by using filter rules.
      </div>
      {getBody()}
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => {setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);}}>
          <IconBase icon={faStepBackward} className={"mr-1"}/>Back
        </Button>
        <SfdcPipelineWizardSubmitSfdcFilesButton
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

SfdcPipelineWizardOrgToOrgFileSelector.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default SfdcPipelineWizardOrgToOrgFileSelector;