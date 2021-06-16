import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import _ from "lodash";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSync } from "@fortawesome/pro-light-svg-icons";
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
  // const [placeholder, setPlaceholder] = useState("Select Terraform Step");

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
        // let groupedSteps = _.groupBy(pipelineSteps, "tool.tool_identifier");
        // let terraformSteps = Object.keys(groupedSteps).length > 0 && groupedSteps.terraform ? [...groupedSteps.terraform] : [];
        let terraformSteps = pipelineSteps.filter(step => step.tool.tool_identifier.toLowerCase() === 'terraform' && step.tool.configuration.customParameters.length > 0);
        if (terraformSteps.length === 0) {
          // setPlaceholder("Configure a Terraform Step to use this option");
          let newDataObject = { ...dataObject };
          newDataObject.setData("terraformStepId", "");
          setDataObject({ ...newDataObject });
        }
        setCommandLineTerraformList(terraformSteps);
      }
    } catch (error) {
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

  const setTerraformDetails = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, selectedOption._id);
    let tempCustomParamsObject = selectedOption?.tool?.configuration?.customParameters && Array.isArray(selectedOption?.tool?.configuration?.customParameters) ? selectedOption?.tool?.configuration?.customParameters : [];
    let currentCustomParamsObject = newDataObject?.getData("customParameters");
    newDataObject.setData("customParameters", [...tempCustomParamsObject, ...currentCustomParamsObject]);
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

  const refreshParameters = () => {
    let terraformStep = plan.find((step) => step._id === dataObject.getData(fieldName));
    let newDataObject = { ...dataObject };
    let tempCustomParamsObject = terraformStep?.tool?.configuration?.customParameters && Array.isArray(terraformStep?.tool?.configuration?.customParameters) ? terraformStep?.tool?.configuration?.customParameters : [];
    let currentCustomParamsObject = newDataObject?.getData("customParameters");
    let filtered = [];
    for (let item in currentCustomParamsObject) {
      if (!currentCustomParamsObject[item]?.outputKey) {
        filtered.push(currentCustomParamsObject[item]);
      }
    }
    newDataObject.setData("customParameters", [...tempCustomParamsObject, ...filtered]);
    setDataObject({ ...newDataObject });
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName).length > 0) {
      return (
        <small>
          <FontAwesomeIcon icon={faSync} className="pr-1" />
          Refresh Terraform Output List
        </small>
      );
    }
  };

  const getHelpText = () => {
    return (
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={
          <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
            <Popover.Title as="h3">Terraform Custom Parameters</Popover.Title>
            <Popover.Content>
              <div className="text-muted mb-2">
                This is a list of the mapped terraform output parameters available for use within commands in this step.
                In order to use any of these parameters in the step - enter them in the commands with the following
                syntax: <strong>{"${parameter_name}"}</strong>, where the parameter_name is the one of the names derived
                from this list of available parameters. You can refresh the list of available parameters by clicking on
                the Refresh button.
              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="fa-pull-right pointer pr-2 mt-1 pl-0"
          onClick={() => document.body.click()}
        />
      </OverlayTrigger>
    );
  };

  if (terraformList === null || terraformList.length === 0) {
    return null;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
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
      <div onClick={() => refreshParameters()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
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
