import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import {informaticaRunParametersActions} from "components/workflow/run_assistants/informatica/informaticaRunParameters.actions";

const InformaticaPipelineRunAssistantInitializationScreen = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, pipeline, setError }) => {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [existingRecord, setExistingRecord] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(pipelineWizardModel, pipeline?.workflow?.plan, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipeline]);

  const loadData = async (newPipelineWizardModel, gitTaskData, plan, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await initializePipelineWizardRecord(newPipelineWizardModel, cancelSource);
    }
    catch (error) {
      console.error(error);
      // setError("Could not initialize Informatica Pipeline Assistant");
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };


  const initializePipelineWizardRecord = async (newPipelineWizardModel = pipelineWizardModel, cancelSource = cancelTokenSource) => {
    const result = await informaticaRunParametersActions.findExistingRunParametersRecordV2(getAccessToken, cancelSource, pipeline?._id);
    const existingRecord = result?.data;

    if (existingRecord) {
      setExistingRecord(existingRecord);
      newPipelineWizardModel.setData("recordId", existingRecord._id);
      setPipelineWizardModel({...newPipelineWizardModel});
    }
    else {
      await createNewPipelineWizardRecord(newPipelineWizardModel);
    }
  };

  const createNewPipelineWizardRecord = async (newPipelineWizardModel = pipelineWizardModel, moveToNextScreen) => {
    try {
      const response = await informaticaRunParametersActions.getNewRunParametersRecordV2(getAccessToken, cancelTokenSource, pipeline?._id);
      const newRecord = response?.data;

      if (newRecord) {
        newPipelineWizardModel.setData("recordId", newRecord._id);
        setPipelineWizardModel({...newPipelineWizardModel});
      }

      if (moveToNextScreen === true) {
        setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);
      }
    }
    catch (error) {
      console.error(error);
      setError("Could not create new Informatica Run Assistant record");
    }
  };

  const getBody = () => {
    if (isLoading || pipelineWizardModel == null) {
      return (
        <LoadingDialog message={"Initializing Informatica Pipeline Run Assistant"} size={"sm"} />
      );
    }

    return (
      <div>
        <SaveButtonContainer>
          <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading} onClick={() => createNewPipelineWizardRecord(undefined, true)}>
            <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Instance</span>
          </Button>
          <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
        </SaveButtonContainer>
      </div>
    );
  };

  return (
    <div>
      {getBody()}
    </div>
  );
};

InformaticaPipelineRunAssistantInitializationScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  pipeline: PropTypes.object,
  gitTaskData: PropTypes.object,
  setError: PropTypes.func
};

export default InformaticaPipelineRunAssistantInitializationScreen;
