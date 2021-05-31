import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";



function JenkinsStepConfGradleMavenScriptFilePath({ dataObject, setDataObject }) {
    
    const buildType =dataObject.getData('buildType');

    if(buildType ==="gradle" || buildType === "maven"){
        return(<>
            <TextInputBase dataObject={dataObject} fieldName={"inputFilePath"} setDataObject={setDataObject} />
            <TextInputBase dataObject={dataObject} fieldName={"inputFileName"} setDataObject={setDataObject} />
            <TextInputBase dataObject={dataObject} fieldName={"outputPath"} setDataObject={setDataObject} />
            <TextInputBase dataObject={dataObject} fieldName={"outputFileName"} setDataObject={setDataObject} />

        </>);
    }
    
    return null;
}

JenkinsStepConfGradleMavenScriptFilePath.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func
};



export default JenkinsStepConfGradleMavenScriptFilePath;
