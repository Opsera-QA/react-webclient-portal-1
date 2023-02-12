
import React from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";

const UNIT_TEST_OPTIONS = [
	{ value: "", label: "Select One", isDisabled: "yes" },
	{ value: "RunLocalTests", label: "Run Local Tests" },
	{ value: "RunAllTestsInOrg", label: "Run All Tests In Org" },
	{ value: "RunSpecifiedTests", label: "Run Specified Tests" },
	{ value: "AutoIncludeTests", label: "Auto Include Tests" },
];
const PROD_UNIT_TEST_OPTIONS = [
	{ value: "", label: "Select One", isDisabled: "yes" },
	{ value: "NoTestRun", label: "No Test Run" },
	{ value: "RunLocalTests", label: "Run Local Tests" },
	{ value: "RunAllTestsInOrg", label: "Run All Tests In Org" },
	{ value: "RunSpecifiedTests", label: "Run Specified Tests" },
	{ value: "AutoIncludeTests", label: "Auto Include Tests" },
];
function JenkinsSfdcUnitTestTypeSelectInput({ dataObject, setDataObject,  disabled }) {
    const options = dataObject.data.jobType === "SFDC UNIT TESTING" ?  UNIT_TEST_OPTIONS : PROD_UNIT_TEST_OPTIONS;
    return (<SelectInputBase
      fieldName={'sfdcUnitTestType'}
      dataObject={dataObject}
      setDataObject={setDataObject} 
      placeholderText={"Please select type of unit test"}
      selectOptions={options}
      valueField="value"
      textField="label"
      disabled={disabled}
    />);
  
}

JenkinsSfdcUnitTestTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
 
  
};

JenkinsSfdcUnitTestTypeSelectInput.defaultProps = {
  disabled: false,
 
};

export default JenkinsSfdcUnitTestTypeSelectInput;