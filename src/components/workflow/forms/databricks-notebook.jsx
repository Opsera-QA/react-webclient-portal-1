import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import JSONInput from "react-json-editor-ajrm";
import locale    from "react-json-editor-ajrm/locale/en";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  endpointUrl: "",
  dataPackage: {},
  authToken: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function DatabricksNotebookConfiguration( { data, parentCallback }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [jsonEditor, setJsonEditor] = useState({});
  const [jsonEditorInvalid, setJsonEditorInvalid] = useState(false);

  useEffect(() => {
    setFormData(INITIAL_DATA);
    if (typeof(data) !== "undefined") {
      let { configuration, threshold } = data;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } 
  }, [data]);


  const callbackFunction = () => {
    if (validateRequiredFields()) {
      formData.dataPackage = JSON.parse(jsonEditor);
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
    let { endpointUrl, authToken, dataPackage } = formData;
    if (endpointUrl.length === 0 || authToken.length === 0 || dataPackage.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else if (jsonEditorInvalid) { 
      setFormMessage("Invalid JSON Data!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };


  const handleJsonInputUpdate = (e) => {
    setJsonEditorInvalid(e.error);
    setJsonEditor(e.json);
  };
  
  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

      <Form.Group controlId="repoField">
        <Form.Label>Databricks Endpoint URL*</Form.Label>
        <Form.Control type="text" placeholder="" value={formData.endpointUrl || ""} onChange={e => setFormData({ ...formData, endpointUrl: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="branchField">
        <Form.Label>Authorization Token*</Form.Label>
        <Form.Control maxLength="500" as="text" type="password" placeholder="" value={formData.authToken || ""} onChange={e => setFormData({ ...formData, authToken: e.target.value })} />
      </Form.Group>

      <div style={{ maxWidth: "580", maxHeight: "100%", border: "1px solid #ced4da", borderRadius: ".25rem" }}>
        <JSONInput
          placeholder={formData.dataPackage}
          onChange={e => handleJsonInputUpdate(e) }
          theme="light_mitsuketa_tribute"
          locale={locale}
          height="175px"
        />
      </div>


      <small className="form-text text-muted mt-2 text-left pb-2">The JSON data above must be properly formatted and match the necessary job ID.</small>
     
      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <div className="h6 mt-3">Success Threshold</div>
      <Form.Group controlId="splitting_mode">
        <Form.Label>Splitting Mode:</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal.split_mode || ""} disabled={true} />
      </Form.Group>
      <Form.Group controlId="row_fraction">
        <Form.Label>Row Fraction:</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal.fraction || ""} disabled={true} />
      </Form.Group>
      <Form.Group controlId="randomized_split">
        <Form.Check type="checkbox" label="Randomized Split" value={thresholdVal.randomized_split || ""} />
      </Form.Group>
      <Form.Group controlId="random_seed">
        <Form.Label>Random Seed:</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal.random_seed || ""} disabled={true} />
      </Form.Group>
      <Form.Group controlId="stratified_split">
        <Form.Label>Stratified Split:</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal.stratified_split || ""} disabled={true} />
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

DatabricksNotebookConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default DatabricksNotebookConfiguration;