import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import BuildkiteStepActions from "../buildkite-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function BuildkitePipelineSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool}) {
  const toastContext = useContext(DialogToastContext);
  const [pipelines, setPipelines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const [placeholder, setPlaceholderText] = useState("Select Pipeline");


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
  }, [tool, disabled]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAwsRegions(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadAwsRegions = async (cancelSource = cancelTokenSource) => {
    try {
      const res = await BuildkiteStepActions.getPipelines(dataObject, getAccessToken, cancelSource);
      if (res && res.status === 200) {
        setPipelines(res.data);
        return;
      }
      setPipelines([]);
      if (!isLoading && (pipelines == null || pipelines.length === 0)) {
        setPlaceholderText("No Buildkite Pipelines found");
      }
    } catch (error) {
      if (!isLoading && (pipelines == null || pipelines.length === 0)) {
        setPlaceholderText("Buildkite Pipelines information is missing or unavailable!");
      }
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={pipelines}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading}
      />
    </div>
  );
}

BuildkitePipelineSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool: PropTypes.string
};

BuildkitePipelineSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  fieldName: "pipeline",
};

export default BuildkitePipelineSelectInput;
