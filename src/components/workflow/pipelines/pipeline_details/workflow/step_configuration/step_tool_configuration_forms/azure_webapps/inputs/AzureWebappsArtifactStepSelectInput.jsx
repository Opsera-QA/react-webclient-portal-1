import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import {getArtifactorySteps} from "components/common/helpers/pipelines/pipeline.helpers";

const DOCKER = "docker";
const PACKAGE = "package";

function AzureWebappsArtifactStepSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  plan,
  stepId,
  deploymentType
}) {
  const [dockerList, setDockerList] = useState([]);
  const [packageList, setPackageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Artifactory Step");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadData();
  }, [deploymentType]);

  const loadData = async () => {
    try {
      setPlaceholder("Select Artifactory Step");
      setErrorMessage("");
      setIsLoading(true);
      if (deploymentType === PACKAGE) {
        await fetchPackageStepDetails();
      } else if (deploymentType === DOCKER) {
        await fetchDockerStepDetails();
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDockerStepDetails = async () => {
    try {
      if (plan && stepId) {
        const dockerSteps = getArtifactorySteps(plan, stepId, [toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ACR_PUSH]);
        if (dockerSteps.length === 0) {
          let newDataObject = { ...model };
          newDataObject.setData("artifactStepId", "");
          setModel({ ...newDataObject });
        }
        setDockerList(dockerSteps);
        if (dockerSteps.length === 0) {
          setPlaceholder("No Azure Push Steps Configured");
        }
      }
    } catch (error) {
      setPlaceholder("No Azure Push Steps Configured");
      setErrorMessage(error);
    }
  };

  const fetchPackageStepDetails = async () => {
    try {
      if (plan && stepId) {
        const packageSteps = getArtifactorySteps(plan, stepId, [toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ZIP_DEPLOYMENT, toolIdentifierConstants.TOOL_IDENTIFIERS.JFROG_ARTIFACTORY_MAVEN, toolIdentifierConstants.TOOL_IDENTIFIERS.NEXUS]);
        if (packageSteps.length === 0) {
          let newDataObject = { ...model };
          newDataObject.setData("artifactStepId", "");
          setModel({ ...newDataObject });
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

  const getSelectOptions = () => {
    if (deploymentType === PACKAGE) {
      return packageList ? packageList : [];
    } else if (deploymentType === DOCKER) {
      return dockerList ? dockerList : [];
    }
    return [];
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      className={"mb-3"}
      setDataObject={setModel}
      selectOptions={getSelectOptions()}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && deploymentType === PACKAGE && (packageList == null || packageList.length === 0)) || (!isLoading && deploymentType === DOCKER && (dockerList == null || dockerList.length === 0))}
      error={errorMessage}
    />
  );
}

AzureWebappsArtifactStepSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  deploymentType: PropTypes.string,
};

AzureWebappsArtifactStepSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "artifactStepId",
};

export default AzureWebappsArtifactStepSelectInput;
