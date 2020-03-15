import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { axiosApiService } from "../../../api/apiService";
import ErrorDialog from "../../common/error";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";



// TODO: Preselect value if user has it saved already.
//TODO: Test and remove debug code

function ToolConfigurationSelect( { data, editItem, parentCallback }) {
  const contextType = useContext(AuthContext);
  const { plan } = data.workflow;
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const [error, setErrors] = useState();
  const [toolOptions, setToolOptions] = useState([{ value: "", label: "Select One", isDisabled: "yes" }]);
  const [toolConfigSelect, setToolConfigSelect] = useState(); //default value should come from data PROP
  
  
  useEffect(() => {    
    console.log("DATA: ", data);    
    setTools([{ value: "", label: "Select One", isDisabled: "yes" }]);
    fetchToolConfigOptions(editItem.tool_name);
  }, [editItem]);

  const handleSelectChange = (selectedOption) => {
    setToolConfigSelect(selectedOption.value);   
  };


  const fetchToolConfigOptions = async (toolName) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/tools?filter=${toolName}`;
    
    try {
      const result = await axiosApiService(accessToken).get(apiUrl);
      setTools(result.data);
      setLoading(false);  
      let options = result.data.map(function (tool) {
        return { value: tool._id, label: tool.name };
      });
      setToolOptions(options);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    } 
     
  };


  //Build data object being returned to parent controller for saving.  Can just be the individual step
  const callbackFunction = () => {
    console.log("toolConfig: ", toolConfigSelect);
    console.log("Edit Item: ", editItem); //
    //get array index of plan matching this step in data object
    let stepArrayIndex = plan.findIndex(x => x._id === editItem.step_id); 
    let toolConfigArrayIndex = tools.findIndex(x => x._id === toolConfigSelect); 

    console.log("array index of step: ", stepArrayIndex);
    console.log("Step to update: ", plan[stepArrayIndex]);
    
    console.log("array index of tool: ", toolConfigArrayIndex);

    console.log("Tool Configuration Object to save: ", tools[toolConfigArrayIndex]);

    plan[stepArrayIndex].tool.configuration = tools[toolConfigArrayIndex].configuration;

    console.log("Updated Plan: ", plan);

    parentCallback(plan);
  };

  return (
    <Form>
      { error && <ErrorDialog error={error} className="mt-3 mb-3" /> }

      <Form.Group controlId="toolSelect">
        <Form.Text className="text-muted mb-2 mt-1">
          Select the tool configuration from the dropdown below.  In order to add a tool to a step, it must be supported 
          by that step and must be configured in the <Link to="/api_connector">Tools Interface</Link>.
        </Form.Text>
        <Form.Label className="upper-case-first mt-2">{editItem.tool_name} Configuration</Form.Label>

        <Select
          className="basic-single mr-2"
          menuPortalTarget={document.body}
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
          classNamePrefix="select"
          //defaultValue={platform ? PLATFORM_OPTIONS[PLATFORM_OPTIONS.findIndex(x => x.value ===platform)] : PLATFORM_OPTIONS[0]}
          defaultValue={toolOptions[0]}  //TODO: Fix this!
          isLoading={loading}
          isDisabled={false}
          isClearable={false}
          isSearchable={true}
          name="TOOL-SELECT"
          options={toolOptions}
          onChange={handleSelectChange}
        />
      </Form.Group>

      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }} 
        disabled={!toolConfigSelect}>
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
    </Form>
  );
}

ToolConfigurationSelect.propTypes = {
  data: PropTypes.object,
  editItem: PropTypes.object,
  parentCallback: PropTypes.func
};

export default ToolConfigurationSelect;