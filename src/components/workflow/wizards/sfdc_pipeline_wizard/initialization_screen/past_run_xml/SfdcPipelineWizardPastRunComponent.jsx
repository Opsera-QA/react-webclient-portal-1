import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcPipelineWizardSubmitFileTypeButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardSubmitFileTypeButton";
import CancelButton from "components/common/buttons/CancelButton";
import axios from "axios";
import StandalonePackageXmlField from "components/common/fields/pipelines/sfdc/StandalonePackageXmlField";
import PipelineRunSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/run/PipelineRunSelectInput";
import SfdcPipelineWizardUploadComponentTypesRadioInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardUploadComponentTypesRadioInput";
import SfdcPipelineWizardIncludeDependenciesToggle
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardIncludeDependenciesToggle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SfdcPipelineWizardPastRunComponent(
  {
    pipelineWizardModel,
    setPipelineWizardModel,
    setPipelineWizardScreen,
    handleClose,
  }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    resetStoredFileContents();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const resetStoredFileContents = () => {
    let newDataObject = { ...pipelineWizardModel };
    newDataObject.setData("xmlFileContent", "");
    newDataObject.setData("csvFileContent", []);
    newDataObject.setData("isXml", false);
    newDataObject.setData("isCsv", false);
    newDataObject.setData("fromFileUpload", false);
    setPipelineWizardModel({ ...newDataObject });
  };

  const validateXml = (xml) => {
    let newDataObject = { ...pipelineWizardModel };
    newDataObject.setData("xmlFileContent", xml);
    newDataObject.setData("csvFileContent", []);
    newDataObject.setData("isXml", true);
    newDataObject.setData("fromFileUpload", true);
    setPipelineWizardModel({ ...newDataObject });
  };

  const getDependenciesToggle = () => {
    if (pipelineWizardModel?.getData("modifiedFilesOrigin") === "git") {
      return (
        <div>
          <SfdcPipelineWizardIncludeDependenciesToggle
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
          />
        </div>
      );
    }
  };

  const getBody = () => {
    if (pipelineWizardModel.getData("recordId") && pipelineWizardModel.getData("recordId").length > 0) {
      return (
        <Row>
          <Col xs={12}>
            <PipelineRunSelectInput
              model={pipelineWizardModel}
              setModel={setPipelineWizardModel}
              maximumRunCount={pipelineWizardModel?.getData("run_count") > 0 ? pipelineWizardModel?.getData("run_count") - 1 : undefined}
              disabled={isLoading}
            />
          </Col>
          <Col xs={12} sm={7}>
            <SfdcPipelineWizardUploadComponentTypesRadioInput
              pipelineWizardModel={pipelineWizardModel}
              setPipelineWizardModel={setPipelineWizardModel}
            />
          </Col>
          <Col xs={12} sm={5}>
            {getDependenciesToggle()}
          </Col>
          <Col xs={12}>
            <StandalonePackageXmlField
              runNumber={pipelineWizardModel?.getData("selectedRunNumber")}
              pipelineWizardModel={pipelineWizardModel}
              setXmlFunction={validateXml}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              className={"m-0"}
            />
          </Col>
          <Col xs={12}>
            <SaveButtonContainer>
              <SfdcPipelineWizardSubmitFileTypeButton
                pipelineWizardModel={pipelineWizardModel}
                setPipelineWizardScreen={setPipelineWizardScreen}
                isXml={true}
                isLoading={isLoading}
              />
              <CancelButton
                className={"ml-2"}
                showUnsavedChangesMessage={false}
                cancelFunction={handleClose}
                size={"sm"}
              />
            </SaveButtonContainer>
          </Col>
        </Row>
      );
    }
  };

  return (
    <div>
      {getBody()}
    </div>
  );
}

SfdcPipelineWizardPastRunComponent.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default SfdcPipelineWizardPastRunComponent;

