import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import GitCustodianNewJiraTicketEditorPanel from "./GitCustodianNewJiraTicketEditorPanel";
import Model from "../../../../core/data_model/model";
import GitCustodianTableMetaData from "../table/gitCustodianTableMetaData";

function GitCustodianNewJiraTicketModal ({ loadData, isMounted, gitCustodianData }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    createNewDashboardModel(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
    };
  }, [JSON.stringify(gitCustodianData)]);

  const createNewDashboardModel = async (cancelSource = cancelTokenSource) => {
    try {
      const accessRoleData = await getAccessRoleData();
      const newDashboard = new Model({...GitCustodianTableMetaData.newObjectFields}, GitCustodianTableMetaData, true);
      setDashboardData(newDashboard);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (dashboardData == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={'Jira Ticket'}
      loadData={loadData}
    >
      <GitCustodianNewJiraTicketEditorPanel
        setDashboardData={setDashboardData}
        handleClose={closePanel}
        dashboardData={dashboardData}
      />
    </CreateCenterPanel>
  );
}

GitCustodianNewJiraTicketModal.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  gitCustodianData: PropTypes.object,
};

export default GitCustodianNewJiraTicketModal;