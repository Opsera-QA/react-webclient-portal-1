import React, {  useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSpinner } from "@fortawesome/pro-light-svg-icons";


const WelcomeView = ({ pipelineId, handleClose, setView }) => {
  const [save, setSave] = useState(false);

  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">Opsera Free Trial Pipeline</div>
          {/*<div className="text-muted mb-4">Welcome to the Opsera Free Trial demonstration of our declarative pipeline operations.  </div>*/}
          <div className="px-2 mt-4"></div>
          <h6>Hello!</h6>
          <div>You are about to run an Opsera pipeline demo which has been custom designed for this Free Trial.  You will have the ability to explore
            our application and see how the pipelines are used and run.  This free trial does not allow you to change the settings of your pipeline.  However,
            before you start it, we do allow you to provide a custom message in the following screen which will be committed to a temporary Git repository we are hosting
             on your behalf.  Once that is done and the pipeline runs, you can watch it complete each of the steps in the workflow to see an example
            of how a standard SDLC pipeline could work for you in your organization.</div>

          <div className="mt-2">If you have any questions or are interested in a more custom tailored experience, please contact us at Opsera.io!</div>
        
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
              <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1" />
            )}
            Get Started!
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
