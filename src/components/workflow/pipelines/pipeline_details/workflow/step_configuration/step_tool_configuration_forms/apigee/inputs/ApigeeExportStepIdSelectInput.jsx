import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ApigeeExportStepIdSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  textField,
  valueField,
  plan,
  stepId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Export Step Id");
  const [exportSteps, setExportSteps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      if (plan && stepId) {
        const pipelineSteps = formatStepOptions(plan, stepId);
        setExportSteps(pipelineSteps);
        return;
      }
      setExportSteps([]);
      setPlaceholder("No Export Steps Configured");
    } catch (error) {
      setPlaceholder("No Export Steps Configured");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      className={"mb-3"}
      setDataObject={setDataObject}
      selectOptions={exportSteps ? exportSteps : []}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (exportSteps == null || exportSteps.length === 0))}
    />
  );
}

ApigeeExportStepIdSelectInput.propTypes = {
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

ApigeeExportStepIdSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "exportStepId",
};

export default ApigeeExportStepIdSelectInput;
