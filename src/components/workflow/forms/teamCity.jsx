import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  teamcityApiURL: "",
  teamcityToken: "",
  teamcityBuildTypeId: "",
  teamcityUsername: "", 
  teamcityPassword: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function TeamCityStepConfiguration( { data, parentCallback }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      let { configuration, threshold } = data;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [data]);


  const callbackFunction = () => {
    if (validateRequiredFields()) {
      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal
        }
      };
      parentCallback(item);
    }
  };


  const validateRequiredFields = () => {
    let { teamcityApiURL, teamcityToken, teamcityBuildTypeId } = formData;
    if (teamcityApiURL.length === 0 || teamcityToken.length === 0 || teamcityBuildTypeId.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };
  
  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

      <Form.Group controlId="repoField">
        <Form.Label>TeamCity URL*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.teamcityApiURL || ""} onChange={e => setFormData({ ...formData, teamcityApiURL: e.target.value })} />
      </Form.Group>
      {/* <Form.Group controlId="branchField">
        <Form.Label>Jenkins User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.jUserId || ""} onChange={e => setFormData({ ...formData, jUserId: e.target.value })} />
      </Form.Group> */}
      <Form.Group controlId="branchField">
        <Form.Label>TeamCity Token*</Form.Label>
        <Form.Control maxLength="500" as="textarea" type="text" placeholder="" value={formData.teamcityToken || ""} onChange={e => setFormData({ ...formData, teamcityToken: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Build Step ID</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.teamcityBuildTypeId || ""} onChange={e => setFormData({ ...formData, teamcityBuildTypeId: e.target.value })} />
        <Form.Text className="text-muted">TeamCity Project Build Settings &#62; ID</Form.Text>
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

TeamCityStepConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default TeamCityStepConfiguration;