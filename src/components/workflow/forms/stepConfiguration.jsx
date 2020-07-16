import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { axiosApiService } from "api/apiService";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";


const INITIAL_DATA = {
  name: "",
  tool_type: "",
  type: "",
  tool_identifier: "",
  active: true
};

function StepConfiguration( { data, stepId, parentCallback }) {
  const { getAccessToken } = useContext(AuthContext);
  const { plan } = data.workflow;
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lockTool, setLockTool] = useState(false);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolList, setToolList] = useState([]);
  const [masterToolList, setMasterToolList] = useState([]);
  const [isToolListSearching, setIsToolListSearching] = useState(false);
  const [isToolTypeSearching, setIsToolTypeSearching] = useState(false);
  

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      if( plan && stepId ) {
        try {
          setIsLoading(true);
          setLockTool(false);
          const stepIndex = getStepIndex(stepId);
          await loadFormData(plan[stepIndex]);  
          await fetchToolDetails();                                
          setIsLoading(false);
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
      setIsLoading(false);
      controller.abort();      
    };
  }, [stepId, plan]);

  useEffect(
    () => {
      async function fetchToolTypes(){
        try {
          setIsToolTypeSearching(true);
          const accessToken = await getAccessToken();
          const toolResponse = await axiosApiService(accessToken).get("/registry/types", {});      
          setToolTypeList(formatOptions(toolResponse.data));
          setIsToolTypeSearching(false);      
        }
        catch (err) {
          console.log(err.message);
        }
      }
      // Fire off our API call
      fetchToolTypes();
    },
    []
  );
  

  const fetchToolDetails = async () => {
    try {
      setIsToolListSearching(true);
      const accessToken = await getAccessToken();
      const toolResponse = await axiosApiService(accessToken).get("/registry/tools", {});
      setToolList(toolResponse.data);
      setMasterToolList(toolResponse.data);
      setIsToolListSearching(false);      
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const filterToolListByType = (type, masterToolList) => {
    const filteredList = masterToolList.filter(el => el.tool_type_identifier === type);
    setToolList(filteredList);         
  };

  const formatOptions = (options) => {
    options.unshift({ value: "", name : "Select One",  isDisabled: "yes" });
    return options;
  };

  const getToolDetails = async (tool_identifier) => {
    const accessToken = await getAccessToken();
    try {
      const toolResponse = await axiosApiService(accessToken).get("/registry/tool/properties/"+tool_identifier, {});      
      return toolResponse.data;
    }
    catch (err) {
      console.log(err.message);
    }
  };

  const loadFormData = async (step) => {
    setFormData(INITIAL_DATA);  
    let stepType = await getStepType(step.tool);    

    setFormData({
      name: step.name,
      type: stepType,
      tool_identifier: step.tool && step.tool.tool_identifier ? step.tool.tool_identifier : "",
      active: step.active ? true : false
    });

    if (step.tool && step.tool.tool_identifier.length > 0) {
      setLockTool(true);
    }
    
  };

  const getStepType = async (tool) => {    
    if (tool && tool.tool_identifier) {
      const toolData = await getToolDetails(tool.tool_identifier);
      return toolData.tool_type_identifier; //toolList[toolList.findIndex(x => x.identifier === tool.tool_identifier)].tool_type_identifier;
    } else {
      return null;
    }    
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

  const handleToolTypeChange = (selectedOption) => {
    console.log("selectedOption", selectedOption);
    filterToolListByType(selectedOption.identifier, masterToolList);
    setFormData({ ...formData, tool_type: selectedOption.identifier,  tool_identifier: "", type: "" });    
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
          <Form.Label>Tool Type*  {isToolTypeSearching && <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/>}</Form.Label>
          {formData.type && formData.type.length > 0 && lockTool ? 
            <>
              <Form.Control maxLength="50" type="text" disabled={true} placeholder="" value={toolTypeList[toolTypeList.findIndex(x => x.identifier === formData.type)].name || ""} />              
            </> :
            <>
              {toolTypeList.length > 0 &&
                <DropdownList
                  data={toolTypeList} 
                  valueField='identifier'
                  value={toolTypeList[toolTypeList.findIndex(x => x.identifier === formData.tool_type)]}
                  disabled={!formData.active}
                  textField='name'
                  onChange={handleToolTypeChange}             
                /> }
              <Form.Text className="text-muted">Select tool type to get the list of all supported tools for it.</Form.Text>       
            </> }                    
        </Form.Group>        

        <Form.Group controlId="tool"  className="mt-2">
          <Form.Label>Tool*  {isToolListSearching && <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/>}</Form.Label>
          {formData.tool_identifier && formData.tool_identifier.length > 0 && lockTool ? 
            <>
              <Form.Control maxLength="50" type="text" disabled={true} placeholder="" 
                value={toolList[toolList.findIndex(x => x.identifier === formData.tool_identifier)] && toolList[toolList.findIndex(x => x.identifier === formData.tool_identifier)].name || ""} />
            </> :
            <>
              {toolList &&
                <DropdownList
                  data={toolList} 
                  value={toolList[toolList.findIndex(x => x.identifier === formData.tool_identifier)]}
                  valueField='identifier'
                  disabled={!formData.active || !formData.tool_type}
                  textField='name'
                  onChange={handleToolIdentifierChange}             
                /> }
              <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text>
            </>}                  
        </Form.Group>        
      </div> 
      
      <Button variant="primary" type="button" disabled={isLoading}
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