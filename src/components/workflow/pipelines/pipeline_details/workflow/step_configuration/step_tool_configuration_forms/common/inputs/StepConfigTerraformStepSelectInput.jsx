import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function StepConfigTerraformStepSelectInput({
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
  const [terraformList, setCommandLineTerraformList] = useState([]);
  const [isCommandLineTerraformSearching, setIsCommandLineTerraformSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchCommandLineTerraformDetails();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCommandLineTerraformDetails = async () => {
    setIsCommandLineTerraformSearching(true);
    try {
      if (plan && stepId) {
        let pipelineSteps = formatStepOptions(plan, stepId);
        let terraformSteps = pipelineSteps.filter(step => step.tool.tool_identifier.toLowerCase() === 'terraform' && step.tool.configuration.customParameters.length > 0);
        if (terraformSteps.length === 0) {
          let newDataObject = { ...dataObject };
          newDataObject.setData("terraformStepId", "");
          setDataObject({ ...newDataObject });
        }
        setCommandLineTerraformList(terraformSteps);
      }
    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsCommandLineTerraformSearching(false);
    }
  };

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
  };

  const setTerraformDetails = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, selectedOption._id);
    let tempCustomParamsObject = selectedOption?.tool?.configuration?.customParameters && Array.isArray(selectedOption?.tool?.configuration?.customParameters) ? selectedOption?.tool?.configuration?.customParameters : []; 
    
    let currentCustomParamsObject = newDataObject?.getData("customParameters");    
    let filteredCustomParamsObject = [];
    for (let item in currentCustomParamsObject) {
      if (!currentCustomParamsObject[item]?.outputKey) {
        filteredCustomParamsObject.push(currentCustomParamsObject[item]);
      }
    }

    newDataObject.setData("customParameters", [...tempCustomParamsObject, ...filteredCustomParamsObject]);
    setDataObject({ ...newDataObject });
  };

  const clearTerraformDetails = (fieldName) => {
    let newDataObject = { ...dataObject };
    let currentCustomParamsObject = newDataObject?.getData("customParameters");
    newDataObject.setData("terraformStepId", "");
    let filtered = [];
    for (let item in currentCustomParamsObject) {
      if (!currentCustomParamsObject[item]?.outputKey) {
        filtered.push(currentCustomParamsObject[item]);
      }
    }
    newDataObject.setData("customParameters", filtered);
    setDataObject({ ...newDataObject });
  };

  if (terraformList === null || terraformList.length === 0) {
    return null;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        className={"mb-3"}
        setDataObject={setDataObject}
        setDataFunction={setTerraformDetails}
        clearDataFunction={clearTerraformDetails}
        selectOptions={terraformList ? terraformList : []}
        busy={isCommandLineTerraformSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select Terraform Step"}
        disabled={disabled || isLoading || (!isLoading && (terraformList == null || terraformList.length === 0))}
      />
    </div>
  );
}

StepConfigTerraformStepSelectInput.propTypes = {
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

StepConfigTerraformStepSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "terraformStepId",
};

export default StepConfigTerraformStepSelectInput;
