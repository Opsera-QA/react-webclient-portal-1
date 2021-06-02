import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";


function JenkinsStepConfigJobType({ dataObject, setDataObject, disabled, setShowToast }) {
	const JOB_OPTIONS = [
		{ value: "job", label: "Custom Job" },
		{ value: "opsera-job", label: "Opsera Managed Jobs" },
		{ value: "sfdc-ant", label: "SFDC Package Generation Job" },
		{ value: "sfdc-ant-profile", label: "SFDC Profile Migration" },
	];
	const handleDTOChange = (fieldName, selectedOption) => {
		let newDataObject = { ...dataObject };

		newDataObject.setData('jenkinsJobType', selectedOption.value);
		setShowToast(false);

		switch (selectedOption.value) {
			case "sfdc-ant":
				newDataObject.setData("buildType", 'ant');
				newDataObject.setData("jobDescription", "PACKAGEXML_CREATION");
				newDataObject.setData("jobType", "SFDC CREATE PACKAGE XML");
				newDataObject.setData("isOrgToOrg", false);
				break;
			case "sfdc-ant-profile":
				newDataObject.setData("buildType", "ant");
				newDataObject.setData("jobDescription", "Profile-migration");
				newDataObject.setData("jobType", "SFDC PROFILE DEPLOY");
				newDataObject.setData("isOrgToOrg", true);
				break;
			default:
				newDataObject.setData("sfdcToolId", "");
				newDataObject.setData("accountUsername", "");
				newDataObject.setData("buildType", "gradle"); // defaults
				newDataObject.setData("jobDescription", "");
				newDataObject.setData("jobType", "BUILD"); // defaults
				newDataObject.setData("isOrgToOrg", false);
				newDataObject.setData("buildArgs", {});
				break;
		}
		newDataObject.setData("toolJobId", "");
		newDataObject.setData("toolJobType", "");
		newDataObject.setData("rollbackBranchName", "");
		newDataObject.setData("stepIdXML", "");
		newDataObject.setData("sfdcDestToolId", "");
		setDataObject({ ...newDataObject });

	};
	return (
		<>
			<SelectInputBase
				fieldName={"jenkinsJobType"}
				dataObject={dataObject}
				setDataFunction={handleDTOChange}
				setDataObject={setDataObject}
				placeholderText={"Select Job Type"}
				selectOptions={JOB_OPTIONS}
				valueField="value"
				textField="label"
				disabled={disabled}
			/>

		</>);

}

JenkinsStepConfigJobType.propTypes = {
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,
	setToast: PropTypes.func,
	setShowToast: PropTypes.func,
	
};

export default JenkinsStepConfigJobType;