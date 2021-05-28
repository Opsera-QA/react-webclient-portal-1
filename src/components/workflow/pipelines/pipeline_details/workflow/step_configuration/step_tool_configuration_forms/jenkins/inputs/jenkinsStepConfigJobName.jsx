import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function JenkinsStepConfigJobName({ fieldName, dataObject, setDataObject, disabled }) {

  
  if(dataObject.data.jenkinsJobType!='job'){
    return null;
  }
  return (
    <div className={"mb-3"}>
      <TextInputBase 
      disabled={false} 
      fieldName={fieldName} 
      dataObject={dataObject} 
      setDataObject={setDataObject}/>
    </div>
  );
}

JenkinsStepConfigJobName.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

JenkinsStepConfigJobName.defaultProps = {
  fieldName: "jobName",
  disabled:false
};

export default JenkinsStepConfigJobName;
