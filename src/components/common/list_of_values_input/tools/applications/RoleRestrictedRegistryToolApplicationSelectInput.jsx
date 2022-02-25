import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";

function RoleRestrictedRegistryToolApplicationSelectInput(
  {
    toolId,
    visible,
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    disabled,
    valueField,
    textField,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;


    setApplications([]);
    if (hasStringValue(toolId)) {
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
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadApplications(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadApplications = async (cancelSource = cancelTokenSource) => {
    // TODO: Make route that actually just returns applications
    const response = await toolsActions.getRoleLimitedToolApplicationsByToolIdV2(getAccessToken, cancelSource, toolId);
    const applications = response?.data?.data;
    const existingApplication = model?.getData(fieldName);

    if (Array.isArray(applications) && applications.length > 0) {
      setApplications(applications);

      if (hasStringValue(existingApplication)) {
        const foundApplication = applications.find((x) => x._id === existingApplication);
        if (foundApplication == null) {
          setErrorMessage(`
              The previously saved application is no longer available. 
              It may have been deleted or the Tool's access rules may have been updated. 
              Please select another application from the list or recreate the application in Tool Registry.
            `
          );
        }
      }
    }
  };

  const getPlaceholderText = () => {
    if (!isLoading && (!Array.isArray(applications) || applications.length === 0 && hasStringValue(toolId) === true)) {
      return (`No configured Applications have been registered for this Tool.`);
    }

    return ("Select Application");
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={applications}
      placeholderText={getPlaceholderText()}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
      errorMessage={errorMessage}
    />
  );
}

RoleRestrictedRegistryToolApplicationSelectInput.propTypes = {
  toolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  configurationRequired: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  valueField: PropTypes.string,
  textField: PropTypes.string,
};

RoleRestrictedRegistryToolApplicationSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
};

export default RoleRestrictedRegistryToolApplicationSelectInput;