import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/SelectInputBase";
import pipelineActions from "components/workflow/pipeline-actions";
import DtoSelectInput from "../../../../input/dto_input/dto-select-input";

function ProjectMappingWorkspaceSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, toolId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setWorkspaces([]);
    if (toolId !== "" && dataObject.getData("tool_identifier") !== "") {
      loadData();
    }
  }, [toolId]);

  const loadData = async () => {
    try {
      setIsLoading(true)
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
    let results = await pipelineActions.searchWorkSpaces(dataObject.getData("tool_identifier"), dataObject.getData("tool_id"), getAccessToken);
    if (typeof results != "object") {
      toastContext.showLoadingErrorDialog(`There has been an error in fetching ${dataObject.getData("tool_identifier")} workspaces`);
      return
    }
    setWorkspaces(results);
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "tool_prop") {
      let newDataObject = dataObject;
      newDataObject.setData("tool_prop", value);
      setDataObject({ ...newDataObject });
      return;
    }
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataFunction={handleDTOChange}
      setDataObject={setDataObject}
      selectOptions={workspaces}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a Workspace"}
      disabled={disabled || isLoading || workspaces.length === 0}
    />
  );
}

ProjectMappingWorkspaceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string
};

ProjectMappingWorkspaceSelectInput.defaultProps = {
  fieldName: "tool_prop",
  valueField: "value",
  textField: "value"
};

export default ProjectMappingWorkspaceSelectInput;