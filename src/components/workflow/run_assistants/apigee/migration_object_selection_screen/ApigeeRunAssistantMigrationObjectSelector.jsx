import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {parseError} from "components/common/helpers/error-helpers";
import {apigeeRunParametersActions} from "components/workflow/run_assistants/apigee/apigeeRunParameters.actions";
import {APIGEE_RUN_ASSISTANT_SCREENS} from "components/workflow/run_assistants/apigee/ApigeePipelineRunAssistant";
import ApigeeRunAssistantMigrationObjectList
  from "components/workflow/run_assistants/apigee/migration_object_selection_screen/ApigeeRunAssistantMigrationObjectList";
import ApigeeRunAssistantSubmitMigrationObjectsButton
  from "components/workflow/run_assistants/apigee/migration_object_selection_screen/ApigeeRunAssistantSubmitMigrationObjectsButton";
import BackButton from "components/common/buttons/back/BackButton";
import ApigeeMigrationObjectVersionSelectionPanel from "./ApigeeMigrationObjectVersionSelectionPanel";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {UPDATE_MODE_VALUES} from "./apigeeMigrationObject.constants";
import ApigeeMigrationObjectKvmEntriesPanel from "./ApigeeMigrationObjectKvmEntriesPanel";

const ApigeeRunAssistantMigrationObjectSelector = (
  { 
    apigeeRunParametersModel, 
    setApigeeRunParametersModel, 
    setRunAssistantScreen, 
    closePanelFunction,
    startPipelineRunFunction,
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [migrationObjectErrorMessage, setMigrationObjectErrorMessage] = useState("");
  const [migrationObjects, setMigrationObjects] = useState([]);
  const [migrationObjectPullCompleted, setMigrationObjectPullCompleted] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [updateModeValue, setUpdateModeValue] = useState("");
  const [migrationObject, setMigrationObject] = useState(null);

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

    const migrationObjectList = await getMigrationObjects(cancelSource);

    if (!Array.isArray(migrationObjectList) && count <= 5 && migrationObjectPullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await migrationObjectPolling(cancelSource, count + 1);
    }
  };

  const getMigrationObjects = async (cancelSource = cancelTokenSource) => {
    const response = await apigeeRunParametersActions.getMigrationObjects(getAccessToken, cancelSource, apigeeRunParametersModel.getData("recordId"));
    
    const data = response?.data;

    if (isMounted?.current === true && data) {
      const files = data.data;

      if (data?.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(`Service Error Fetching Migration Objects From Apigee: ${parsedError}`);
      }

      if (data.warning) {
        setMigrationObjectErrorMessage(data.warning);
      }

      if (Array.isArray(files)) {
        setApigeeRunParametersModel({...apigeeRunParametersModel});
        setMigrationObjects(files.filter(file => file != null));
        setIsLoading(false);
        setMigrationObjectPullCompleted(true);
      }
    }

    return data?.data;
  };

  const updateVersionHandler = (newOption) => {
    const dataObj = {...apigeeRunParametersModel};
    const migrationObjArray = apigeeRunParametersModel.getData("selectedMigrationObjects");
    migrationObjArray.push(newOption);
    dataObj.setData("selectedMigrationObjects", migrationObjArray);
    setApigeeRunParametersModel({...dataObj});
    setUpdateModeValue("");
  };

  const updateKvmEntriesHandler = (kvmEntries) => {
    const dataObj = {...apigeeRunParametersModel};
    const migrationObjArray = apigeeRunParametersModel.getData("selectedMigrationObjects");
    let newMigrationObject = {...migrationObject};
    newMigrationObject.setData("kvmEntries", kvmEntries);
    setMigrationObject({...newMigrationObject});
    migrationObjArray.push(newMigrationObject.getPersistData());
    dataObj.setData("selectedMigrationObjects", migrationObjArray);
    setApigeeRunParametersModel({...dataObj});
    setUpdateModeValue("");
  };

  const cancelHandler = () => {
    setUpdateModeValue("");
  };

  const getVersionSelectForm = () => {
    if (hasStringValue(updateModeValue) && updateModeValue === UPDATE_MODE_VALUES.VERSION) {
      return (
        <ApigeeMigrationObjectVersionSelectionPanel 
          toolId={apigeeRunParametersModel?.getData("toolId")}
          handler={updateVersionHandler}
          cancelHandler={cancelHandler}
          migrationObject={migrationObject}
          setMigrationObject={setMigrationObject}
        />
      );
    }
  };

  const getKvmEntriesForm = () => {
    if (hasStringValue(updateModeValue) && updateModeValue === UPDATE_MODE_VALUES.KVM) {
      return (
        <ApigeeMigrationObjectKvmEntriesPanel 
          toolId={apigeeRunParametersModel?.getData("toolId")}
          handler={updateKvmEntriesHandler}
          cancelHandler={cancelHandler}
          migrationObject={migrationObject}
          setMigrationObject={setMigrationObject}
        />
      );
    }
  };

  return (
    <div>
      {getVersionSelectForm()}
      {getKvmEntriesForm()}
      <InlineWarning warningMessage={migrationObjectErrorMessage} className="pl-3" />
      <ApigeeRunAssistantMigrationObjectList
        migrationObjects={migrationObjects}
        apigeeRunParametersModel={apigeeRunParametersModel}
        setApigeeRunParametersModel={setApigeeRunParametersModel}
        loadDataFunction={loadData}
        isLoading={isLoading}
        migrationObjectPullCompleted={migrationObjectPullCompleted}
        updateModeValue={updateModeValue}
        setUpdateModeValue={setUpdateModeValue}
        migrationObject={migrationObject}
        setMigrationObject={setMigrationObject}
      />
      <SaveButtonContainer>
        <BackButton
          variant={"secondary"}
          backButtonFunction={() => {setRunAssistantScreen(APIGEE_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN);}}
          isLoading={isLoading}
        />
        <ApigeeRunAssistantSubmitMigrationObjectsButton
          setRunAssistantScreen={setRunAssistantScreen}
          apigeeRunParametersModel={apigeeRunParametersModel}
          selectedMigrationObjectCount={apigeeRunParametersModel?.getArrayData("selectedMigrationObjects")?.length}
          isLoading={isLoading}
          startPipelineRunFunction={startPipelineRunFunction}
          closePanelFunction={closePanelFunction}
          className={"ml-2"}
        />
        <CancelButton
          size={"sm"}
          className={"ml-2"}
          cancelFunction={closePanelFunction}
        />
      </SaveButtonContainer>
    </div>
  );
};

ApigeeRunAssistantMigrationObjectSelector.propTypes = {
  apigeeRunParametersModel: PropTypes.object,
  setApigeeRunParametersModel: PropTypes.func,
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  startPipelineRunFunction: PropTypes.func,
};

export default ApigeeRunAssistantMigrationObjectSelector;
