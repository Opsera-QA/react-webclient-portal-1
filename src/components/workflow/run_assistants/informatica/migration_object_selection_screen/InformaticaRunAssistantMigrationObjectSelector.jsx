import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStepBackward} from "@fortawesome/free-solid-svg-icons";
import CancelButton from "components/common/buttons/CancelButton";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import SfdcPipelineWizardSubmitSfdcFilesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSubmitSfdcFilesButton";
import {parseError} from "components/common/helpers/error-helpers";
import {informaticaRunParametersActions} from "components/workflow/run_assistants/informatica/informaticaRunParameters.actions";

const InformaticaRunAssistantMigrationObjectSelector = (
  { 
    informaticaRunParametersModel, 
    setInformaticaRunParametersModel, 
    setRunAssistantScreen, 
    closePanelFunction, 
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [migrationObjectErrorMessage, setMigrationObjectErrorMessage] = useState("");
  const [migrationObjects, setMigrationObjects] = useState([]);
  const [migrationObjectPullCompleted, setMigrationObjectPullCompleted] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  let timerIds = [];

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
      stopPolling();
    };
  }, []);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setMigrationObjectErrorMessage("");
      await migrationObjectPolling(cancelSource);
    }
    catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const migrationObjectPolling = async (cancelSource = cancelTokenSource, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const sfdcCommitList = await getMigrationObjects(cancelSource);

    if (!Array.isArray(sfdcCommitList) && count <= 5 && migrationObjectPullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await migrationObjectPolling(cancelSource, count + 1);
    }
  };

  const getMigrationObjects = async (cancelSource = cancelTokenSource) => {
    const response = await informaticaRunParametersActions.getMigrationObjectsV2(getAccessToken, cancelSource, informaticaRunParametersModel.getData("recordId"));
    const data = response?.data;

    if (isMounted?.current === true && data) {
      const files = data.data;
      console.log("files: " + JSON.stringify(files));

      if (data?.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(`Service Error Fetching Migration Objects From Informatica: ${parsedError}`);
      }

      if (data.warning) {
        setMigrationObjectErrorMessage(data.warning);
      }

      if (Array.isArray(files)) {
        setInformaticaRunParametersModel({...informaticaRunParametersModel});
        setMigrationObjects(files);
        setIsLoading(false);
        setMigrationObjectPullCompleted(true);
      }
    }

    return data?.data;
  };

  return (
    <div>
      <InlineWarning warningMessage={migrationObjectErrorMessage} className="pl-3" />
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => {setRunAssistantScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);}}>
          <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back
        </Button>
        <SfdcPipelineWizardSubmitSfdcFilesButton
          setRunAssistantScreen={setRunAssistantScreen}
          informaticaRunParametersModel={informaticaRunParametersModel}
          isLoading={isLoading}
        />
        <CancelButton size={"sm"} className={"ml-2"} cancelFunction={closePanelFunction} />
      </SaveButtonContainer>
    </div>
  );
};

InformaticaRunAssistantMigrationObjectSelector.propTypes = {
  informaticaRunParametersModel: PropTypes.object,
  setInformaticaRunParametersModel: PropTypes.func,
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
};

export default InformaticaRunAssistantMigrationObjectSelector;