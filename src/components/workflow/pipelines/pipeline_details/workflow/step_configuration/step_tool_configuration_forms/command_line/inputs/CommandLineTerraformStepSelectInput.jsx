import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import _ from "lodash";

function CommandLineTerraformStepSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, plan, stepId}) {
  const toastContext = useContext(DialogToastContext);
  const [terraformList, setCommandLineTerraformList] = useState([]);
  const [isCommandLineTerraformSearching, setIsCommandLineTerraformSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Terraform Step");

  useEffect(() => {
    loadData();

  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchCommandLineTerraformDetails();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchCommandLineTerraformDetails = async () => {
    setIsCommandLineTerraformSearching(true);
    try {
      if (plan && stepId) {
        let pipelineSteps = formatStepOptions(plan, stepId);
        // let groupedSteps = _.groupBy(pipelineSteps, "tool.tool_identifier");
        // let terraformSteps = Object.keys(groupedSteps).length > 0 && groupedSteps.terraform ? [...groupedSteps.terraform] : [];
        let terraformSteps = pipelineSteps.filter(step => step.tool.tool_identifier.toLowerCase() === 'terraform' && step.tool.configuration.saveParameters);        
        if (terraformSteps.length === 0) {
          // setPlaceholder("Configure a Terraform Step to use this option");
          dataObject.setData("terraformStepId", "");
        }
        setCommandLineTerraformList(terraformSteps);
      }
    } catch(error) {
      // setPlaceholder("Configure a Terraform Step to use this option");
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

if(terraformList === null || terraformList.length === 0){
  return null;
}


  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={terraformList ? terraformList : []}
        busy={isCommandLineTerraformSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (terraformList == null || terraformList.length === 0))}
      />
    </div>
  );
}

CommandLineTerraformStepSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  plan : PropTypes.array,
  stepId : PropTypes.string
};

CommandLineTerraformStepSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "terraformStepId"
};

export default CommandLineTerraformStepSelectInput;