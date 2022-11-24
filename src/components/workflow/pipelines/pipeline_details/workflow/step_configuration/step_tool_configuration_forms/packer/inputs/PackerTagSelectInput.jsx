import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import packerStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/packer/packer-step-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const PackerTagSelectInput = ({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField
}) => {

  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [packerTags, setPackerTags] = useState([]);
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
    setErrorMessage("");

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
      await getPackerTags(cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPackerTags = async (cancelSource) => {
    try {
      const response = await packerStepActions.getPackerTags(getAccessToken, cancelSource);
      if(response?.data?.status === 200 && Array.isArray(response?.data?.data)){        
        setPackerTags(response.data.data);
      }

    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  return (
    <SelectInputBase 
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={packerTags}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      placeholderText="Select Packer Version"
      disabled={disabled || isLoading || (!isLoading && (packerTags == null || packerTags.length === 0))}
      error={errorMessage}
    />
  );
};

PackerTagSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

PackerTagSelectInput.defaultProps = {
  fieldName: "tag",
  textField: "tag",
  valueField: "tag",
};

export default PackerTagSelectInput;
