import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineActions from "components/workflow/pipeline-actions";

function ProjectRepositorySelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRepositories([]);
    if (tool_prop != null && dataObject.getData("tool_identifier") && dataObject.getData("tool_id")) {
      if (dataObject.getData("tool_identifier") === "bitbucket" && !dataObject.getData("tool_prop")) {
        return;
      }
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadWorkspaces();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadWorkspaces = async () => {
    let results = await pipelineActions.searchRepositories(dataObject.getData("tool_identifier"), dataObject.getData("tool_id"), dataObject.getData("tool_prop"), getAccessToken);
    if (typeof results != "object") {
      toastContext.showLoadingErrorDialog(`There has been an error in fetching ${dataObject.getData("tool_identifier")} repositories`);
      return;
    }
    setRepositories(results);
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={repositories}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a repository"}
      disabled={isLoading || repositories.length === 0}
    />
  );
}

ProjectRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

ProjectRepositorySelectInput.defaultProps = {
  fieldName: "key",
  valueField: "name",
  textField: "name"
};

export default ProjectRepositorySelectInput;