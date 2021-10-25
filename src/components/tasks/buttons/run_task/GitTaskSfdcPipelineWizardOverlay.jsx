import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

function GitTaskSfdcPipelineWizardOverlay({ gitTasksData }) {
  const toastContext = useContext(DialogToastContext);
  let history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
    history.push(`/task`);
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Salesforce Git Task Configuration`}
      titleIcon={faFileInvoice}
      showToasts={true}
      isLoading={isLoading}
      showCloseButton={false}
    >
      <SfdcPipelineWizard gitTaskData={gitTasksData} handleClose={closePanel} closePanel={closePanel} />
    </FullScreenCenterOverlayContainer>
  );
}

GitTaskSfdcPipelineWizardOverlay.propTypes = {
  gitTasksData: PropTypes.object
};

export default GitTaskSfdcPipelineWizardOverlay;