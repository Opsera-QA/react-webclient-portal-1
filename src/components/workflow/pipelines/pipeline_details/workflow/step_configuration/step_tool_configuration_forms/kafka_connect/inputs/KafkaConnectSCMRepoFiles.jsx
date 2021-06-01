import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import axios from "axios";
import KafkaConnectActions from "../kafkaConnect-step-actions";

function KafkaConnectSCMRepoFilesSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop, pipelineId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repoFiles, setKafkaConnectSCMRepoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Lifecycle");
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
  }, [dataObject.data.gitBranch]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadFiles(cancelSource);
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

  const loadFiles = async () => {
    try {
      const res = await KafkaConnectActions.getSCMRepoFiles(dataObject, getAccessToken, cancelTokenSource);
      if (res && res.status === 200) {
        console.log(res);
        if (res.data.length === 0) {
          setPlaceholder("No Files Found");
          return;
        }
        setPlaceholder("Select a File");
        setKafkaConnectSCMRepoFiles(res.data);
        return;
      }
      setPlaceholder("No Files Found");
      setKafkaConnectSCMRepoFiles([]);
    } catch (error) {
      setPlaceholder("No Files Found");
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
        selectOptions={repoFiles}
        busy={isLoading}
        textField={textField}
        valueField={valueField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (repoFiles == null || repoFiles.length === 0))}
      />
    </div>
  );
}

KafkaConnectSCMRepoFilesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string
};

KafkaConnectSCMRepoFilesSelectInput.defaultProps = {
  valueField: "id",
  textField: "name",
  disabled: false,
  fieldName: "connectorFileName"
};

export default KafkaConnectSCMRepoFilesSelectInput;