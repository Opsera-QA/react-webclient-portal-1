import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSave, faSpinner} from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "../../../../../../common/status_notifications/error";
import {getFormValidationErrorDialog, getUpdateSuccessResultDialog} from "../../../../../../common/toasts/toasts";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  teamcityApiURL: "",
  teamcityBuildTypeId: "",
  teamcityProjectId: "",
  teamcityUsername: "", 
  teamcityPassword: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function TeamCityStepConfiguration( { data, parentCallback, setToast, setShowToast }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);

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
    setIsSaving(true);
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
    setIsSaving(false);
  };


  const validateRequiredFields = () => {
    let { teamcityApiURL, teamcityUsername, teamcityPassword, teamcityBuildTypeId, teamcityProjectId } = formData;
    if (teamcityApiURL.length === 0 || teamcityUsername.length === 0 || teamcityPassword.length === 0 || teamcityBuildTypeId.length === 0|| teamcityProjectId.length === 0) {
      let toast = getFormValidationErrorDialog(setShowToast);
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
        <Form.Label>TeamCity URL*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.teamcityApiURL || ""} onChange={e => setFormData({ ...formData, teamcityApiURL: e.target.value })} />
      </Form.Group>
      {/* <Form.Group controlId="branchField">
        <Form.Label>Jenkins User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.jUserId || ""} onChange={e => setFormData({ ...formData, jUserId: e.target.value })} />
      </Form.Group> */}
      <Form.Group controlId="branchField">
        <Form.Label>TeamCity Username*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.teamcityUsername || ""} onChange={e => setFormData({ ...formData, teamcityUsername: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>TeamCity Password*</Form.Label>
        <Form.Control maxLength="100" type="password" placeholder="" value={formData.teamcityPassword || ""} onChange={e => setFormData({ ...formData, teamcityPassword: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Build Configuration ID*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.teamcityBuildTypeId || ""} onChange={e => setFormData({ ...formData, teamcityBuildTypeId: e.target.value })} />
        <Form.Text className="text-muted">TeamCity Project Build Settings &#62; ID</Form.Text>
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Project ID*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.teamcityProjectId || ""} onChange={e => setFormData({ ...formData, teamcityProjectId: e.target.value })} />
        <Form.Text className="text-muted">TeamCity Project Settings &#62; ID</Form.Text>
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group>

      {/*TODO: Replace with SaveButton once converted to using data model*/}
      <div className="text-right mt-3">
        {isSaving &&
        <div className="text-center mr-3 mt-1"><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving
          is in progress</div>}
        <Button size="sm" variant="primary" disabled={isSaving} onClick={() => callbackFunction()}><FontAwesomeIcon
          icon={faSave} fixedWidth className="mr-2"/>Save</Button>
      </div>

      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

TeamCityStepConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default TeamCityStepConfiguration;