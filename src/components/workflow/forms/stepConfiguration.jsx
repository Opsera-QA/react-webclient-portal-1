import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";

const TOOLS_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes", type: "" },
  { value: "jenkins", label: "Jenkins", type: "build" },
  { value: "junit", label: "JUnit", type: "unit test" },
  { value: "xunit", label: "XUnit", type: "unit test" },
  { value: "sonar", label: "Sonarcube", type: "code scan" },
  { value: "command-line", label: "Command Line Script", type: "script" },
  { value: "npm", label: "NPM Commands", type: "script" },
  { value: "teamcity", label: "TeamCity", type: "build" },
  { value: "jmeter", label: "JMeter", type: "performance" },
  { value: "selenium", label: "Selenium", type: "functional testing" },
  { value: "twistlock", label: "Twistlock", type: "security" },
  { value: "aws-deploy", label: "AWS Deploy", type: "deploy" },
  { value: "s3", label: "Publish to S3", type: "deploy" },
  { value: "gcp-deploy", label: "GCP Deploy", type: "deploy" },
  { value: "databricks-notebook", label: "Databricks Notbook", type: "orchestration" },
  { value: "ssh-upload", label: "SSH Upload", type: "deploy" },
  { value: "elastic-beanstalk", label: "AWS Elastic Beanstalk Deploy", type: "deploy" },
  { value: "approval", label: "Approval", type: "approval" }
];

const INITIAL_DATA = {
  name: "",
  type: "",
  tool_identifier: "",
  active: true
};

function StepConfiguration( { data, stepId, parentCallback }) {
  const { plan } = data.workflow;
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [disableToolSelect, setDisableToolSelect] = useState(false);


  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        const stepIndex = getStepIndex(stepId);
        await loadFormData(plan[stepIndex]);        
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);     
      controller.abort();      
    };
  }, [stepId]);

  const loadFormData = async (step) => {
    setFormData(INITIAL_DATA);    
    setDisableToolSelect(false);
    let stepType = getStepType(step.type[0], step.tool);
    setFormData({
      name: step.name,
      type: stepType,
      tool_identifier: step.tool && step.tool.tool_identifier ? step.tool.tool_identifier : "",
      active: step.active ? true : false
    });

    if (step.tool !== undefined) {
      if (step.tool.tool_identifier.length > 0) {
        setDisableToolSelect(true);
      }

    } 

  };

  const getStepType = (type, tool) => {
    if (type === null || type === undefined) {
      if (tool && tool.tool_identifier) {
        return TOOLS_OPTIONS[TOOLS_OPTIONS.findIndex(x => x.value === tool.tool_identifier)].type;
      }      
    } 
    return type;
  };

  const callbackFunction = () => {   
    if (validateRequiredFields()) {      
      let stepArrayIndex = getStepIndex(stepId); 
      plan[stepArrayIndex].name = formData.name;
      plan[stepArrayIndex].type[0] = formData.type;
      plan[stepArrayIndex].tool = { ...plan[stepArrayIndex].tool, tool_identifier: formData.tool_identifier };    
      plan[stepArrayIndex].active = formData.active;
      parentCallback(plan);      
    }
  };

  const getStepIndex = (step_id) => {
    let stepArrayIndex = plan.findIndex(x => x._id === step_id); 
    return stepArrayIndex;
  };

  const validateRequiredFields = () => {    
    setFormMessage("");  
    console.log("form", formData);
    if (formData.name.length === 0 || formData.tool_identifier.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    }    
    return true;
  };

  const handleToolIdentifierChange = (selectedOption) => {
    setFormData({ ...formData, tool_identifier: selectedOption.value, type: selectedOption.type });    
  };

   
  return (
    <Form>
      {/* <h6 className="upper-case-first">{typeof(stepName) !== "undefined" ? stepName + ": " : null}
        {typeof(stepTool) !== "undefined" ? stepTool.tool_identifier : null}</h6> */}
      <div className="text-muted mt-1 mb-3">Each step requires a tool to be selected before it can be configured.  Please select the required tool and give the step a name below.</div>
      
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}
      <div className="mt-4 mb-4">
        <Form.Check 
          type="switch"  
          id="enabled-switch"
          label="Step Enabled" 
          checked={formData.active ? true : false}   
          onChange={() => setFormData({ ...formData, active: !formData.active })} 
        />

        <Form.Group controlId="name" className="mt-2">
          <Form.Label>Step Name*</Form.Label>
          <Form.Control maxLength="50" type="text" disabled={!formData.active} placeholder="" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        </Form.Group>

        <Form.Group controlId="tool"  className="mt-2">
          <Form.Label>Tool*</Form.Label>
          {renderForm ?
            <DropdownList
              data={TOOLS_OPTIONS} 
              valueField='id'
              disabled={!formData.active || disableToolSelect}
              textField='label'
              defaultValue={TOOLS_OPTIONS[TOOLS_OPTIONS.findIndex(x => x.value === formData.tool_identifier)]}
              onChange={handleToolIdentifierChange}             
            /> : null }
        </Form.Group>
      </div> 
      
      <Button variant="primary" type="button"  
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}


StepConfiguration.propTypes = {
  data: PropTypes.object,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func
};

export default StepConfiguration;