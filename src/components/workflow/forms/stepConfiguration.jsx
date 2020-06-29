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
  const [renderForm, setRenderForm] = useState(false);
  const [disableToolSelect, setDisableToolSelect] = useState(false);
  const [toolTypeList, setToolTypeList] = useState([]);
  const [toolList, setToolList] = useState([]);
  const [isToolListSearching, setIsToolListSearching] = useState(false);
  const [isToolTypeSearching, setIsToolTypeSearching] = useState(false);
  

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

  
  
  useEffect(
    () => {
      async function fetchToolDetails(){
        try {
          setIsToolTypeSearching(true);
          const accessToken = await getAccessToken();
          const toolResponse = await axiosApiService(accessToken).get("/registry/types", {});      
          setToolTypeList(formatOptions(toolResponse.data));
          setIsToolTypeSearching(false);
          console.log(toolResponse.data);
        }
        catch (err) {
          console.log(err.message);
        }
      }
      // Fire off our API call
      fetchToolDetails();
    },
    []
  );
  
  useEffect(
    () => {
      async function fetchToolDetails(toolType){
        try {
          setIsToolListSearching(true);
          const accessToken = await getAccessToken();
          const toolResponse = await axiosApiService(accessToken).get("/registry/tools", {});
          const filteredList = toolResponse.data.filter(el => el.tool_type_identifier === toolType);
          setToolList(filteredList);
          setIsToolListSearching(false);
          console.log(filteredList);
        }
        catch (err) {
          console.log(err.message);
        }
      }
      // Fire off our API call
      fetchToolDetails(formData.tool_type);
    },
    [formData.tool_type]
  );

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
    // await getToolList();   
    // await getToolTypeList(); 
    setFormData(INITIAL_DATA);    
    setDisableToolSelect(false);
    let stepType = await getStepType(step.tool);    

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

  const getStepType = async (tool) => {    
    if (tool && tool.tool_identifier) {
      const toolData = await getToolDetails(tool.tool_identifier);
      console.log("toolData", toolData);
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
          <Form.Label>Tool Type*</Form.Label>
          {isToolTypeSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading Tool Types </div>
          ) :(
            <>
              {renderForm && toolTypeList ?
                <DropdownList
                  data={toolTypeList} 
                  valueField='identifier'
                  value={toolTypeList[toolTypeList.findIndex(x => x.identifier === formData.tool_type)]}
                  disabled={!formData.active || disableToolSelect}
                  textField='name'
                  defaultValue={toolTypeList[toolTypeList.findIndex(x => x.identifier === formData.type)]}
                  onChange={handleToolTypeChange}             
                /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth/> }
            </> 
          ) 
          }
        </Form.Group>        

        <Form.Group controlId="tool"  className="mt-2">
          <Form.Label>Tool*</Form.Label>
          { formData.tool_type && formData.tool_type.length > 0 ? 
            <>
              {isToolListSearching ? (
                <div className="form-text text-muted mt-2 p-2">
                  <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading Tool List accounts </div>
              ) :(
                <>
                  {renderForm && toolList  ?
                    <DropdownList
                      data={toolList} 
                      value={toolList[toolList.findIndex(x => x.identifier === formData.tool_identifier)]}
                      valueField='identifier'
                      disabled={!formData.active || disableToolSelect}
                      textField='name'
                      defaultValue={toolList[toolList.findIndex(x => x.identifier === formData.tool_identifier)]}
                      onChange={handleToolIdentifierChange}             
                    /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth/> }
                </> 
              )
              }
            </>  : 
            <Form.Text className="text-muted">Select tool type to get the list of all supported tools for it.</Form.Text>       
          }
        
          <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text>
        </Form.Group>        
      </div> 
      
      <Button variant="primary" type="button" disabled={!renderForm}  
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