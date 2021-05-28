import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { Button, Form, OverlayTrigger, Popover, Row, Col, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools,faEllipsisH } from "@fortawesome/pro-light-svg-icons";
import {RegistryPopover} from "../utility";

import {
	getErrorDialog
} from "../../../../../../../../common/toasts/toasts";
function JenkinsStepConfigTool({ dataObject, setDataObject, disabled, jenkinsList, renderForm, setToast, setShowToast, setAccountsList, setJobsList }) {

	const handleDTOChange = (fieldName, selectedOption) => {

		if (!selectedOption.configuration) {
			let errorMessage =
				"Connection information missing for this tool!  This Jenkins tool does not have connection details defined in its Tool Registry record.  Please go into Tool Registry and add connection information in order for Opsera to work with this tool.";
			let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
			setToast(toast);
			setShowToast(true);
			return;
		}
		if (selectedOption.id && selectedOption.configuration) {
			let newDataObject = { ...dataObject };
			newDataObject.setData('toolConfigId', selectedOption.id);
			newDataObject.setData('jenkinsUrl', selectedOption.configuration.jenkinsUrl);
			newDataObject.setData('jUserId', selectedOption.configuration.jUserId);
			newDataObject.setData('jenkinsPort', selectedOption.configuration.jenkinsPort);
			newDataObject.setData('autoScaleEnable', selectedOption.configuration.autoScaleEnable);
			const arr = ['gitToolId', 'repoId', 'gitUrl', 'sshUrl', 'service', 'gitCredential', 'gitUserName', 'repository', 'workspace', 'workspaceName', 'branch', 'toolJobId', 'toolJobType', 'rollbackBranchName', 'stepIdXML', 'sfdcDestToolId', 'destAccountUsername', 'sfdcToolId', 'accountUsername', 'projectId', 'defaultBranch'];
			arr.forEach(field => {
				newDataObject.setData(field, "");
			});
			setDataObject({ ...newDataObject });
		}
		if (selectedOption.accounts && selectedOption.jobs) {

			setAccountsList(selectedOption.accounts);
			setJobsList(selectedOption.jobs);
		}
	};
	const getInfoText = () => {
		if (dataObject.data.toolConfigId && dataObject.data.toolConfigId.length > 0) {
			return (
				<Link to={"/inventory/tools/details/" + dataObject.data.toolConfigId}>
					<FontAwesomeIcon icon={faTools} className="pr-1" /> View/edit this tool&apos;s Registry settings
				</Link>);
		}
		return null;
	};
	const renderOverlayTrigger =()=>{
		return(
			<OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={RegistryPopover(jenkinsList[jenkinsList.findIndex((x) => x.id === dataObject.data.toolConfigId)])}
            >
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="fa-pull-right pointer pr-1"
                onClick={() => document.body.click()}
              />
            </OverlayTrigger>
		);
	};
	if (renderForm && jenkinsList && jenkinsList.length > 0) {
		return (
			<>
				{renderOverlayTrigger()}
				<SelectInputBase
					fieldName={"toolConfigId"}
					dataObject={dataObject}
					setDataFunction={handleDTOChange}
					setDataObject={setDataObject}
					placeholderText={"Select Job"}
					selectOptions={jenkinsList}
					valueField="id"
					textField="name"
					disabled={disabled}
					busy={!jenkinsList}
				/>
				{getInfoText()}
			</>
		);
	}
	return null;


}

JenkinsStepConfigTool.propTypes = {
	dataObject: PropTypes.object,
	setDataObject: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	jenkinsList: PropTypes.any,
	renderForm: PropTypes.any,
	setToast: PropTypes.func,
	setShowToast: PropTypes.func,
	setAccountsList: PropTypes.func,
	setJobsList: PropTypes.func
};

export default JenkinsStepConfigTool;