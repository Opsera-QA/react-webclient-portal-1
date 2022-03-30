import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import Select from "react-select";

function ClusterSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [clusters, setClusters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Cluster");

  useEffect(() => {
    if (!disabled) {
      setClusters([]);
      loadData();
    }
    if (disabled && tool_prop.length > 0) {
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadTypes();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTypes = async () => {
    try {
      const res = await OctopusStepActions.getClusters(dataObject.getData("toolId"),dataObject.getData("awsToolConfigId"), getAccessToken);
      if (res && res.status === 200) {
        setClusters(res.data);
        setPlaceholder("Select Cluster");
        return;
      }
      setClusters([]);
    } catch (error) {
      setPlaceholder("No Clusters Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "clusterName") {
      let newDataObject = dataObject;
      newDataObject.setData("clusterName", value);
      setDataObject({ ...newDataObject });
      return;
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={handleDTOChange}
        setDataObject={setDataObject}
        selectOptions={clusters ? clusters : []}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (clusters == null || clusters.length === 0))}
      />
    </div>
  );
}

ClusterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

ClusterSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default ClusterSelectInput;