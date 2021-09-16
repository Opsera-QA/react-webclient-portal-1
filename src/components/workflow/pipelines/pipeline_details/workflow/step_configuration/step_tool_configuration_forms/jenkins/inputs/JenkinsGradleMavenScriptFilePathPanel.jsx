import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";

function JenkinsGradleMavenScriptFilePathPanel({dataObject, setDataObject}) {
  if (dataObject == null || (dataObject.getData("buildType") !== "gradle" && dataObject.getData("buildType") !== "maven")) {
    return null;
  }

  return (
    <>
      <TextAreaInput dataObject={dataObject} fieldName={"runtimeArguments"} setDataObject={setDataObject} />
      <TextInputBase dataObject={dataObject} fieldName={"inputFilePath"} setDataObject={setDataObject} />
      <TextInputBase dataObject={dataObject} fieldName={"inputFileName"} setDataObject={setDataObject} />
      <TextInputBase dataObject={dataObject} fieldName={"outputPath"} setDataObject={setDataObject} />
      <TextInputBase dataObject={dataObject} fieldName={"outputFileName"} setDataObject={setDataObject} />
    </>
  );
}

JenkinsGradleMavenScriptFilePathPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default JenkinsGradleMavenScriptFilePathPanel;
