import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function AcrPushSelectInput({
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
  const [placeholder, setPlaceholder] = useState("Select ACR Push Step");

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

        let dockerSteps = pipelineSteps.filter((step) => step.tool.tool_identifier.toLowerCase() === "azure_acr_push");
        if (dockerSteps.length === 0) {
          let newDataObject = { ...dataObject };
          newDataObject.setData("acrPushStepId", "");
          newDataObject.setData("acrLoginUrl", "");
          newDataObject.setData("azureRepoName", "");
          setDataObject({ ...newDataObject });
        }
        setDockerList(dockerSteps);
        if (dockerSteps.length === 0) {
          setPlaceholder("No ACR Push Steps Configured");
        }
      }
    } catch (error) {
      setPlaceholder("No ACR Push Steps Configured");
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

  const setDataFunction = (fieldName, value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("acrPushStepId", value._id);
    newDataObject.setData("acrLoginUrl", value?.tool?.configuration?.acrLoginUrl);
    newDataObject.setData("azureRepoName", value?.tool?.configuration?.azureRepoName);
    setDataObject({ ...newDataObject });
  };

  if (!dataObject?.getData("isRollback")) {
    return null;
  }


  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      className={"mb-3"}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={dockerList ? dockerList : []}
      busy={isDockerSearching}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (dockerList == null || dockerList.length === 0))}
    />
  );
}

AcrPushSelectInput.propTypes = {
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

AcrPushSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "acrPushStepId",
};

export default AcrPushSelectInput;
