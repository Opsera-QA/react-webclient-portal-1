import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import terraformStepActions from "../terraform-step-actions";
import { AuthContext } from "contexts/AuthContext";

function TerraformIamRolesSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  toolConfigId,
  pipelineId,
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
  }, [toolConfigId]);

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
      let res = await terraformStepActions.getIAMRoles(getAccessToken, cancelSource, model);
      if (res && res.status === 200) {
        res = res.data;
      } else {
        res = [];
      }
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
      dataObject={model}
      setDataObject={setModel}
      selectOptions={loadBalancers}     
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (loadBalancers == null || loadBalancers.length === 0))}
    />
  );
}

TerraformIamRolesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolConfigId: PropTypes.string,
  pipelineId: PropTypes.string,
};

TerraformIamRolesSelectInput.defaultProps = {
  fieldName: "role",
  textField: "roleName",
  valueField: "arn",
};

export default TerraformIamRolesSelectInput;
