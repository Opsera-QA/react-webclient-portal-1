import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import axios from "axios";
import KafkaConnectActions from "../kafkaConnect-step-actions";
import { Button, Col, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat, faSync, faTools } from "@fortawesome/pro-light-svg-icons";
import InputContainer from "../../../../../../../../common/inputs/InputContainer";
import RefreshButton from "../../../../../../../../common/buttons/data/RefreshButton";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function KafkaConnectSCMRepoFilesSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  textField,
  valueField,
  tool_prop,
  pipelineId,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repoFiles, setKafkaConnectSCMRepoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a File");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setKafkaConnectSCMRepoFiles([]);
      await loadFiles(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadFiles = async () => {
    try {
      const res = await KafkaConnectActions.getSCMRepoFiles(dataObject, getAccessToken, cancelTokenSource);
      if (res && res.status === 200) {
        if (res.message.length === 0) {
          dataObject.setData("connectorFileName", undefined);
          setPlaceholder("No Files Found");
          return;
        }
        setPlaceholder("Select a File");
        setKafkaConnectSCMRepoFiles(res.message);
        return;
      }
      dataObject.setData("connectorFileName", undefined);
      setPlaceholder("No Files Found");
      setKafkaConnectSCMRepoFiles([]);
    } catch (error) {
      dataObject.setData("connectorFileName", undefined);
      setPlaceholder("No Files Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const getInfoText = () => {
    if (dataObject.getData("connectorFilePath").length > 0) {
      return (
        <small>
          <FontAwesomeIcon icon={faSync} className="pr-1" />
          Click here to fetch file list
        </small>
      );
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
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
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
  pipelineId: PropTypes.string,
};

KafkaConnectSCMRepoFilesSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
  fieldName: "connectorFileName",
};

export default KafkaConnectSCMRepoFilesSelectInput;
