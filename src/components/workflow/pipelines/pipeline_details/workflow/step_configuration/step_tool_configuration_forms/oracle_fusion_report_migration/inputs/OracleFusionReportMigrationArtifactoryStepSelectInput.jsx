import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import {getArtifactorySteps} from "components/common/helpers/pipelines/pipeline.helpers";

function OracleFusionReportMigrationArtifactoryStepSelectInput({
  fieldName,
  model,
  setModel,
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
        const packageSteps = getArtifactorySteps(plan, stepId, [toolIdentifierConstants.TOOL_IDENTIFIERS.NEXUS, toolIdentifierConstants.TOOL_IDENTIFIERS.COMMAND_LINE]);
        if (packageSteps.length === 0) {
          let newModel = { ...model };
          newModel.setData("artifactStepId", "");
          setModel({ ...newModel });
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
      dataObject={model}
      className={"mb-3"}
      setDataObject={setModel}
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

OracleFusionReportMigrationArtifactoryStepSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

OracleFusionReportMigrationArtifactoryStepSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "artifactStepId",
};

export default OracleFusionReportMigrationArtifactoryStepSelectInput;
