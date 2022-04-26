import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faKey} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import jenkinsAccountActions
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/accounts/jenkinsToolAccounts.actions";

function RotateJenkinsKeyButton ({toolId}){
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isRotatingKey, setIsRotatingKey] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
  }, [toolId]);

  const rotateKey = async () => {
    try {
      setIsRotatingKey(true);
      await jenkinsAccountActions.rotateJenkinsKey(getAccessToken, cancelTokenSource, toolId);
      toastContext.showUpdateSuccessResultDialog("Jenkins Token");
    } 
    catch (error) {
      toastContext.showUpdateFailureResultDialog("Jenkins Token", error);
    }
    finally {
      if (isMounted.current === true) {
        setIsRotatingKey(false);
      }
    }
  };

  return (
    <Button size={"md"} variant="primary" disabled={isRotatingKey} onClick={() => rotateKey()} >
      <span><IconBase icon={faKey} fixedWidth className="mr-2"/>{"Generate Token"}</span>
    </Button>
  );
}

RotateJenkinsKeyButton.propTypes = {
  toolId: PropTypes.string,
};

export default RotateJenkinsKeyButton;