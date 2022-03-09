import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { axiosApiService } from "../../../../../../api/apiService";
import ErrorDialog from "../../../../../common/status_notifications/error";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

function StepToolConfigurationSelectionPanel({ data, editItem, parentCallback }) {
  const contextType = useContext(AuthContext);
  const { plan } = data.workflow;
  const [loading, setLoading] = useState(false);
  const [tools, setTools] = useState([]);
  const [error, setErrors] = useState();
  const [toolOptions, setToolOptions] = useState([]);
  const [toolConfigSelect, setToolConfigSelect] = useState();
  
  useEffect(() => {    
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
      options.unshift({ value: "", label: "Select One", isDisabled: "yes" });
      setToolOptions(options);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    } 
  };

  const getToolOptionByConfigId = () => {
    let toolConfigurationId = plan[plan.findIndex(x => x._id === editItem.step_id)].tool.configuration_id;
    return toolConfigurationId;
  };

  const callbackFunction = () => {
    let stepArrayIndex = plan.findIndex(x => x._id === editItem.step_id); 
    let toolConfigArrayIndex = tools.findIndex(x => x._id === toolConfigSelect); 
    plan[stepArrayIndex].tool.configuration_id = tools[toolConfigArrayIndex]._id;
    plan[stepArrayIndex].tool.configuration = tools[toolConfigArrayIndex].configuration;
    parentCallback(plan);
  };

  return (
    <Form>
      {error && <ErrorDialog error={error} align={"top"} setError={setErrors}/>}

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
          value={toolOptions.find(op => {
            return op.value === getToolOptionByConfigId();
          })}
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
        <IconBase icon={faSave} className={"mr-1"}/> Save
      </Button>
    </Form>
  );
}

StepToolConfigurationSelectionPanel.propTypes = {
  data: PropTypes.object,
  editItem: PropTypes.object,
  parentCallback: PropTypes.func
};

export default StepToolConfigurationSelectionPanel;