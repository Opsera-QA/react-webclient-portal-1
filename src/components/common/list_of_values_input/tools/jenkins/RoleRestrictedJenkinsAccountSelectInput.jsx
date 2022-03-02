import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";
import IconBase from "components/common/icons/IconBase";

// TODO: Refactor
function RoleRestrictedJenkinsAccountSelectInput(
  {
    jenkinsToolId,
    visible,
    fieldName,
    placeholderText,
    dataObject,
    setDataObject,
    setDataFunction,
    clearDataFunction,
    disabled,
    className,
    textField,
    valueField,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsAccounts, setJenkinsAccounts] = useState([]);
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

    setJenkinsAccounts([]);

    if (jenkinsToolId !== "" && jenkinsToolId != null) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [jenkinsToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTools(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog("Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry.");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, jenkinsToolId);
    const tool = response?.data?.data;

    if (isMounted?.current === true && tool) {
      const jenkinsAccounts = tool?.accounts;

      if (Array.isArray(jenkinsAccounts)) {
        setJenkinsAccounts(jenkinsAccounts);
      }
    }
  };

  const getNoAccountsMessage = () => {
    if (!isLoading && (jenkinsAccounts == null || jenkinsAccounts.length === 0 && jenkinsToolId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <IconBase icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No configured Jenkins Accounts have been registered for this <span className="upper-case-first">Jenkins</span> tool.
        </div>
      );
    }
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <div className={className}>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={jenkinsAccounts}
        busy={isLoading}
        placeholderText={placeholderText}
        valueField={valueField}
        textField={textField}
        clearDataFunction={clearDataFunction}
        disabled={disabled}
        groupBy={"service"}
      />
      {getNoAccountsMessage()}
    </div>
  );
}

RoleRestrictedJenkinsAccountSelectInput.propTypes = {
  jenkinsToolId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  placeholderText: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  typeFilter: PropTypes.string,
  configurationRequired: PropTypes.bool,
  className: PropTypes.string,
  clearDataFunction: PropTypes.func,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

RoleRestrictedJenkinsAccountSelectInput.defaultProps = {
  textField: "gitCredential",
  valueField: "gitCredential",
};

export default RoleRestrictedJenkinsAccountSelectInput;