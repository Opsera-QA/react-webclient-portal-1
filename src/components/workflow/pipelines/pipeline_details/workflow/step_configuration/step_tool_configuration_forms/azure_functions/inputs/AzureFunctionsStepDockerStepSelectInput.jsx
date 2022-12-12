import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import {getArtifactorySteps} from "components/common/helpers/pipelines/pipeline.helpers";

// TODO: We should probably make base components for this. One that can be passed a tool identifier abd a docker push specific one
function AzureFunctionsStepDockerStepSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  textField,
  valueField,
  plan,
  stepId,
}) {
  const [packageList, setPackageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Artifactory Step");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setPlaceholder("Select Artifactory Step");
      setErrorMessage("");
      await fetchArtifactoryStepDetails();
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArtifactoryStepDetails = async () => {    
    try {
      if (plan && stepId) {        
        const packageSteps = getArtifactorySteps(plan, stepId, [toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ACR_PUSH, toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ZIP_DEPLOYMENT, toolIdentifierConstants.TOOL_IDENTIFIERS.JFROG_ARTIFACTORY_MAVEN, toolIdentifierConstants.TOOL_IDENTIFIERS.NEXUS]);
        if (packageSteps.length === 0) {
          let newDataObject = { ...dataObject };
          newDataObject.setData("artifactStepId", "");
          setDataObject({ ...newDataObject });
        }
        setPackageList(packageSteps);
        if (packageSteps.length === 0) {
          setPlaceholder("No Artifactory Steps Configured");
        }
      }
    } catch (error) {
      setPlaceholder("No Artifactory Steps Configured");
      setErrorMessage(error);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      className={"mb-3"}
      setDataObject={setDataObject}
      selectOptions={packageList ? packageList : []}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (packageList == null || packageList.length === 0))}
      error={errorMessage}
    />
  );
}

AzureFunctionsStepDockerStepSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

AzureFunctionsStepDockerStepSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "artifactStepId",
};

export default AzureFunctionsStepDockerStepSelectInput;
