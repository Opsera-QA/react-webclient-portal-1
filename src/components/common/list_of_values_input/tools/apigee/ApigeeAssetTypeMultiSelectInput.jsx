import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { APIGEE_ASSET_TYPES } from "./apigee.constants";


function ApigeeAssetTypeMultiSelectInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    clearDataFunction,
    disabled,
  }) {
  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={APIGEE_ASSET_TYPES}      
      busy={false}      
      placeholderText={"Select Apigee Asset Types"}
      valueField={"value"}
      textField={"name"}
      disabled={disabled}
    />
  );
}

ApigeeAssetTypeMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

export default ApigeeAssetTypeMultiSelectInput;
