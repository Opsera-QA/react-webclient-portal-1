import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {getMissingRequiredFieldsErrorDialog} from "../../../../../../../common/toasts/toasts";
import IconBase from "components/common/icons/IconBase";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  buildScript: ""
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function GcpDeployStepConfiguration( { data, parentCallback, setToast, setShowToast }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);

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
    let { buildScript } = formData;
    if (buildScript.length === 0) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };
  
  return (
    <Form>
      <Form.Group controlId="repoField">
        <Form.Label>Enter build script content*</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={formData.buildScript || ""} onChange={e => setFormData({ ...formData, buildScript: e.target.value })} />
      </Form.Group>
     
      <small className="form-text text-muted mt-2 text-left pb-2">A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments</small>
     
      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <IconBase icon={faSave} className={"mr-1"}/> Save
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

GcpDeployStepConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default GcpDeployStepConfiguration;