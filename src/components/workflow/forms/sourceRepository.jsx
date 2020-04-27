import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const SERVICE_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "GitLab" },
  { value: "github", label: "GitHub" }
];

const INITIAL_DATA = {
  name: "",
  service: "",
  repository: "", 
  branch: "",
  key: "",
  trigger_active: false
};


function SourceRepositoryConfig( { data, parentCallback }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
    
  useEffect(() => {
    if (data !== undefined) {
      let { workflow } = data;
      if (workflow.source !== undefined) {
        setFormData(workflow.source);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [data]);


  const callbackFunction = () => {
    if (validateRequiredFields()) {
      let { name, service, repository, branch, key, trigger_active } = formData;
      const item = {
        name: name,
        service: service, 
        repository: repository,
        branch: branch,
        key: key, 
        trigger_active: trigger_active
      };


      parentCallback(item);
    }
  };


  const validateRequiredFields = () => {
    console.log(formData);
    let { service, repository, branch } = formData;
    if (service.length === 0 || repository.length === 0 || branch.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };


  const handleServiceChange = (selectedOption) => {
    setFormData({ ...formData, service: selectedOption.value });
  };


  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
      
      <Form.Group controlId="repoField">
        <Form.Label>Name</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="Short description for repository." value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Service</Form.Label>
        {data.workflow.source !== undefined ?
          <DropdownList
            data={SERVICE_OPTIONS}
            valueField='id'
            textField='label'
            defaultValue={data.workflow.source.service ? SERVICE_OPTIONS[SERVICE_OPTIONS.findIndex(x => x.value === data.workflow.source.service)] : SERVICE_OPTIONS[0]}
            onChange={handleServiceChange}             
          /> : null }
      </Form.Group>

      <Form.Group controlId="repoField">
        <Form.Label>Repository</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="Project Repository ID" value={formData.repository || ""} onChange={e => setFormData({ ...formData, repository: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Branch</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="Branch to watch" value={formData.branch || ""} onChange={e => setFormData({ ...formData, branch: e.target.value })} />
      </Form.Group>
      {/* <Form.Group controlId="branchField">
        <Form.Label>Security Key</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="Branch to watch" value={formData.key || ""} onChange={e => setFormData({ ...formData, key: e.target.value })} />
      </Form.Group> */}
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Enable Triggered Pipelines" checked={formData.trigger_active ? true : false} onChange={() => setFormData({ ...formData, trigger_active: !formData.trigger_active })}  />        
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

SourceRepositoryConfig.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default SourceRepositoryConfig;