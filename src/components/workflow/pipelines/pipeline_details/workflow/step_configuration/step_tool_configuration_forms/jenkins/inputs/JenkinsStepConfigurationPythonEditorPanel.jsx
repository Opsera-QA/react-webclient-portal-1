import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PythonFilesInput from "../PythonFilesInput";
import StepConfigTerraformStepSelectInput from "../../common/inputs/StepConfigTerraformStepSelectInput";
import StepConfigUseTerraformOutput from "../../common/inputs/StepConfigUseTerraformOutput";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInputBase";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";

const allowedBuildTypes = [
  "python",
  "gradle",
  "maven"
];

function JenkinsStepConfigurationPythonEditorPanel({dataObject, setDataObject, plan, stepId, buildType}) {

  const getTerraformSelect = () => {
    if (dataObject?.getData("useTerraformOutput")) {
      return (
        <StepConfigTerraformStepSelectInput
          setDataObject={setDataObject}
          dataObject={dataObject}
          plan={plan}
          stepId={stepId}
        />
      );
    }
  };

  const getPythonCustomScriptFields = () => {
    if (buildType === "python") {
      return (
        <>
          <StepConfigUseTerraformOutput dataObject={dataObject} setDataObject={setDataObject}
                                        fieldName={"useTerraformOutput"} plan={plan} stepId={stepId}/>
          {getTerraformSelect()}
        </>
      );
    }
  };

  // This could potentially be its own input BUT let's not do that now
  const getDynamicInput = () => {
    if (dataObject.getData("customScript") === true) {
      return (
        <>
          {getPythonCustomScriptFields()}
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
        </>
      );
    }

    if (buildType === "python") {
      return <PythonFilesInput setDataObject={setDataObject} dataObject={dataObject} fieldName={"inputDetails"}/>;
    }
  };

  if (buildType == null || buildType === "" || !allowedBuildTypes.includes(buildType)) {
    return null;
  }

  return (
    <>
      <BooleanToggleInput dataObject={dataObject} setDataObject={setDataObject} fieldName={"customScript"}/>
      {getDynamicInput()}
    </>
  );
}

JenkinsStepConfigurationPythonEditorPanel.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jenkinsList: PropTypes.any,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  buildType: PropTypes.string,
};

export default JenkinsStepConfigurationPythonEditorPanel;
