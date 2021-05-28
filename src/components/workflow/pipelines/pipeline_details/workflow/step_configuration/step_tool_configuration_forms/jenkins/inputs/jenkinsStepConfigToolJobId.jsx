import React from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Popover, Row, Col, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {RegistryPopover} from "../utility";
import {
	faExclamationCircle,
	faEllipsisH
} from "@fortawesome/free-solid-svg-icons";

function JenkinsStepConfigToolJobId({ fieldName, dataObject, setDataObject, disabled, jenkinsList, jobsList }) {

	const jobType = dataObject.getData('jobType');
	const jenkinsUrl = dataObject.getData('jenkinsUrl');
	const toolConfigId = dataObject.getData('toolConfigId');
	const toolJobId = dataObject.getData('toolJobId');
	
	if (dataObject.getData('jenkinsJobType') != 'opsera-job') {
		return null;
	}
	const handleDTOChange = (fieldName, value) => {
		let newDataObject = { ...dataObject };
		newDataObject.setData('toolJobId', value._id);
		newDataObject.setData('toolJobType', value.type);
		newDataObject.setData(jobType, value.type[0]);
		if ('configuration' in value) {
			const keys = Object.keys(value.configuration);
			keys.forEach(item => {
				if (!(['toolJobId', 'toolJobType', 'jobType']).includes(item)) {
					newDataObject.setData(item, value.configuration[item]);
				}
			});
		}
		newDataObject.setData('rollbackBranchName', "");
		newDataObject.setData('stepIdXML', "");
		newDataObject.setData('sfdcDestToolId', "");
		newDataObject.setData('destAccountUsername', "");
		newDataObject.setData('buildToolVersion', "6.3");
		newDataObject.setData('buildArgs', {});
		setDataObject({ ...newDataObject });
	};

	const renderNoJobsMessage = () => {
		if (jobsList.length < 1) {
			return (
				<div className="form-text text-muted p-2">
					<FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No jobs have been created for <span>{jenkinsUrl}</span>. Please go to
					<Link to={"/inventory/tools/details/" + toolConfigId}> Tool Registry</Link> and add credentials
        and register a job for this Jenkins in order to proceed.{" "}
				</div>
			);
		} else {
			return null;
		}
	};

	const renderOverLayTrigger = () => {
		return (<OverlayTrigger
			trigger="click"
			rootClose
			placement="left"
			overlay={RegistryPopover(jobsList[jobsList.findIndex((x) => x._id === toolJobId)])}
		>
			<FontAwesomeIcon
				icon={faEllipsisH}
				className="fa-pull-right pointer pr-1"
				onClick={() => document.body.click()}
			/>
		</OverlayTrigger>);
	};
	if (dataObject.data.jenkinsJobType =="opsera-job" && jenkinsUrl && jenkinsList.length > 0 && jobsList.length > 0) {

		return (
			<>
				{renderOverLayTrigger()}
				{renderNoJobsMessage()}
				{jobsList !== undefined && jobsList.length > 0 && jobsList.length > 0 ? (
					<SelectInputBase
						fieldName={fieldName}
						dataObject={dataObject}
						setDataFunction={handleDTOChange}
						setDataObject={setDataObject}
						placeholderText={"Select Job Type"}
						selectOptions={jobsList}
						valueField="_id"
						textField="name"
						disabled={disabled}
					/>
				) : null}
			</>
		);
	}

	return null;
}

JenkinsStepConfigToolJobId.propTypes = {
	fieldName: PropTypes.string,
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,
	jenkinsList: PropTypes.any,
	jobsList: PropTypes.any,
};

JenkinsStepConfigToolJobId.defaultProps = {
	fieldName: "toolJobId", //job
	disabled: false,

};

export default JenkinsStepConfigToolJobId;
