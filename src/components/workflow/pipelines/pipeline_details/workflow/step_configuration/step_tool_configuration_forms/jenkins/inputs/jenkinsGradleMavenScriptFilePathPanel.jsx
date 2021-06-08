import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function JenkinsGradleMavenScriptFilePathPanel({ dataObject, setDataObject }) {
  const buildType = dataObject.getData("buildType");
  const valid = buildType == "gradle" || buildType === "maven";

  if (!valid) return null;

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
