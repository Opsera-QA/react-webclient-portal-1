import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button, InputGroup } from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCopy } from "@fortawesome/free-solid-svg-icons";

//value maps to the tool_identifer string used for each tool
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
        <Form.Label>Service*</Form.Label>
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
        <Form.Label>Repository*</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="Project repository name" value={formData.repository || ""} onChange={e => setFormData({ ...formData, repository: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Branch*</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="Branch to watch" value={formData.branch || ""} onChange={e => setFormData({ ...formData, branch: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="securityKeyField">
        <Form.Label>Security Key/Token</Form.Label>
        <Form.Control maxLength="75" type="password" placeholder="Optional security key/token from service" value={formData.key || ""} onChange={e => setFormData({ ...formData, key: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox" className="mt-1">
        <Form.Check type="checkbox" label="Enable Event Based Trigger" checked={formData.trigger_active ? true : false} onChange={() => setFormData({ ...formData, trigger_active: !formData.trigger_active })}  />        
      </Form.Group>
      
      {formData.trigger_active === true ? <EventBasedTriggerDetails pipelineId={data._id} /> : null }
      
      <Button variant="primary" type="button" className="mt-2"
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}


function EventBasedTriggerDetails({ pipelineId }) {
  const apiUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const [triggerUrl, setTriggerUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  
  useEffect(() => {
    setTriggerUrl(`${apiUrl}/hooks/${pipelineId}/source`);
    setCopySuccess(false);
  }, [pipelineId]);

  const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
    setCopySuccess(true);
  };

  return (
    <div className="mt-2 mb-2">
      <Form.Group controlId="branchField">
        <Form.Label>Wesbhook URL</Form.Label>
        
        <InputGroup className="mb-3">
          <Form.Control maxLength="75" type="text" value={triggerUrl || ""} disabled={true} />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => { copyToClipboard(triggerUrl); }}><FontAwesomeIcon icon={faCopy} /></Button>            
          </InputGroup.Append>
        </InputGroup>

        <Form.Text className="text-muted">
          Use the URL above to configure your Webhook in the source repository.  If a Secret Key/Token is required, ensure the settings above match your hook configuration.  Ensure 
          Enable SSL is selected in your repo, only PUSH events are configured and for GitHub, make sure the Content Type is: application/json.
        </Form.Text>
      </Form.Group>
      { copySuccess ? <div className="green">Copied to Clipboard!</div> : <div className="py-2"></div> }
    </div>
  );
}




SourceRepositoryConfig.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

EventBasedTriggerDetails.propTypes = {
  pipelineId: PropTypes.string
};

export default SourceRepositoryConfig;