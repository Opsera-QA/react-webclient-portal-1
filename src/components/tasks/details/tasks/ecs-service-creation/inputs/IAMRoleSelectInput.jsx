import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import ECSCreationActions from "../ecs-service-creation-actions";

function IAMRolesSelectInput({
                                   fieldName,
                                   dataObject,
                                   setDataObject,
                                   disabled,
                                   textField,
                                   valueField,
                               toolConfigId,
                                   region,
                                 }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [loadBalancers, setIAMRoless] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an IAM Role");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
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
  }, [toolConfigId, region]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTypes(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTypes = async (cancelSource) => {
    try {
      setIAMRoless([]);
      const res = await ECSCreationActions.getIAMRoles(dataObject, getAccessToken, cancelSource);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No IAM Roles Found");
          return;
        }
        setPlaceholder("Select an IAM Role");
        setIAMRoless(res.data);
        return;
      }
      setPlaceholder("No IAM Roles Found");
      setIAMRoless([]);
    } catch (error) {
      setPlaceholder("No IAM Roles Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={loadBalancers}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (loadBalancers == null || loadBalancers.length === 0))}
    />
  );
}

IAMRolesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolConfigId: PropTypes.string,
  region: PropTypes.string,
};

IAMRolesSelectInput.defaultProps = {
  fieldName: "ecsServiceExecutionRoleArn",
  textField: "roleName",
  valueField: "arn",
};

export default IAMRolesSelectInput;
