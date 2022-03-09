import React, { useContext, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import AnsibleStepActions from "../ansible.step.actions";
import axios from "axios";
import { isEmpty } from "lodash";
import {  faSync } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function AnsibleStepScmRepositoryFileSelectInput({
  fieldName,
  model,
  setModel,
  textField,
  valueField,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repoFiles, setRepoFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Select a File");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const playbookFilePath = model.getData("playbookFilePath");
  const defaultBranch = model.getData("defaultBranch");
  const gitToolId = model.getData("gitToolId");
  const projectId = model.getData("repoId");
  const workspace = model.getData("workspace");
  const service = model.getData("service");

  useEffect(() => {
    
      if (cancelTokenSource) {
        cancelTokenSource.cancel();
      }
      const source = axios.CancelToken.source();
      setCancelTokenSource(source);
      isMounted.current = true;
      if(!isEmpty(defaultBranch) && !isEmpty(gitToolId) && !isEmpty(projectId)  && !isEmpty(service) && !isEmpty(playbookFilePath)){
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
  },[]);

  
  useEffect(() => {
    if(!isEmpty(defaultBranch) && !isEmpty(gitToolId) && !isEmpty(projectId) && !isEmpty(service) && !isEmpty(playbookFilePath)){
      const source = axios.CancelToken.source();
      setCancelTokenSource(source);
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  },[defaultBranch, gitToolId, projectId, service,playbookFilePath]);

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
      const result = await AnsibleStepActions.getScmRepositoryFiles(getAccessToken, cancelTokenSource, playbookFilePath, defaultBranch, gitToolId, projectId, workspace, service);
      const response = result?.data?.message;
      const status = result?.status;
      if (response && status === 200 &&  result?.data?.status === 200) {
        if (response.length === 0 ) {
          model.setData("playbookFileName", "");
          setPlaceholderText("No Files Found");
        }else {  
          setPlaceholderText("Select a File");
        }
        
        setRepoFiles(response);       
        return;
      }
      setPlaceholderText("No Files Found");
      setRepoFiles([]);
      toastContext.showErrorDialog(response);
    } catch (error) {     
      setPlaceholderText("No Files Found");
      console.error(error);
      toastContext.showErrorDialog(error);
    }
  };
  const getInfoText = () => {
    if (model.getData("playbookFilePath").length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to fetch file list
        </small>
      );
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        selectOptions={repoFiles}
        busy={isLoading}
        textField={textField}
        valueField={valueField}
        placeholderText={placeholderText}
        disabled={repoFiles == null || repoFiles.length === 0}
      />
       <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </div>
  );
}

AnsibleStepScmRepositoryFileSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

AnsibleStepScmRepositoryFileSelectInput.defaultProps = {
  valueField: "name",
  textField: "name",
  fieldName: "playbookFileName",
  
};

export default AnsibleStepScmRepositoryFileSelectInput;
