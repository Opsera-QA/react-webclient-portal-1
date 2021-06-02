import React, { useEffect, useState, useContext } from "react";
import pipelineActions from "components/workflow/pipeline-actions.js";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import { OverlayTrigger, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

import { faSpinner, faExclamationCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { RegistryPopover } from "../utility";
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

function JenkinsStepConfSFDCConfiguration({ dataObject, setDataObject, disabled, renderForm }) {
	const [isSFDCSearching, setisSFDCSearching] = useState(false);
	const [sfdcList, setSFDCList] = useState([]);
	//const contextType = useContext(AuthContext);
	const { getAccessToken } = useContext(AuthContext);
	const jenkinsJobType = dataObject.data.jenkinsJobType;
	const toolJobType = dataObject.data.toolJobType;
	const jobType = dataObject.data.jobType;


	// search sfdc
	useEffect(() => {
		async function fetchSFDCDetails(service) {
			setisSFDCSearching(true);
			let results = await pipelineActions.getToolsList(service, getAccessToken);

			if (results) {
				const filteredList = results.filter((el) => el.configuration !== undefined); //filter out items that do not have any configuration data!
				if (filteredList) {
					setSFDCList(filteredList);
					setisSFDCSearching(false);
				}
			}
		}
		// Fire off our API call
		fetchSFDCDetails("sfdc-configurator");
	}, []);


	const displayOverlayTrigger = (field) => {
		if(field,dataObject.data[field]){
		return (<OverlayTrigger
			trigger="click"
			rootClose
			placement="left"
			overlay={RegistryPopover(sfdcList[sfdcList.findIndex((x) => x.id === dataObject.data[field])])}
		>
			<FontAwesomeIcon
				icon={faEllipsisH}
				className="fa-pull-right pointer pr-1"
				onClick={() => document.body.click()}
			/>
		</OverlayTrigger>);
		}
		return null;
	};
	const handleDTOChange = (fieldName, selectedOption) => {
		if (selectedOption.id && selectedOption.configuration) {
			let newDataObject = { ...dataObject };
			newDataObject.setData('sfdcToolId', selectedOption.id);
			newDataObject.setData('accountUsername', selectedOption.configuration ? selectedOption.configuration.accountUsername : "");
			newDataObject.setData('sfdcUnitTestType', "");
			setDataObject({ ...newDataObject });
		}
	};
	const handleSFDCCreatePackageXMLChange = (checked) => {
		let newDataObject = { ...dataObject };
		newDataObject.setData('isOrgToOrg', checked);
		newDataObject.setData('sfdcDestToolId', "");
		newDataObject.setData('destAccountUsername', "");
		setDataObject({ ...newDataObject });
	};
	const handleDestinationSFDCChange = (fieldname, selectedOption) => {
		if (selectedOption.id && selectedOption.configuration) {
			let newDataObject = { ...dataObject };
			newDataObject.setData('sfdcDestToolId', selectedOption.id);
			newDataObject.setData('destAccountUsername', selectedOption.configuration ? selectedOption.configuration.destAccountUsername : "");
			setDataObject({ ...newDataObject });
		}
	};
	const handleUnitTestChange = (fieldName, selectedOption) => {
		let newDataObject = { ...dataObject };
		newDataObject.setData('sfdcUnitTestType', selectedOption.value);
		setDataObject({ ...newDataObject });
	};
	const loader = () => {
		if (isSFDCSearching) {
			return (<div className="form-text text-muted mt-2 p-2">
				<FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
							Loading SalesForce accounts from Tool Registry
			</div>);
		}
	};
	const footer = () => {
		return (<div className="form-text text-muted p-2">
			<FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
		No accounts have been registered for SalesForce. Please go to
			<Link to="/inventory/tools">Tool Registry</Link> and add a SalesForce (SFDC) Account entry
		in order to proceed.
		</div>);
	};

	const renderSFDCPushArtifacts = () => {
		if (jobType != "SFDC PUSH ARTIFACTS") {
			if (renderForm && sfdcList && sfdcList.length > 0) {
				return (<>
					{displayOverlayTrigger('sfdcToolId')}
					<SelectInputBase
						fieldName={'sfdcToolId'}
						dataObject={dataObject}
						setDataFunction={handleDTOChange}
						setDataObject={setDataObject}
						placeholderText={""}
						selectOptions={sfdcList}
						valueField="id"
						textField="name"
						disabled={disabled}
					/>
				</>);
			} else {
				return footer();
			}
		}
		return null;
	};
	const renderDestinationSalesForceCredentials = () => {
		if (dataObject.data.isOrgToOrg) {
			if (renderForm && sfdcList && sfdcList.length > 0) {
				return (<>
					{displayOverlayTrigger('sfdcDestToolId')}
					<SelectInputBase
						fieldName={'sfdcDestToolId'}
						dataObject={dataObject}
						setDataFunction={handleDestinationSFDCChange}
						setDataObject={setDataObject}
						placeholderText={""}
						selectOptions={sfdcList}
						valueField="id"
						textField="name"
						disabled={disabled}
					/>
					{dataObject.data.destAccountUsername && dataObject.data.destAccountUsername.length > 0 && (
						<div className="text-right pt-2">
							<OverlayTrigger
								trigger="click"
								rootClose
								placement="left"
								overlay={RegistryPopover(
									sfdcList[sfdcList.findIndex((x) => x.id === dataObject.data.sfdcDestToolId)]
								)}
							>
								<Button variant="outline-dark" size="sm">Info</Button>
							</OverlayTrigger>
						</div>
					)}
				</>);
			} else {
				return footer();
			}
		}
		return null;
	};
	const renderSFDCUnitTesting = () => {
		if (dataObject.data.jobType === "SFDC UNIT TESTING" && dataObject.data.sfdcToolId.length > 0) {
			return (<>
				<SelectInputBase
					fieldName={'sfdcUnitTestType'}
					dataObject={dataObject}
					setDataFunction={handleUnitTestChange}
					setDataObject={setDataObject}
					placeholderText={"Please select type of unit test"}
					selectOptions={UNIT_TEST_OPTIONS}
					valueField="id"
					textField="label"
					disabled={disabled}
				/>
			</>);
		}
		return null;


	};
	const renderUnitTestSelectionValidateJob = () => {
		if ((dataObject.data.jobType === "SFDC VALIDATE PACKAGE XML" || dataObject.data.jobType === "SFDC DEPLOY") && dataObject.data.sfdcToolId.length > 0) {
			return (<SelectInputBase
				fieldName={'sfdcUnitTestType'}
				dataObject={dataObject}
				setDataFunction={handleUnitTestChange}
				setDataObject={setDataObject}
				placeholderText={"Please select type of unit test"}
				selectOptions={PROD_UNIT_TEST_OPTIONS}
				valueField="id"
				textField="label"
				disabled={disabled}
			/>);
		}
	};


	if (jenkinsJobType === "sfdc-ant" || jenkinsJobType === "sfdc-ant-profile" || (toolJobType && toolJobType.includes("SFDC"))) {
		return (<>
			{loader()}
			{renderSFDCPushArtifacts()}
			{dataObject.data.jobType === "SFDC CREATE PACKAGE XML" ? (<Form.Check
				type="checkbox"
				label="Compare with destination SFDC Org"
				checked={dataObject.data.isOrgToOrg}
				onChange={(e) => handleSFDCCreatePackageXMLChange(e.target.checked)}
			/>) : null}
			{renderDestinationSalesForceCredentials()}
			{renderSFDCUnitTesting()}
			{renderUnitTestSelectionValidateJob()}
		</>);
	}


	return null;
}

JenkinsStepConfSFDCConfiguration.propTypes = {
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,
	renderForm: PropTypes.any

};

export default JenkinsStepConfSFDCConfiguration;