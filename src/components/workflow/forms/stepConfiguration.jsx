import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";


const INITIAL_DATA = {
  name: "",
  type: "",
  tool_identifier: "",
  active: true
};

function StepConfiguration( { data, stepId, parentCallback }) {
  const { getAccessToken } = useContext(AuthContext);
  const { plan } = data.workflow;
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [disableToolSelect, setDisableToolSelect] = useState(false);
  const [toolList, setToolList] = useState([]);


  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      if( plan && stepId ) {
        try {
          const stepIndex = getStepIndex(stepId);
          await loadFormData(plan[stepIndex]);                        
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("Request was canceled via controller.abort");
            return;
          }        
        }
      }
    };
    runEffect();
    return () => {
      setRenderForm(false); 
      controller.abort();      
    };
  }, [stepId, plan]);

  const getToolList = async () => {
    try {
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tool", {});      
      setToolList(toolResponse.data);
      console.log(toolResponse.data);
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const loadFormData = async (step) => {
    await getToolList();    
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
    setRenderForm(true);
  };

  const getStepType = (type, tool) => {
    if (type === null || type === undefined) {
      if (tool && tool.tool_identifier) {
        return toolList[toolList.findIndex(x => x.identifier === tool.tool_identifier)].tool_type_identifier;
      }      
    } 
    return type;
  };

  const callbackFunction = () => {   
    console.log(stepId);
    const stepArrayIndex = getStepIndex(stepId); 
    console.log(plan[stepArrayIndex]);
    if (validateRequiredFields() && plan[stepArrayIndex] !== undefined) {            
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
    console.log("selectedOption", selectedOption);
    setFormData({ ...formData, tool_identifier: selectedOption.identifier, type: selectedOption.tool_type_identifier });    
  };

   
  return (
    <Form>
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
          {renderForm && toolList ?
            <DropdownList
              data={toolList} 
              valueField='identifier'
              disabled={!formData.active || disableToolSelect}
              textField='name'
              defaultValue={toolList[toolList.findIndex(x => x.identifier === formData.tool_identifier)]}
              onChange={handleToolIdentifierChange}             
            /> : null }
          <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text>
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