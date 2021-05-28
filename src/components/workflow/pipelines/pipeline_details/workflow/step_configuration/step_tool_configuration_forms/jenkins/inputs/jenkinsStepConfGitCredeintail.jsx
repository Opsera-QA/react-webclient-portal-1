import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

import {
	faExclamationCircle,

} from "@fortawesome/free-solid-svg-icons";

function JenkinsStepConfGitCredential({ fieldName, dataObject, setDataObject, disabled, jenkinsList, jobsList, accountsList, isWorkspacesSearching }) {

	//formData.jenkinsUrl && jenkinsList.length > 0 && formData.jobType && formData.jobType.length > 0 &&
	const jobType = dataObject.getData('jobType');
	console.log(jobType, 'Accoutn page ****');
	const jenkinsUrl = dataObject.getData('jenkinsUrl');
	const excludeArr = ["SFDC VALIDATE PACKAGE XML", "SFDC UNIT TESTING", "SFDC DEPLOY"];
	const isOrgToOrg = dataObject.getData('isOrgToOrg');


	const handleDTOChange = (fieldName, value) => {

		let newDataObject = { ...dataObject };
		const emptyFields = ['repoId', 'gitUrl', 'sshUrl', 'repository', 'workspace',
			'workspaceName', 'branch', 'projectId', 'defaultBranch'];

		console.log(value, '**** selected value');
		newDataObject.setData('gitToolId', value.toolId);
		newDataObject.setData('gitCredential', value.gitCredential);
		newDataObject.setData('gitUserName', value.gitUserName);
		newDataObject.setData('service', value.service);
		emptyFields.forEach(item => newDataObject.setData(item), "");
		setDataObject({ ...newDataObject });
	};

	const renderNotification = () => {
		if (accountsList.length < 1) {
			return (<div className="form-text text-muted p-2">
				<Form.Label className="w-100">
					Account*
        </Form.Label>
				<FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No Credentials have been created for <span>{jenkinsUrl}</span>. Please go to
				<Link to="/inventory/tools"> Tool Registry</Link> and add credentials for this Jenkins in order to proceed.
			</div>);
		} else {
			return null;
		}
	};

	if (jenkinsUrl && jenkinsList.length > 0 && jobType && jobType.length > 0) {
		if (!excludeArr.includes(jobType) && !isOrgToOrg) {
			return (
				<>
					{renderNotification()}
					{accountsList !== undefined && accountsList.length > 0 ? (
						<SelectInputBase
							fieldName={fieldName}
							dataObject={dataObject}
							setDataFunction={handleDTOChange}
							setDataObject={setDataObject}
							placeholderText={"Select Account"}
							selectOptions={accountsList}
							valueField="gitCredential"
							textField="gitCredential"
							disabled={disabled}
						/>) : null}
				</>
			);
		}
	}

	return null;
}

JenkinsStepConfGitCredential.propTypes = {
	fieldName: PropTypes.string,
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,
	jenkinsList: PropTypes.any,
	jobsList: PropTypes.any,
	accountsList: PropTypes.any,
	isWorkspacesSearching: PropTypes.any
};

JenkinsStepConfGitCredential.defaultProps = {
	fieldName: "gitCredential", //Account
	disabled: false,

};

export default JenkinsStepConfGitCredential;
