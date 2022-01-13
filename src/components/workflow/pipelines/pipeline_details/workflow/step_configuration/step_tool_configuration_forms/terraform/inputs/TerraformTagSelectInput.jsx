import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import terraformStepActions from "../terraform-step-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TerraformTagSelectInput = ({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField
}) => {

  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [terraformTags, setTerraformTags] = useState([]);
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

    loadData(source).catch((error) => {
      if (isMounted.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };

  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    try {
      await getTerraformTags(cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTerraformTags = async (cancelSource) => {
    try {
      const response = await terraformStepActions.getTerraformTags(getAccessToken, cancelTokenSource);      
      if(response?.data?.status === 200 && Array.isArray(response?.data?.data)){        
        setTerraformTags(response.data.data);
      }

    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog(error);
    }
  };

  return (
    <SelectInputBase 
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={terraformTags}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      placeholderText="Select Terraform Version"
      disabled={disabled || isLoading || (!isLoading && (terraformTags == null || terraformTags.length === 0))}
    />
  );
};

TerraformTagSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

TerraformTagSelectInput.defaultProps = {
  fieldName: "tag",
  textField: "tag",
  valueField: "tag",
};

export default TerraformTagSelectInput;
