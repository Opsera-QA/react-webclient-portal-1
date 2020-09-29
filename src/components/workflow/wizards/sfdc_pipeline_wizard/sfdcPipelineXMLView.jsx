import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faPlus,
  faMinus,
  faPen,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";

// syntax highlightner
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("xml", xml);

const SfdcPipelineXMLView = ({ handleClose, setView, modifiedFiles, xml, createJenkinsJob }) => {
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApproveChanges = () => {
    //this needs to do the ifnal work writing data to the stepID above: checked compontents, other job data

    //trigger the jenkins job to create job
    createJenkinsJob();
  };

  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: XML Viewer</div>
          <div className="text-muted mb-4">Please confirm that you want to proceed with this operation.</div>
          <div className="px-2"></div>
          {error && (
            <div className="mt-3">
              <ErrorDialog error={error} />
            </div>
          )}
          {save && <LoadingDialog />}

          {xml && (
            <>
              <div className="d-flex w-100 pr-2">
                {/* xml display goes here */}
                <SyntaxHighlighter language="xml" style={docco}>
                  {xml}
                </SyntaxHighlighter>
              </div>
            </>
          )}
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              setView(2);
            }}
          >
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1" />
            Back
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setSave(true);
              handleApproveChanges();
            }}
            disabled={save}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
            )}
            Proceed
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            className="ml-2"
            onClick={() => {
              handleClose();
            }}
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

SfdcPipelineXMLView.propTypes = {
  setView: PropTypes.func,
  modifiedFiles: PropTypes.object,
  handleClose: PropTypes.func,
  xml: PropTypes.string,
  createJenkinsJob: PropTypes.func,
};

export default SfdcPipelineXMLView;
