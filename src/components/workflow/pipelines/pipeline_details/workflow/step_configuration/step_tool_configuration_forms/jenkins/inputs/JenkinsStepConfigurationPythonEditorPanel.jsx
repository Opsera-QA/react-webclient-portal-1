import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PythonFilesInput from "../PythonFilesInput";

function JenkinsStepConfigurationPythonEditorPanel({ dataObject, setDataObject }) {

  // This could potentially be its own input BUT let's not do that now
  const getDynamicInput = () => {
    if (dataObject.getData("customScript") === true) {
      return (<TextAreaInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"commands"} />);
    }

    return (<PythonFilesInput setDataObject={setDataObject} dataObject={dataObject} fieldName={"inputDetails"} />);
  };

  if (dataObject == null || dataObject.getData("buildType") !== "python") {
    return null;
  }

  return (
    <>
      <BooleanToggleInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"customScript"} />
      {getDynamicInput()}
    </>
  );
}

JenkinsStepConfigurationPythonEditorPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jenkinsList: PropTypes.any,
};

export default JenkinsStepConfigurationPythonEditorPanel;
