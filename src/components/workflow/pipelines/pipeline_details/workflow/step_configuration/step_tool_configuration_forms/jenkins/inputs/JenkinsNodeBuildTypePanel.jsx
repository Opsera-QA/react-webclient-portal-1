import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInputBase";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";

function JenkinsNodeBuildTypePanel({plan, stepId, dataObject, setDataObject, buildType}) {
  if (buildType !== null && buildType !== "node" ) {
    return null;
  }

  return (
    <>
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={dataObject}
        setDataObject={setDataObject}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Parameter Selection"}
        plan={plan}
        //tool_prop={dataObject?.getData("terraformStepId") && dataObject?.getData("terraformStepId").length > 0 ?
        //  dataObject?.getData("terraformStepId") : ""}
      />
      <TextAreaInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"commands"}/>
      <TextInputBase dataObject={dataObject} fieldName={"outputPath"} setDataObject={setDataObject} />
      <TextInputBase dataObject={dataObject} fieldName={"outputFileName"} setDataObject={setDataObject} />
    </>
  );
}

JenkinsNodeBuildTypePanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  buildType: PropTypes.string,
};

export default JenkinsNodeBuildTypePanel;
