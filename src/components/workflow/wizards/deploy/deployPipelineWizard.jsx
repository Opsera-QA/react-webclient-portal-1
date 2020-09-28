import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";

import PipelineActions from "../../pipeline-actions";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import LoadingDialog from "../../../common/status_notifications/loading";

const DeployPipelineWizard = ({
  templateId,
  templateType,
  handleWizardRequest,
  handleClose
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setErrors] = useState(false);
  const [view, setView] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadTemplate(templateId);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const loadTemplate = async (templateId) => {
    //Lookup template

    //parse template to determine what wizard compontents need to happen
  };


  //overall logic to deploy pipeline should happen here
  const deployTemplate = async (templateId) => {
    try {
      const deployResponse = await PipelineActions.deployTemplate(templateId, getAccessToken);
      console.log(deployResponse);
    }
    catch (error) {
      toastContext.showErrorDialog(error);
    }

  };

  if (isLoading) {
    return (<LoadingDialog size={"sm"}/>);
  }

  // TODO: Add whatever early return method should be returned when a failure occurs,
  //  I've been doing different things depending on what the error is (loading, persisting, etc.)

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
  templateType: PropTypes.string,
};

export default DeployPipelineWizard;
