
import React from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";
import { RegistryPopover } from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/utility";
import { OverlayTrigger, Button } from "react-bootstrap";
import { faExclamationCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function JenkinsDestinationSalesForceCredentialsInput({ dataObject, setDataObject, sfdcList, disabled, busy }) {

  const handleDestinationSFDCChange = (fieldname, selectedOption) => {
		if (selectedOption.id && selectedOption.configuration) {
			let newDataObject = { ...dataObject };
			newDataObject.setData('sfdcDestToolId', selectedOption.id);
			newDataObject.setData('destAccountUsername', selectedOption.configuration ? selectedOption.configuration.destAccountUsername : "");
			setDataObject({ ...newDataObject });
		}
	};

  const displayOverlayTrigger = (field) => {
    if (field, dataObject.data[field]) {
      return (<OverlayTrigger
        trigger="click"
        rootClose
        placement="left"
        overlay={RegistryPopover(sfdcList[sfdcList.findIndex((x) => x.id === dataObject.data[field])])}
      >
        <IconBase
          icon={faEllipsisH}
          className={"fa-pull-right pointer pr-1"}
          onClickFunction={() => document.body.click()}
        />
      </OverlayTrigger>);
    }
    return null;
  };

  const footer = () => {
    return (<div className="form-text text-muted p-2">
      <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
		  No accounts have been registered for Salesforce. Please go to
      <Link to="/inventory/tools">Tool Registry</Link> and add a Salesforce (SFDC) Account entry
		  in order to proceed.
    </div>);
  };

  if (busy ||  (sfdcList && sfdcList.length > 0)) {
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
        disabled={disabled || busy}
        busy={busy}
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

JenkinsDestinationSalesForceCredentialsInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  sfdcList: PropTypes.any,
  busy: PropTypes.bool,
};

JenkinsDestinationSalesForceCredentialsInput.defaultProps = {
  disabled: false,
  busy: false
};

export default JenkinsDestinationSalesForceCredentialsInput;