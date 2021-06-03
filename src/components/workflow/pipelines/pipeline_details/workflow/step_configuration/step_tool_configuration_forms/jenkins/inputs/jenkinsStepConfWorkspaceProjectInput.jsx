
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, OverlayTrigger, Popover, Row, Col, Tooltip } from "react-bootstrap";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";

function JenkinsStepConfWorkspaceProjectInput({ fieldName, dataObject, setDataObject, disabled,}) {
	const toastContext = useContext(DialogToastContext);
	const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);
	const { getAccessToken } = useContext(AuthContext);
	const [workspacesList, setWorkspacesList] = useState([]);

	const jobType = dataObject.getData('jobType');
	const excludeArr = ["SFDC VALIDATE PACKAGE XML", "SFDC UNIT TESTING", "SFDC DEPLOY"];
	const isOrgToOrg = dataObject.getData('isOrgToOrg');
	const gitToolId = dataObject.getData('gitToolId');
	const service = dataObject.getData('service');
	const gitCredential = dataObject.getData('gitCredential');


	useEffect(() => {
		console.log(service, "hererer 123 123456");
		async function fetchRepos(service, gitToolId) {
			setIsWorkspacesSearching(true);
			// Set results state
			let results = await pipelineActions.searchWorkSpaces(service, gitToolId, getAccessToken);

			if (typeof (results) != "object") {
				setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
				let errorMessage =
					"Workspace information is missing or unavailable!";
				toastContext.showErrorDialog(errorMessage);
				setIsWorkspacesSearching(false);
				return;
			}
			//console.log(results);
			setWorkspacesList(results);
			setIsWorkspacesSearching(false);
		}

		if (service === "bitbucket" && gitToolId && gitToolId.length > 0) {
			// Fire off our API call
			fetchRepos(service, gitToolId);
		} else {
			setIsWorkspacesSearching(true);
			setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
		}
	}, [service, gitToolId, gitCredential]);


	const handleDTOChange = (fieldName, value) => {
		let newDataObject = { ...dataObject };
		const emptyFields = ['repository', 'repoId', 'projectId', 'gitUrl', 'sshUrl', 'branch', 'defaultBranch', 'gitBranch'];
		newDataObject.setData('workspace', value.key);
		newDataObject.setData('workspaceName', value.name);
		emptyFields.forEach(item => newDataObject.setData(item), "");
		setDataObject({ ...newDataObject });
	};
	const clearDataFunction = (fieldName)=>{
		let newDataObject = { ...dataObject };
		const emptyFields = ['repository', 'repoId', 'projectId', 'gitUrl', 'sshUrl', 'branch', 'defaultBranch', 'gitBranch'];
		newDataObject.setData('workspace', "");
		newDataObject.setData('workspaceName', "");
		emptyFields.forEach(item => newDataObject.setData(item), "");
		setDataObject({ ...newDataObject });
	};


	const renderNotification = () => {
		return isWorkspacesSearching ?
			(
				<Form.Group controlId="account" className="mt-2">
					<Form.Label>Workspace/Project*</Form.Label>
					<div className="form-text text-muted mt-2 p-2">
						<FontAwesomeIcon
							icon={faSpinner}
							spin
							className="text-muted mr-1"
							fixedWidth
						/>
              Loading workspaces from registry
          </div>
				</Form.Group>
			) : null;
	};

	if (service && service === "bitbucket" && gitToolId && !excludeArr.includes(jobType) && !isOrgToOrg) {
		return (<>
			{renderNotification()}
			{workspacesList ? (
				<SelectInputBase
					fieldName={fieldName}
					dataObject={dataObject}
					setDataFunction={handleDTOChange}
					setDataObject={setDataObject}
					placeholderText={"Select"}
					selectOptions={workspacesList}
					valueField="key"
					textField="name"
					disabled={disabled}
					clearDataFunction={clearDataFunction}
				/>
			) : null}
		</>);
	}
	return null;

}

JenkinsStepConfWorkspaceProjectInput.propTypes = {
	fieldName: PropTypes.string,
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,

};

JenkinsStepConfWorkspaceProjectInput.defaultProps = {
	fieldName: "workspace",
	disabled: false,

};

export default JenkinsStepConfWorkspaceProjectInput;
