import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function JenkinsStepConfBuilXmlStepInfo({ dataObject, setDataObject, disabled, listOfSteps }) {

	const jobType = dataObject.getData('jobType');

	const handleDTOChange = (selectedOption) => {
		let newDataObject = { ...dataObject };
		newDataObject.setData('stepIdXML', selectedOption._id);
		setDataObject({ ...newDataObject });
	};
	if (jobType !== "SFDC PUSH ARTIFACTS") {
		return null;
	}

	if (listOfSteps) {
		return (<SelectInputBase
			fieldName={'stepIdXML'}
			dataObject={dataObject}
			setDataFunction={handleDTOChange}
			setDataObject={setDataObject}
			placeholderText={"Select Build-Xml Step Info"}
			selectOptions={listOfSteps}
			valueField="gitCredential"
			textField="gitCredential"
			disabled={disabled}
		/>);
	} else {
		return (
			<FontAwesomeIcon
				icon={faSpinner}
				spin
				className="text-muted ml-2"
				fixedWidth
			/>
		);
	}


}
JenkinsStepConfBuilXmlStepInfo.propTypes = {
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,
	listOfSteps: PropTypes.any,
};



export default JenkinsStepConfBuilXmlStepInfo;
