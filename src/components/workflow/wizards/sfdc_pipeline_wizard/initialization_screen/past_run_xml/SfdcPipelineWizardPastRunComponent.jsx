import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcPipelineWizardSubmitFileTypeButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardSubmitFileTypeButton";
import CancelButton from "components/common/buttons/CancelButton";
import XmlFieldBase from "components/common/fields/code/XmlFieldBase";
import InlinePipelineRunFilter
  from "components/common/filters/pipelines/activity_logs/pipeline_run/InlinePipelineRunFilter";
import blueprintsActions from "components/blueprint/blueprints-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";

function SfdcPipelineWizardPastRunComponent({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
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
    if (pipelineWizardModel.getData("xmlFileContent") && pipelineWizardModel.getData("xmlFileContent").length > 0) {
      return (
        <>
          <XmlFieldBase fieldName={"xmlFileContent"} model={pipelineWizardModel}/>
          {buttonContainer()}
        </>
      );
    }
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

  const pullXmlFromRun = async (newPipelineWizardModel) => {
    const response = await blueprintsActions.getBlueprintSearchResultsManual(getAccessToken, cancelTokenSource, newPipelineWizardModel.getData("pipelineId"), newPipelineWizardModel.getData("selectedRunNumber"));
    console.log("response: " + JSON.stringify(response));
  };

  const getValidateButton = () => {
    if (pipelineWizardModel.getData("xmlFileContent").length === 0 && pipelineWizardModel.getData("csvFileContent").length === 0) {
      return (
        <Button variant="primary" className={"mt-3"} onClick={() => validateXml()}>Process File</Button>
      );
    }
  };

  const getBody = () => {
    if (pipelineWizardModel.getData("recordId") && pipelineWizardModel.getData("recordId").length > 0) {
      return (
        <div>
          <div className="my-4 w-100">
            <div className="my-3">
              <InlinePipelineRunFilter
                model={pipelineWizardModel}
                setModel={setPipelineWizardModel}
                maximumRunCount={pipelineWizardModel?.getData("run_count") > 0 ? pipelineWizardModel?.getData("run_count") : undefined}
                showLabel={true}
                loadData={pullXmlFromRun}
              />
            </div>
            {getValidateButton()}
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

