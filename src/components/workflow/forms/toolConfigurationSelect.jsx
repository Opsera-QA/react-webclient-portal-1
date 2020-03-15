import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const PLATFORM_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "GitLab" },
  { value: "github", label: "GitHub" }
];


function ToolConfigurationSelect( { data, parentCallback }) {
  const { source } = data.workflow;
  const [platform, setPlatform] = useState(source.name);
  const [repository, setRepository] = useState(source.repository ? source.repository : "");
  const [branch, setBranch] = useState(source.branch ? source.branch : "");
  
  //TODO: get configurations based on tool type "use that ?filter option in API"
  //TODO: This should be passed the tool type and use that to define the UI


  const handleSelectChange = (selectedOption) => {
    setPlatform(selectedOption.value);    
  };

  const callbackFunction = () => {
    const item = {
      name: platform,
      repository: repository,
      branch: branch
    };
    parentCallback(item);
  };

  return (
    <Form>
      
      <Form.Group controlId="toolSelect">
        <Form.Text className="text-muted mb-2 mt-1">
          Select the tool configuration from the dropdown below.  In order to add a tool to a step, it must be supported 
          by that step and must be configured in the <Link to="/api_connector">Tools Interface</Link>.
        </Form.Text>
        <Form.Label>Configuration</Form.Label>
        <Select
          className="basic-single mr-2"
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          classNamePrefix="select"
          defaultValue={platform ? PLATFORM_OPTIONS[PLATFORM_OPTIONS.findIndex(x => x.value ===platform)] : PLATFORM_OPTIONS[0]}
          isDisabled={false}
          isClearable={false}
          isSearchable={true}
          name="PLATFORM-SELECT"
          options={PLATFORM_OPTIONS}
          onChange={handleSelectChange}
        />
      </Form.Group>

      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }} 
        disabled={true}>
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
    </Form>
  );
}

ToolConfigurationSelect.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default ToolConfigurationSelect;