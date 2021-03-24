import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

// TODO: Add support for filtering list
function ProjectMappingToolSelectInput({visible, dataObject, setDataObject, disabled, fieldName}) {
  const setProjectMappingTool = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption["id"]);
    newDataObject.setData("tool_prop", "");
    newDataObject.setData("key", "");
    setDataObject({...newDataObject});
  };

  if (!visible) {
    return <></>;
  }

  return (
    <PipelineToolInput
      toolType={dataObject.getData("tool_identifier")}
      setDataFunction={setProjectMappingTool}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={"Select a Tool"}
      visible={visible}
      disabled={disabled || dataObject.getData("tool_identifier") === ""}
   />
  );
}

ProjectMappingToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  visible: PropTypes.bool
};

ProjectMappingToolSelectInput.defaultProps = {
  visible: true,
  fieldName: "tool_id"
};

export default ProjectMappingToolSelectInput;