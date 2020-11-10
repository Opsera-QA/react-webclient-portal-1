import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";


const WelcomeView = ({ pipelineId, handleClose, setView }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);

  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">Freetrial Pipeline Build</div>
          <div className="text-muted mb-4">Please confirm that you want to proceed with this operation.</div>
          <div className="px-2"></div>
            Welcome Screen
            {/* information about the free trial and explaining about the pipeline config needs to be added here */}
        
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setSave(true);
              setView(2);
            }}
            disabled={save}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faCog} fixedWidth className="mr-1" />
            )}
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
};

WelcomeView.propTypes = {
  pipelineId: PropTypes.string,
  templateId : PropTypes.string,
  setView: PropTypes.func,  
  handleClose: PropTypes.func,
};

export default WelcomeView;
