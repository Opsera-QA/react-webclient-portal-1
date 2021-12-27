import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import {informaticaRunParametersActions} from "components/workflow/run_assistants/informatica/informaticaRunParameters.actions";
import {pipelineHelpers} from "components/common/helpers/pipelines/pipeline.helpers";
import {INFORMATICA_RUN_ASSISTANT_SCREENS} from "components/workflow/run_assistants/informatica/InformaticaPipelineRunAssistant";

const InformaticaPipelineRunAssistantInitializationScreen = (
  {
    informaticaRunParametersModel,
    setInformaticaRunParametersModel,
    setRunAssistantScreen,
    pipeline,
    setError,
  }) => {
  const { getAccessToken } = useContext(AuthContext);
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
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipeline]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const runAssistantRecord = await getRunAssistantRecord(cancelSource);
      await initializeRunAssistantRecord(runAssistantRecord);
    }
    catch (error) {
      console.error(error);
      setError("Could not initialize Informatica Pipeline Assistant");
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRunAssistantRecord = async (cancelSource = cancelTokenSource) => {
    const response = await informaticaRunParametersActions.findExistingRunParametersRecordV2(getAccessToken, cancelSource, pipeline?._id);
    const existingRecord = response?.data?.data;

    if (existingRecord) {
      return existingRecord;
    }
    else {
      return await createNewRunAssistantRecord();
    }
  };

  const createNewRunAssistantRecord = async () => {
    try {
      const response = await informaticaRunParametersActions.getNewRunParametersRecordV2(getAccessToken, cancelTokenSource, pipeline?._id);
      return response?.data?.data;
    }
    catch (error) {
      console.error(error);
      setError("Could not create new Informatica Run Assistant record");
    }
  };

  const initializeRunAssistantRecord = async (pipelineStorageRecord) => {
    if (pipelineStorageRecord == null) {
      setError("Could not find an existing or create a new Informatica Run Assistant record");
      return;
    }

    const step = pipelineHelpers.findFirstStepWithIdentifier(pipeline, "informatica");
    if (step == null) {
      setError(
        "Warning, this pipeline is missing the default Informatica Step needed. Please edit the workflow and add the Informatica step in order to run this pipeline."
      );
      return;
    }

    informaticaRunParametersModel.setData("recordId", pipelineStorageRecord?._id);
    informaticaRunParametersModel.setData("stepId", step?._id);

    if (Array.isArray(pipelineStorageRecord?.configurations) && pipelineStorageRecord?.configurations?.length > 0) {
      informaticaRunParametersModel.setData("configurations", pipelineStorageRecord?.configurations);
    }

    if (typeof pipelineStorageRecord?.selectedConfigurationIndex === "number") {
      informaticaRunParametersModel.setData("selectedConfigurationIndex", pipelineStorageRecord?.selectedConfigurationIndex);
    }

    setInformaticaRunParametersModel({...informaticaRunParametersModel});
    setRunAssistantScreen(INFORMATICA_RUN_ASSISTANT_SCREENS.CONFIGURATION_SELECTION_SCREEN);
  };

  const getBody = () => {
    if (isLoading || informaticaRunParametersModel == null) {
      return (
        <LoadingDialog message={"Initializing Informatica Pipeline Run Assistant"} size={"sm"} />
      );
    }
    return (
      <div>
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
  setRunAssistantScreen: PropTypes.func,
  handleClose: PropTypes.func,
  informaticaRunParametersModel: PropTypes.object,
  setInformaticaRunParametersModel: PropTypes.func,
  pipeline: PropTypes.object,
  setError: PropTypes.func
};

export default InformaticaPipelineRunAssistantInitializationScreen;
