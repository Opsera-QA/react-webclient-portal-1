import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import Select from "react-select";
import PipelineActions from "../../../../../../../../workflow/pipeline-actions";

function AWSToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an AWS account configured in the Opsera Tool Registry");

  useEffect(() => {
    if (!disabled) {
      setAwsList([]);
      loadData();
    }
    if (disabled && tool_prop.length > 0) {
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchAWSDetails();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchAWSDetails = async () => {
    setIsAwsSearching(true);
    try {
      let results = await PipelineActions.getToolsList("aws_account", getAccessToken);

      const filteredList = results.filter((el) => el.configuration !== undefined);
      if (filteredList) {
        setAwsList(filteredList);
      }
    } catch(error) {
      setPlaceholder("No Accounts Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsAwsSearching(false);
    }
  };


  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={awsList ? awsList : []}
        busy={isAwsSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (awsList == null || awsList.length === 0))}
      />
    </div>
  );
}

AWSToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

AWSToolSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default AWSToolSelectInput;