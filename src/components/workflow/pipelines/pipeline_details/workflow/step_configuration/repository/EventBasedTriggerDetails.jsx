import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/pro-light-svg-icons";

// TODO: Refactor
function EventBasedTriggerDetails({ pipelineId, userId }) {
  const apiUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const [triggerUrl, setTriggerUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    setTriggerUrl(`${apiUrl}/hooks/${userId}/${pipelineId}/source`);
    setCopySuccess(false);
  }, [pipelineId]);

  const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
    setCopySuccess(true);
  };

  return (
    <div className="mt-1">
      <Form.Group controlId="branchField">
        {copySuccess && <div className="info-text float-right small">Copied to Clipboard!</div>}
        <h6>Webhook URL:</h6>

        <InputGroup className="mb-1">
          <Form.Control maxLength="75" type="text" value={triggerUrl || ""} disabled={true}/>
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => {
              copyToClipboard(triggerUrl);
            }}><FontAwesomeIcon icon={faCopy}/></Button>
          </InputGroup.Append>
        </InputGroup>

        {/*<Form.Text className="text-muted">
          Use the URL above to manually configure your Webhook in a source repository. If a Secret Key/Token is required,
          ensure the settings above match your hook configuration. Ensure the settings noted are configured properly.
        </Form.Text>*/}
      </Form.Group>
    </div>
  );
}

EventBasedTriggerDetails.propTypes = {
  pipelineId: PropTypes.string,
  userId: PropTypes.string,
};

export default EventBasedTriggerDetails;