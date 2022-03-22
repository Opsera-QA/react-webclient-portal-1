import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import KafkaConnectActions from "../kafkaConnect-step-actions";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import MultiSelectInputBase from "../../../../../../../../common/inputs/multi_select/MultiSelectInputBase";

function GitFilesInputBase({
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
  const [placeholder, setPlaceholder] = useState("Select Files");
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
          dataObject.setData("filesToIgnore", "");
          setPlaceholder("No Files Found");
          return;
        }
        setPlaceholder("Select a File");
        setKafkaConnectSCMRepoFiles(res.message);
        return;
      }
      dataObject.setData("filesToIgnore", "");
      setPlaceholder("No Files Found");
      setKafkaConnectSCMRepoFiles([]);
    } catch (error) {
      dataObject.setData("filesToIgnore", "");
      setPlaceholder("No Files Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const getInfoText = () => {
    if (dataObject.getData("connectorFilePath").length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className="pr-1" />
          Click here to fetch file list
        </small>
      );
    }
  };

  return (
    <div>
      <MultiSelectInputBase
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

GitFilesInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string,
};

GitFilesInputBase.defaultProps = {
  valueField: "name",
  textField: "name",
  fieldName: "filesToIgnore",
};

export default GitFilesInputBase;
