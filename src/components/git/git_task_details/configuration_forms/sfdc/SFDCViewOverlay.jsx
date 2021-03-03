import React, {useContext, useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import KpiInfoView from "components/insights/marketplace/charts/KpiInfoView";
import axios from "axios";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import Model from "core/data_model/model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {AuthContext} from "contexts/AuthContext";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import SfdcPipelineWizard from "components/workflow/wizards/sfdc_pipeline_wizard/sfdcPipelineWizard";

function SFDCViewOverlay({ gitTasksData }) {
  const toastContext = useContext(DialogToastContext);
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
    }
  }, []);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`SFDC Git Task Configuration`}
      titleIcon={faFileInvoice}
      showToasts={true}
      isLoading={isLoading}
    >
      <div className={"p-3"}>
        <SfdcPipelineWizard gitTaskData={gitTasksData} closePanel={closePanel} />
      </div>
    </CenterOverlayContainer>
  );
}

SFDCViewOverlay.propTypes = {
  gitTasksData: PropTypes.object,
};

export default SFDCViewOverlay;