import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSpinner, faPlug, faCodeCommit, faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import SourceRepositoryActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/source-repository-actions";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
import { hasStringValue } from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

function RegisterSourceRepositoryHookButton({ model, disable, pipeline, className, savePipelineFunction }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);
  const [isRegisteringHook, setIsRegisteringHook] = useState(false);
  const { cancelTokenSource, isMounted} = useComponentStateReference();

  const registerHook = async () => {
    try {
      setIsRegisteringHook(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);

      await savePipelineFunction();
      const response = await SourceRepositoryActions.registerHook(getAccessToken, cancelTokenSource, pipeline?.owner, pipeline?._id, model);

      if (isMounted?.current === true) {
        if (response?.data?.status === 200) {
          setSuccessfulConnection(true);
        } else {
          setFailedConnection(true);
        }
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        setFailedConnection(true);
        toastContext.showFormErrorToast(error, "Error Registering Webhook:");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsRegisteringHook(false);
      }
    }
  };

  const getVariant = () => {
    if (successfulConnection) {
      return "success";
    }

    if (failedConnection) {
      return "danger";
    }

    return ("outline-success");
  };

  const getLabel = () => {
    if (isRegisteringHook) {
      return (<span><LoadingIcon className={"mr-2"}/>Registering Webhook</span>);
    }

    if (failedConnection) {
      return (<span><IconBase icon={faExclamationTriangle} className={"mr-2"}/>Registering Webhook Failed!</span>);
    }

    if (successfulConnection) {
      return (<span><IconBase icon={faCheckCircle} className={"mr-2"}/>Registering Webhook Succeeded!</span>);
    }

    return (<span><IconBase icon={faPlug} fixedWidth className={"mr-2"}/>Register Webhook</span>);
  };

  if (model == null || hasStringValue(model?.getData("branch")) !== true || savePipelineFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"This is an option feature that can register the webhook."}>
        <Button variant={getVariant()} disabled={disable || isRegisteringHook} size={"sm"} onClick={() => {registerHook(model);}}>
          {getLabel()}
        </Button>
      </TooltipWrapper>
    </div>
  );
}

RegisterSourceRepositoryHookButton.propTypes = {
  pipeline: PropTypes.object,
  model: PropTypes.object,
  disable: PropTypes.bool,
  className: PropTypes.string,
  savePipelineFunction: PropTypes.func,
};

export default RegisterSourceRepositoryHookButton;
