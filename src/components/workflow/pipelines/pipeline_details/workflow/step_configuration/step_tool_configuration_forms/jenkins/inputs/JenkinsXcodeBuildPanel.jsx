import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
import JenkinsXcodeContentTypeSelectInput from "./JenkinsXcodeContentTypeSelectInput";
import JenkinsXcodeScriptTypeSelectInput from "./JenkinsXcodeScriptTypeSelectInput";
import ParameterSelectListInputBase
  from "components/common/list_of_values_input/parameters/legacy/ParameterSelectListInputBase";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import JenkinsXcodeCertificateSelectInput from "./JenkinsXcodeCertificateSelectInput";


function JenkinsIosBuildPanel({plan, model, setModel, buildType, jenkinsList, toolConfigId}) {
  if (buildType == null || buildType !== "xcode") {
    return null;
  }

  return (
    <>
      <JenkinsXcodeCertificateSelectInput 
        model={model}
        setModel={setModel}
        fieldName={"credentailsId"}
        jenkinsList={jenkinsList}
        toolConfigId={toolConfigId}
      />
      <TextInputBase dataObject={model} fieldName={"filePath"} setDataObject={setModel} />
      <TextInputBase dataObject={model} fieldName={"schemeName"} setDataObject={setModel} />      
      <TextInputBase dataObject={model} fieldName={"projectWorkspace"} setDataObject={setModel} />
      <JenkinsXcodeContentTypeSelectInput model={model} setModel={setModel} />
      <JenkinsXcodeScriptTypeSelectInput model={model} setModel={setModel} />      
      <TextAreaInputBase 
        fieldName={"commands"} 
        model={model} 
        setModel={setModel}
      />
      <ParameterSelectListInputBase
        titleIcon={faHandshake}
        dataObject={model}
        setDataObject={setModel}
        fieldName={"customParameters"}
        allowIncompleteItems={true}
        type={"Parameter"}
        regexValidationRequired={false}
        titleText={"Parameter Selection"}
        plan={plan}
      />
      <TextInputBase dataObject={model} fieldName={"outputPath"} setDataObject={setModel} />
      <TextInputBase dataObject={model} fieldName={"outputFileName"} setDataObject={setModel} />
    </>
  );
}

JenkinsIosBuildPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  buildType: PropTypes.string,
  plan: PropTypes.array,
  jenkinsList: PropTypes.any,
  toolConfigId: PropTypes.string,
};

export default JenkinsIosBuildPanel;
