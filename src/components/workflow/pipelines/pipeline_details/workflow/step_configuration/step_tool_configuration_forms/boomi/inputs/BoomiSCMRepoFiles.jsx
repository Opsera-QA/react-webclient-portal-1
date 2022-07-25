import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import BoomiActions from "../boomi.actions";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function BoomiSCMRepoFilesSelectInput({
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
  const [repoFiles, setBoomiSCMRepoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a File");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setBoomiSCMRepoFiles([]);
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
      const res = await BoomiActions.getSCMRepoFiles(dataObject, getAccessToken, cancelTokenSource);
      if (res?.data && res?.data?.status === 200) {
        if (res?.data?.message.length === 0) {
          dataObject.setData("fileName", "");
          setPlaceholder("No Files Found");
          return;
        }
        setPlaceholder("Select a File");
        setBoomiSCMRepoFiles(res?.data?.message);
        return;
      }
      dataObject.setData("fileName", "");
      setPlaceholder("No Files Found");
      setBoomiSCMRepoFiles([]);
    } catch (error) {
      dataObject.setData("fileName", "");
      setPlaceholder("No Files Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const getInfoText = () => {
    if (dataObject?.getData("filePath").length > 0) {
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

BoomiSCMRepoFilesSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string,
};

BoomiSCMRepoFilesSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
  fieldName: "fileName",
};

export default BoomiSCMRepoFilesSelectInput;
