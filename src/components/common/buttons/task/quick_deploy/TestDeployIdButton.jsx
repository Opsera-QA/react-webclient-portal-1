import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faPlug} from "@fortawesome/pro-light-svg-icons";
import {faExclamationTriangle} from "@fortawesome/pro-solid-svg-icons/faExclamationTriangle";
import {AuthContext} from "contexts/AuthContext";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";
import {parseError} from "components/common/helpers/error-helpers";
import taskActions from "../../../../tasks/task.actions";

function TestDeployIdButton({ taskModel, report, setReport, disabled }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isValidating, setIsValidating] = useState(false);
  const [successfulValidation, setSuccessfulValidation] = useState(false);
  const [failedValidation, setFailedValidation] = useState(false);
  const [showReport, setShowReport] = useState(false);
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
  }, []);

  const validate = async () => {
    try {
      setShowReport(true);
      setIsValidating(true);
      setSuccessfulValidation(false);
      setFailedValidation(false);

      const response = await taskActions.validateDeployId(getAccessToken, cancelTokenSource, taskModel);

      if (response?.data?.status === 200) {
        const message = JSON.stringify(response?.data?.message);
        const status = response?.status;

      setReport(response?.data?.message?.deployResult);
        setSuccessfulValidation(true);
      }
      else {
        const message = JSON.stringify(response?.data?.message);
        let status = response?.status;

        setReport({});

        setFailedValidation(true);
      }
    }
    catch (error) {
      const parsedError = parseError(error);

      setReport({});

      setFailedValidation(true);
    }
    finally {
      if (isMounted.current === true) {
        setIsValidating(false);
      }
    }
  };

  const getVariant = () => {
    if (successfulValidation) {
      return "success";
    }

    if (failedValidation) {
      return "danger";
    }

    return ("secondary");
  };

  const getLabel = () => {
    if (isValidating) {
      return (
        <span>
          <IconBase isLoading={isValidating} className={"mr-2"}/>
          validating
        </span>
      );
    }

    if (failedValidation) {
      return (
        <span>
          <IconBase icon={faExclamationTriangle} className={"mr-2"}/>
          Validation Failed!
        </span>
      );
    }

    if (successfulValidation) {
      return (
        <span>
          <IconBase icon={faPlug} className={"mr-2"} />
          Validation Succeeded!
        </span>
      );
    }

    return (
      <span>
        <IconBase icon={faPlug} className={"mr-2"}/>
        Validate Deploy Key
      </span>
    );
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <div className="py-lg-5">
        <Button
          size="sm"
          variant={getVariant()}
          disabled={isValidating === true || disabled === true}
          onClick={() => validate()}
        >
          {getLabel()}
        </Button>
    </div>
  );
}

TestDeployIdButton.propTypes = {
  taskModel: PropTypes.object,
  report: PropTypes.object,
  setReport: PropTypes.func,
  disabled: PropTypes.bool
};

export default TestDeployIdButton;