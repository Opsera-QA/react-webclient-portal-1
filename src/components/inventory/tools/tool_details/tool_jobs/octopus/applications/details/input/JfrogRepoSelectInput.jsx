import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import JFrogStepActions from 
  "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jfrog_artifactory_docker/jfrog-step-actions";
import axios from "axios";

function JfrogRepoSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repos, setRepos] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Repository");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (dataObject && dataObject.getData("nexusToolId")) {
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
  }, [tool_prop]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadRepos(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };


  const loadRepos = async (cancelSource = cancelTokenSource) => {
    try {
      const res = await JFrogStepActions.getRepos(dataObject.getData("nexusToolId"),"Maven", getAccessToken, cancelSource);
      if (res && res.status === 200) {
        setRepos(res.data);
        return;
      }
      setRepos([]);
    } catch (error) {
      setPlaceholder("No JFrog Repositories Found");
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
        selectOptions={repos}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (repos == null || repos.length === 0))}
      />
    </div>
  );
}

JfrogRepoSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

JfrogRepoSelectInput.defaultProps = {
  valueField: "key",
  textField: "key"
};

export default JfrogRepoSelectInput;
