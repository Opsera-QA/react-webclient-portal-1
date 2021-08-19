import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcPipelineWizardSubmitFileTypeButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardSubmitFileTypeButton";
import CancelButton from "components/common/buttons/CancelButton";
import axios from "axios";
import StandalonePackageXmlField from "components/common/fields/pipelines/sfdc/StandalonePackageXmlField";
import PipelineRunNumberInput from "components/common/inputs/number/pipelines/PipelineRunNumberInput";

function SfdcPipelineWizardPastRunComponent({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
    setPipelineWizardModel({...newDataObject});
  };

  const validateXml = (xml) => {
    let newDataObject = {...pipelineWizardModel};
    newDataObject.setData("xmlFileContent", xml);
    newDataObject.setData("csvFileContent", []);
    setPipelineWizardModel({...newDataObject});
  };

  const getXMLView = () => {
    return (
      <>
        <StandalonePackageXmlField
          runNumber={pipelineWizardModel?.getData("selectedRunNumber")}
          pipelineWizardModel={pipelineWizardModel}
          setXmlFunction={validateXml}
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
        />
        <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
      </SaveButtonContainer>
    );
  };

  const getBody = () => {
    if (pipelineWizardModel.getData("recordId") && pipelineWizardModel.getData("recordId").length > 0) {
      return (
        <div>
          <div className="my-4 w-100">
            <div className="my-3">
              <PipelineRunNumberInput
                model={pipelineWizardModel}
                setModel={setPipelineWizardModel}
                maximumRunCount={pipelineWizardModel?.getData("run_count") > 0 ? pipelineWizardModel?.getData("run_count") : undefined}
              />
            </div>
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

