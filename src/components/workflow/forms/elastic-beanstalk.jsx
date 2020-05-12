//PP-95 Deploy Step form for AWS Elastic Beanstalk

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  userId: "",
  secret: "",
  url: "",
  region: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function ElasticBeanstalkDeploy( { data, parentCallback }) {
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
    let { userId, secret, url, region } = formData;
    if (userId.length === 0 || secret.length === 0 || url.length === 0 || region.length === 0) {
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

      <Form.Group controlId="branchField">
        <Form.Label>AWS User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.userId || ""} onChange={e => setFormData({ ...formData, userId: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>AWS Access Secret*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.secret || ""} onChange={e => setFormData({ ...formData, secret: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>S3 URL (with bucket name)</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.url || ""} onChange={e => setFormData({ ...formData, url: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Region</Form.Label>
        <Form.Control maxLength="5" type="text" placeholder="" value={formData.region || ""} onChange={e => setFormData({ ...formData, region: e.target.value })} />
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

ElasticBeanstalkDeploy.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default ElasticBeanstalkDeploy;
