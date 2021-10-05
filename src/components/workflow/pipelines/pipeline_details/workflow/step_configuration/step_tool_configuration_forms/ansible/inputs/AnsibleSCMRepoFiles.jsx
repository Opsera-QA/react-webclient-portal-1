import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

import AnsibleStepActions from "../ansible-step-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSync } from "@fortawesome/pro-light-svg-icons";


function AnsibleSCMRepoFilesSelectInput({
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
  const [repoFiles, setRepoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a File");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setRepoFiles([]);
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
      const res = await AnsibleStepActions.getSCMRepoFiles(dataObject, getAccessToken, cancelTokenSource);
      if (res && res.status === 200) {
        if (res.message.length === 0) {
          dataObject.setData("playbookFileName", "");
          setPlaceholder("No Files Found");
          return;
        }
        setPlaceholder("Select a File");
        setRepoFiles(res.message);
        return;
      }
      dataObject.setData("playbookFileName", "");
      setPlaceholder("No Files Found");
      setRepoFiles([]);
    } catch (error) {
      dataObject.setData("playbookFileName", "");
      setPlaceholder("No Files Found");
      console.error(error);
      //toastContext.showServiceUnavailableDialog();
      toastContext.showErrorDialog(error);
    }
  };

  const getInfoText = () => {
    if (dataObject.getData("playbookFilePath").length > 0) {
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

AnsibleSCMRepoFilesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string,
};

AnsibleSCMRepoFilesSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
  fieldName: "playbookFileName",
};

export default AnsibleSCMRepoFilesSelectInput;
