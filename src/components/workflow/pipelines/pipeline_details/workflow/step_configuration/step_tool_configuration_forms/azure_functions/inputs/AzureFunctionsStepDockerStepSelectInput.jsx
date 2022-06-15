import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

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
  const toastContext = useContext(DialogToastContext);
  const [dockerList, setDockerList] = useState([]);
  const [isDockerSearching, setIsDockerSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Azure Push Step");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchDockerStepDetails();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDockerStepDetails = async () => {
    setIsDockerSearching(true);
    try {
      if (plan && stepId) {
        let pipelineSteps = formatStepOptions(plan, stepId);
        let dockerSteps = pipelineSteps.filter((step) => step.tool.tool_identifier.toLowerCase() === "azure_acr_push" || step.tool.tool_identifier.toLowerCase() === "azure-zip-deployment");
        if (dockerSteps.length === 0) {
          let newDataObject = { ...dataObject };
          newDataObject.setData("artifactStepId", "");
          setDataObject({ ...newDataObject });
        }
        setDockerList(dockerSteps);
        if (dockerSteps.length === 0) {
          setPlaceholder("No Azure Push Steps Configured");
        }
      }
    } catch (error) {
      setPlaceholder("No Azure Push Steps Configured");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsDockerSearching(false);
    }
  };

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
  };

  // if (dockerList === null || dockerList.length === 0) {
  //   return null;
  // }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      className={"mb-3"}
      setDataObject={setDataObject}
      selectOptions={dockerList ? dockerList : []}
      busy={isDockerSearching || isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (dockerList == null || dockerList.length === 0))}
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
