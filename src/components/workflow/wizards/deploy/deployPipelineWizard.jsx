import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";

import ErrorDialog from "components/common/status_notifications/error";
import PipelineActions from "../../pipeline-actions";
import LoadingDialog from "../../../common/status_notifications/loading";

const DeployPipelineWizard = ({
  templateId,
  handleWizardRequest,
  handleClose,
  refreshPipelineActivityData,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [view, setView] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTemplate(templateId);
  }, []);

  const loadTemplate = async (templateId) => {
    //Lookup template

    //parse template to determine what wizard compontents need to happen
  };


  //overall logic to deploy pipeline should happen here
  const deployTemplate = async (templateId) => {
    const deployResponse = await PipelineActions.deployTemplate(templateId, getAccessToken);
    console.log(deployResponse);

  };


  if (error) {
    return (<ErrorDialog error={error} align="top"/>);
  }

  if (loading) {
    return (<LoadingDialog size={"sm"}/>);
  }

  return (
    <>
      {view === 1 && (
        <>
          {/* Wire up step component */}
        </>
      )}

      {view === 2 && (
        <>
          {/* Wire up step component */}
        </>
      )}

      {view === 3 && (
        <>
          {/* Wire up step component */}
        </>
      )}
    </>
  );

};

DeployPipelineWizard.propTypes = {
  templateId: PropTypes.string,
  handleWizardRequest: PropTypes.func,
  handleClose: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func,
};

export default DeployPipelineWizard;
