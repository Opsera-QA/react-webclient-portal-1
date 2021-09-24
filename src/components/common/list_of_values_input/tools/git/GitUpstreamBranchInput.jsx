import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import { Form } from "react-bootstrap";
import CheckboxInput from "components/common/inputs/boolean/CheckboxInput";

// TODO: Rework component
function GitUpstreamBranchInput({ dataObject, setDataObject, options }) {

  const clearUpstreamBranchChange = (fieldName) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, "");
    setDataObject({ ...newDataObject });
  };
  const handleHasUpstreamBranch = (value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("hasUpstreamBranch", value);
    setDataObject({ ...newDataObject });
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    newDataObject.setData("gitBranch", selectedOption);
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = () => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({ ...newDataObject });
  };

  const getUpstreamBranchField = () => {
    if (dataObject?.getData("hasUpstreamBranch") === true) {
      return (
        <SelectInputBase
          fieldName={"upstreamBranch"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          placeholderText={"Select"}
          selectOptions={options}
          valueField="name"
          textField="name"
          clearDataFunction={clearUpstreamBranchChange}
        />
      );
    }
  };

  const getDynamicFields = () => {
    if (dataObject?.getData("isNewBranch") === true) {
      return (
        <div>
          <TextInputBase
            disabled={false}
            fieldName={"gitBranch"}
            dataObject={dataObject}
            setDataObject={setDataObject}
          />
          <CheckboxInput
            fieldName={"hasUpstreamBranch"}
            model={dataObject}
            setModel={setDataObject}
          />
          {getUpstreamBranchField()}
        </div>
      );
    }

    return (
      <SelectInputBase
        fieldName={"branch"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={options}
        valueField="name"
        textField="name"
        clearDataFunction={clearDataFunction}
      />
    );
  };

  return (
    <div>
      <CheckboxInput
        fieldName={"isNewBranch"}
        model={dataObject}
        setModel={setDataObject}
      />
      {getDynamicFields()}
    </div>
  );
}

GitUpstreamBranchInput.propTypes = {
  options: PropTypes.object,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default GitUpstreamBranchInput;
