import React from "react";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from "prop-types";
import { RegistryPopover } from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/utility";
import { OverlayTrigger} from "react-bootstrap";
import { faExclamationCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function JenkinsSfdcInput({ dataObject, setDataObject, sfdcList, disabled, busy }) {
  const handleDTOChange = (fieldName, selectedOption) => {
    if (selectedOption.id && selectedOption.configuration) {
      let newDataObject = { ...dataObject };
      newDataObject.setData('sfdcToolId', selectedOption.id);
      newDataObject.setData('accountUsername', selectedOption.configuration ? selectedOption.configuration.accountUsername : "");
      newDataObject.setData('sfdcUnitTestType', "");
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
    return (
    <div className="form-text text-muted p-2">
      <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
		  No accounts have been registered for Salesforce. Please go to
      <Link to="/inventory/tools">Tool Registry</Link> and add a Salesforce (SFDC) Account entry
		  in order to proceed.
    </div>
    );
  };
  
  return (<>
    {displayOverlayTrigger('sfdcToolId')}
    <SelectInputBase
      fieldName={'sfdcToolId'}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={""}
      setDataFunction={handleDTOChange}
      selectOptions={sfdcList}
      valueField="id"
      textField="name"
      disabled={disabled || busy}
      busy={busy}
    />
    {!busy && (!sfdcList || sfdcList.length == 0)  && footer()}
  </>);
  
}
JenkinsSfdcInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  sfdcList: PropTypes.any,
  busy: PropTypes.bool,
};

JenkinsSfdcInput.defaultProps = {
  disabled: false,
  busy: false
};

export default JenkinsSfdcInput;