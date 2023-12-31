import React, {useContext, useEffect, useRef, useState} from "react";
import JenkinsJobsTable from "./JenkinsJobsTable";
import JenkinsJobEditorPanel from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/JenkinsJobEditorPanel";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import JenkinsJobMetadata from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/jenkins-job-metadata";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import jenkinsToolJobActions
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/jenkinsToolJob.actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function JenkinsJobsPanel({ toolData, toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [jenkinsJobs, setJenkinsJobs] = useState([]);
  const [jenkinsJobModel, setJenkinsJobModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setJenkinsJobs([]);
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMongoDbId(toolId)) {
        await getJenkinsJobs(cancelSource);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getJenkinsJobs = async (cancelSource = cancelTokenSource) => {
    const response = await jenkinsToolJobActions.getJenkinsJobs(getAccessToken, cancelSource, toolId);
    const jenkinsJobArray = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(jenkinsJobArray)) {
      setJenkinsJobs(jenkinsJobArray);
    }
  };

  const selectedJobRow = (rowData) => {
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, JenkinsJobMetadata);
    setJenkinsJobModel({...parsedModel});
  };

  const togglePanel = async () => {
    setJenkinsJobModel(null);
    await loadData();
  };

  const getBody = () => {
    if (jenkinsJobModel != null) {
      return (
        <JenkinsJobEditorPanel
          toolData={toolData}
          handleClose={togglePanel}
          jenkinsJobModel={jenkinsJobModel}
          setJenkinsJobModel={setJenkinsJobModel}
          loadData={loadData}
        />
      );
    }

    return (
      <JenkinsJobsTable
        isLoading={isLoading}
        jenkinsJobs={jenkinsJobs}
        toolData={toolData}
        loadData={loadData}
        onRowSelect={selectedJobRow}
      />
    );
  };

  return (
    <div>
      {getBody()}
    </div>
  );
}

JenkinsJobsPanel.propTypes = {
  toolData: PropTypes.object,
  toolId: PropTypes.string,
};

export default JenkinsJobsPanel;
