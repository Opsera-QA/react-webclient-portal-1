import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faLink } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  message: "",
  contact: "",
};

const INITIAL_THRESHOLD_VALUE = {
  user: null,
  email: null,
  approved: false,
  approved_on: null,
};


function ApprovalStepConfiguration({ stepTool, parentCallback }) {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [thresholdData, setThresholdData] = useState(INITIAL_THRESHOLD_VALUE);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof (stepTool) !== "undefined") {
      let { configuration, threshold } = stepTool;
      if (typeof (configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof (threshold) !== "undefined") {
        setThresholdData(threshold.value);
      }
    } else {
      setFormData(INITIAL_DATA);
      setThresholdData(INITIAL_THRESHOLD_VALUE);
    }
  }, [stepTool]);


  const callbackFunction = async () => {

    if (validateRequiredFields()) {
      setIsSaving(true);
      if (thresholdData.approved) {
        const { getUserRecord } = contextType;
        const userInfoResponse = await getUserRecord();
        thresholdData.user = userInfoResponse._id;
        thresholdData.email = userInfoResponse.email;
        thresholdData.approved_on = new Date();
      } else {
        thresholdData.user = null;
        thresholdData.email = null;
        thresholdData.approved_on = null;
      }

      const item = {
        configuration: formData,
        threshold: {
          type: "user-approval",
          value: thresholdData,
        },
      };
      await parentCallback(item);
      setIsSaving(false);
    }

  };


  const validateRequiredFields = () => {
    let { message, contact } = formData;
    if (message.length === 0 || contact.length === 0) {
      toastContext.showMissingRequiredFieldsErrorDialog();
      return false;
    } else {
      return true;
    }
  };

  return (
    <Form>
      <div className="text-muted my-3">Approval functionality within the pipeline halts the current running operations
        until it can be reviewed
        and then logs the approval given by a user. That user must be the owner of the pipeline or an administrator.
        Complete the fields below in
        order to control the message given to the person approving during each run.
      </div>


      <Form.Group controlId="repoField">
        <Form.Label>Notification Message*</Form.Label>
        <Form.Control as="textarea" type="text" placeholder="" value={formData.message || ""}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}/>
      </Form.Group>
      <small className="form-text text-muted mb-4">Provide the step specific message to include in the approval
        notification.</small>

      <Form.Group controlId="repoField">
        <Form.Label>Step Contact*</Form.Label>
        <Form.Control type="text" placeholder="" value={formData.contact || ""}
                      onChange={e => setFormData({ ...formData, contact: e.target.value })}/>
      </Form.Group>
      <small className="form-text text-muted">Point of contact if approver has questions.</small>
      <small className="form-text text-muted text-right">* Required Fields</small>

            <Button variant="primary"
              disabled={isSaving}
              onClick={() => callbackFunction()}>
        {isSaving ?
          <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</> :
          <><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</>}
      </Button>
      <div className="text-muted my-3">
        Please Note: For Slack based notification, you must enter a valid Slack token in
        <Link to="/tools"><FontAwesomeIcon icon={faLink} />API
        Tools</Link> and then enable Slack notification for this step.
      </div>


    </Form>
  );
}

ApprovalStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
};

export default ApprovalStepConfiguration;