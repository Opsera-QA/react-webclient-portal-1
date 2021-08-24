import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faPlug, faCodeCommit, faCheckCircle} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import toolsActions from "components/inventory/tools/tools-actions";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import SourceRepositoryActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/repository/source-repository-actions";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";

function RegisterSourceRepositoryHookButton({ model, disable, pipeline, branch, className, savePipelineFunction }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [successfulConnection, setSuccessfulConnection] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);
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
    try {
      setIsRegisteringHook(true);
      setSuccessfulConnection(false);
      setFailedConnection(false);

      await savePipelineFunction();
      const response = await SourceRepositoryActions.registerHook(getAccessToken, cancelTokenSource, pipeline?.owner, pipeline?.pipelineId, model);

      if (response && response.data != null && response.data.status === 200) {
        setSuccessfulConnection(true);
      }
      else {
        setFailedConnection(true);
      }
    }
    catch (error) {
      setFailedConnection(true);
    }
    finally {
      setIsRegisteringHook(false);
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
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Registering Webhook</span>);
    }

    if (failedConnection) {
      return (<span><FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" fixedWidth/>Registering Webhook Failed!</span>);
    }

    if (successfulConnection) {
      return (<span><FontAwesomeIcon icon={faCheckCircle} className="mr-2" fixedWidth/>Registering Webhook Succeeded!</span>);
    }

    return (<span><FontAwesomeIcon icon={faPlug} fixedWidth className="mr-2"/>Register Webhook</span>);
  };

  if (branch == null || branch === "" || savePipelineFunction == null || model == null) {
    return null;
  }

  return (
    <div className={className}>
      <TooltipWrapper innerText={"This is an option feature that can register the web hook."}>
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
  branch: PropTypes.string,
  savePipelineFunction: PropTypes.func,
};

export default RegisterSourceRepositoryHookButton;
