import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function JenkinsGradleMavenScriptFilePathPanel({dataObject, setDataObject}) {
  console.log(dataObject.getData("buildType") ,'*** byukd build type');
  if (dataObject == null ||
    (dataObject.getData("buildType") !== "gradle" && dataObject.getData("buildType") !== "maven")
  ) {
    return null;
  }

  return (
    <>
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
