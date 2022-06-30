import React, { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import { parseError } from "components/common/helpers/error-helpers";
import SapCpqRunAssistantMigrationObjectList from "components/workflow/run_assistants/sap_cpq/migration_object_selection_screen/SapCpqRunAssistantMigrationObjectList";
import { SAP_CPQ_RUN_ASSISTANT_SCREENS } from "components/workflow/run_assistants/sap_cpq/SapCpqPipelineRunAssistant";
import BackButton from "components/common/buttons/back/BackButton";
import SapCpqRunAssistantSubmitMigrationObjectsButton from "components/workflow/run_assistants/sap_cpq/migration_object_selection_screen/SapCpqRunAssistantSubmitMigrationObjectsButton";
import { sapCpqRunParametersActions } from "components/workflow/run_assistants/sap_cpq/sapCpqRunParameters.actions";

const SapCpqRunAssistantMigrationObjectSelector = ({
  sapCpqRunParametersModel,
  setSapCpqRunParametersModel,
  setRunAssistantScreen,
  closePanelFunction,
  startPipelineRunFunction,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [migrationObjectErrorMessage, setMigrationObjectErrorMessage] =
    useState("");
  const [migrationObjects, setMigrationObjects] = useState([]);
  const [migrationObjectPullCompleted, setMigrationObjectPullCompleted] =
    useState(false);
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
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setMigrationObjectErrorMessage("");
      await migrationObjectPolling(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const migrationObjectPolling = async (
    cancelSource = cancelTokenSource,
    count = 1,
  ) => {
    if (isMounted?.current !== true) {
      return;
    }

    const migrationObjectList = await getMigrationObjects(cancelSource);

    if (
      !Array.isArray(migrationObjectList) &&
      count <= 5 &&
      migrationObjectPullCompleted === false
    ) {
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, 15000)));
      return await migrationObjectPolling(cancelSource, count + 1);
    }
  };

  const getMigrationObjects = async (cancelSource = cancelTokenSource) => {
    const response = await sapCpqRunParametersActions.getMigrationObjectsV2(
      getAccessToken,
      cancelSource,
      sapCpqRunParametersModel.getData("recordId"),
    );
    const data = response?.data;

    if (isMounted?.current === true && data) {
      const files = data.data;

      if (data?.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching Migration Objects From SAP: ${parsedError}`,
        );
      }

      if (data.warning) {
        setMigrationObjectErrorMessage(data.warning);
      }

      if (Array.isArray(files)) {
        const indexedFiles = files.map((item, id) =>
          Object.assign(item, { id }),
        );

        setSapCpqRunParametersModel({ ...sapCpqRunParametersModel });
        setMigrationObjects(indexedFiles);
        setIsLoading(false);
        setMigrationObjectPullCompleted(true);
      }
    }

    return data?.data;
  };

  return (
    <div>
      <InlineWarning
        warningMessage={migrationObjectErrorMessage}
        className="pl-3"
      />
      <SapCpqRunAssistantMigrationObjectList
        migrationObjects={migrationObjects}
        sapCpqRunParametersModel={sapCpqRunParametersModel}
        setSapCpqRunParametersModel={setSapCpqRunParametersModel}
        loadDataFunction={loadData}
        isLoading={isLoading}
        migrationObjectPullCompleted={migrationObjectPullCompleted}
      />
      <SaveButtonContainer>
        <BackButton
          variant={"secondary"}
          backButtonFunction={() => {
            setRunAssistantScreen(
              SAP_CPQ_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN,
            );
          }}
          isLoading={isLoading}
        />
        <SapCpqRunAssistantSubmitMigrationObjectsButton
          setRunAssistantScreen={setRunAssistantScreen}
          sapCpqRunParametersModel={sapCpqRunParametersModel}
          selectedMigrationObjectCount={
            sapCpqRunParametersModel?.getArrayData("selectedFiles")?.length
          }
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

SapCpqRunAssistantMigrationObjectSelector.propTypes = {
  sapCpqRunParametersModel: PropTypes.object,
  setSapCpqRunParametersModel: PropTypes.func,
  setRunAssistantScreen: PropTypes.func,
  closePanelFunction: PropTypes.func,
  startPipelineRunFunction: PropTypes.func,
};

export default SapCpqRunAssistantMigrationObjectSelector;
