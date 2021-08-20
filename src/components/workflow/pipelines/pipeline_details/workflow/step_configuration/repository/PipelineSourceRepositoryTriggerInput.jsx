import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import EventBasedTriggerDetails
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/EventBasedTriggerDetails";
import PipelineSourceRepositorySecretInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/PipelineSourceRepositorySecretInput";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCodeCommit, faSpinner} from "@fortawesome/pro-light-svg-icons";
import SourceRepositoryActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/source-repository-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";

function PipelineSourceRepositoryEventBasedTriggerInput({className, model, setModel, disabled, pipeline, savePipelineFunction}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isRegisteringHook, setIsRegisteringHook] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const registerHook = async () => {
    setIsRegisteringHook(true);

    if (!model?.getData("service") || !model?.getData("accountId") || !model?.getData("repository")) {
      toastContext.showWarningDialog("WARNING: Data is missing from the repository account configuration.  Unable to register webhook.");
      return;
    }

    await savePipelineFunction(); //first save the settings, then trigger registration
    return await SourceRepositoryActions.registerHook(getAccessToken, cancelTokenSource, pipeline?.owner, pipeline?.pipelineId, model);
  };

  const getRegisterHookButton = () => {
    const branch = model?.getData("branch");
    console.log("branch: " + JSON.stringify(branch));
    if (branch != null && branch !== "") {
      return (
        <div className="w-100 text-right">
          <Button variant="outline-success" type="button" className="mt-2 ml-2" disabled={isRegisteringHook} size={"sm"}
                  onClick={() => {
                    registerHook(model);
                  }}>
            {isRegisteringHook ?
              <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Working</> :
              <><FontAwesomeIcon icon={faCodeCommit} className="mr-1" fixedWidth /> Register Webhook</>
            }

          </Button>
        </div>
      );
    }
  };

  const getDynamicFields = () => {
    if (model?.getData("trigger_active") === true) {
      return (
        <>
          {getRegisterHookButton()}
          <EventBasedTriggerDetails pipelineId={pipeline?._id} userId={pipeline?.owner}/>
          <PipelineSourceRepositorySecretInput
            model={model}
            setModel={setModel}
            visible={model.getData("service") !== "bitbucket"}
          />
        </>
      );
    }
  };

  return (
    <div className={className}>
      <BooleanToggleInput
        dataObject={model}
        setDataObject={setModel}
        fieldName={"trigger_active"}
        disabled={disabled}
      />
      {getDynamicFields()}
    </div>
  );
}

PipelineSourceRepositoryEventBasedTriggerInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  savePipelineFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  pipeline: PropTypes.object,
};

export default PipelineSourceRepositoryEventBasedTriggerInput;