import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";

function AzureWebappsArtifactStepSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  plan,
  stepId,
}) {
  const [dockerList, setDockerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Build Step");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setPlaceholder("Select Build Step");
      setErrorMessage("");
      setIsLoading(true);      
      const dockerSteps = getDockerBuildSteps();      
      setDockerList(dockerSteps);
      if (dockerSteps.length === 0) {
        setPlaceholder("No Docker Build Steps Configured");
      }
    } catch (error) {
      setPlaceholder("No Docker Build Steps Configured");
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDockerBuildSteps = () => {
    const elegibleSteps = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );

    if (!Array.isArray(elegibleSteps)) {
      return [];
    }

    return elegibleSteps?.filter((step) =>
      step?.active && 
      step?.tool?.tool_identifier === toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS &&
      step?.tool?.configuration?.buildTool === "docker"
    );
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      className={"mb-3"}
      setDataObject={setModel}
      selectOptions={dockerList ? dockerList : []}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading || dockerList == null || dockerList.length === 0}
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
};

export default AzureWebappsArtifactStepSelectInput;
