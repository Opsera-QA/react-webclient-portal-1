import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const UNIT_TEST_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "RunLocalTests", label: "Run Local Tests" },
  { value: "RunAllTestsInOrg", label: "Run All Tests In Org" },
  { value: "RunSpecifiedTests", label: "Run Specified Tests" },
];

const PROD_UNIT_TEST_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "NoTestRun", label: "No Test Run" },
  { value: "RunLocalTests", label: "Run Local Tests" },
  { value: "RunAllTestsInOrg", label: "Run All Tests In Org" },
  { value: "RunSpecifiedTests", label: "Run Specified Tests" },
];

function SfdcUnitTestTypeSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled, isProd }) {
  console.log(isProd);
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={isProd ? PROD_UNIT_TEST_OPTIONS : UNIT_TEST_OPTIONS }
      setDataFunction={setDataFunction}
      valueField="value"
      textField="label"
      disabled={disabled}
    />
  );
}

SfdcUnitTestTypeSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled:  PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
  ]),
  isProd: PropTypes.bool,
};

export default SfdcUnitTestTypeSelectInput;
