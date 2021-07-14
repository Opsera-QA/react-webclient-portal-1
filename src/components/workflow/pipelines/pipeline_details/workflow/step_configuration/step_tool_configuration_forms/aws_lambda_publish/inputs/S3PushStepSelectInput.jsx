import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function S3StepSelectInput({
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
  const [s3List, setS3List] = useState([]);
  const [isS3Searching, setIsS3Searching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select S3 Push Step");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchS3StepDetails();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchS3StepDetails = async () => {
    setIsS3Searching(true);
    try {
      if (plan && stepId) {
        let pipelineSteps = formatStepOptions(plan, stepId);
        let dockerSteps = pipelineSteps.filter((step) => step.tool.tool_identifier.toLowerCase() === "s3");
        if (dockerSteps.length === 0) {
          let newDataObject = { ...dataObject };
          newDataObject.setData("s3StepId", "");
          setDataObject({ ...newDataObject });
        }
        setS3List(dockerSteps);
        if (dockerSteps.length === 0) {
          setPlaceholder("No S3 Push Steps Configured");
        }
      }
    } catch (error) {
      setPlaceholder("No S3 Push Steps Configured");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsS3Searching(false);
    }
  };

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
  };

  if (s3List === null || s3List.length === 0) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      className={"mb-3"}
      setDataObject={setDataObject}
      selectOptions={s3List ? s3List : []}
      busy={isS3Searching}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (s3List == null || s3List.length === 0))}
    />
  );
}

S3StepSelectInput.propTypes = {
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

S3StepSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "s3StepId",
};

export default S3StepSelectInput;
