import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
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

function SfdcPipelineWizardPastRunComponent({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) {
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
    let newDataObject = {...pipelineWizardModel};
    newDataObject.setData("xmlFileContent", "");
    newDataObject.setData("csvFileContent", []);
    newDataObject.setData("isXml", false);
    newDataObject.setData("isCsv", false);
    newDataObject.setData("fromFileUpload", false);
    setPipelineWizardModel({...newDataObject});
  };

  const validateXml = (xml) => {
    let newDataObject = {...pipelineWizardModel};
    newDataObject.setData("xmlFileContent", xml);
    newDataObject.setData("csvFileContent", []);
    newDataObject.setData("isXml", true);
    newDataObject.setData("fromFileUpload", true);
    setPipelineWizardModel({...newDataObject});
  };

  const getXMLView = () => {
    return (
      <>
        <StandalonePackageXmlField
          runNumber={pipelineWizardModel?.getData("selectedRunNumber")}
          pipelineWizardModel={pipelineWizardModel}
          setXmlFunction={validateXml}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        {buttonContainer()}
      </>
    );
  };

  const buttonContainer = () => {
    return (
      <SaveButtonContainer>
        <SfdcPipelineWizardSubmitFileTypeButton
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          isXml={true}
          isLoading={isLoading}
        />
        <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
      </SaveButtonContainer>
    );
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
        <div>
          <div className="my-4 w-100">
            <div className="my-3">
              <PipelineRunSelectInput
                model={pipelineWizardModel}
                setModel={setPipelineWizardModel}
                maximumRunCount={pipelineWizardModel?.getData("run_count") > 0 ? pipelineWizardModel?.getData("run_count") - 1 : undefined}
                disabled={isLoading}
              />
            </div>
            <div className="my-3">
              <SfdcPipelineWizardUploadComponentTypesRadioInput
                pipelineWizardModel={pipelineWizardModel}
                setPipelineWizardModel={setPipelineWizardModel}
              />
            </div>
            {getDependenciesToggle()}
          </div>
          {getXMLView()}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="my-2">
        Select a past run to use its XML for deployment.
      </div>
      {getBody()}
    </div>
  );
}

SfdcPipelineWizardPastRunComponent.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen : PropTypes.func,
  handleClose : PropTypes.func,
};

export default SfdcPipelineWizardPastRunComponent;

