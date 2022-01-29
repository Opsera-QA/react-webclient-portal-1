import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import axios from "axios";
import AWSLambdaFunctionActions from "../aws-lambda-actions";

function IAMRolesSelectInput({
                                   fieldName,
                                   dataObject,
                                   setDataObject,
                                   disabled,
                                   textField,
                                   valueField,
                               toolConfigId,
                                   regions,
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
  }, [toolConfigId,regions]);

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
      let res = await AWSLambdaFunctionActions.getIAMRoles(getAccessToken, cancelSource, dataObject);
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

  const setDataFunction = (fieldName, value) => {
    let urlPattern = /arn:(aws[a-zA-Z-]*)?:iam::\d{12}:role\//;
    let baseValue = urlPattern.exec(value.arn);
    let roleValue =  baseValue.length > 0 ? baseValue[0] + "LambdaBasicExecution" : false;
    if (roleValue) {
      let newDataObject = dataObject;
      newDataObject.setData(fieldName, value.arn);
      newDataObject.setData("functionArn", roleValue);
      setDataObject({...newDataObject});
    }
  };


  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={loadBalancers}
      setDataFunction={setDataFunction}
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
  regions: PropTypes.string,
};

IAMRolesSelectInput.defaultProps = {
  fieldName: "role",
  textField: "roleName",
  valueField: "arn",
};

export default IAMRolesSelectInput;
