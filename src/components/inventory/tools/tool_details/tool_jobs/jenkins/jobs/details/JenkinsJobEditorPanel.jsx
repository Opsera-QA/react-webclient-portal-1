import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import JenkinsJobTypeSelectInput from "./inputs/JenkinsJobTypeSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import jenkinsJobsActions from "./jenkins-jobs-actions";
import JenkinsJobSummaryPanel from "./JenkinsJobSummaryPanel";
import {AuthContext} from "contexts/AuthContext";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import axios from "axios";
import JenkinsJobSubEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/details/JenkinsJobSubEditorPanel";
import StandaloneDeleteButtonWithConfirmationModal
  from "components/common/buttons/delete/StandaloneDeleteButtonWithConfirmationModal";

function JenkinsJobEditorPanel({ handleClose, jenkinsJobModel, setJenkinsJobModel, toolData, loadData }) {
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsJobConfigurationModel, setJenkinsJobConfigurationModel] = useState(null);
  const [activeTab, setActiveTab] = useState("settings");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setActiveTab(jenkinsJobModel?.isNew() === false ? "summary" : "settings");

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const updateJob = async () => {
    const currentJobs = toolData?.getArrayData("jobs");
    const name = jenkinsJobModel?.getData("name");
    let count = 0;

    currentJobs.forEach((job) => {
      if (job.name === name) {
        count++;
      }
    });

    if (count > 1) {
      throw { error: "Name must be unique across all Jobs tied to this tool" };
    }

    const configuration = {...jenkinsJobConfigurationModel.getPersistData()};
    jenkinsJobModel.setData("configuration", configuration);

    return await jenkinsJobsActions.updateJenkinsJobs(getAccessToken, cancelTokenSource, toolData, jenkinsJobModel);
  };

  const createJob = async () => {
    const found = toolData
      ?.getArrayData("jobs")
      .some((job) => job.name === jenkinsJobModel?.getData("name"));

    if (found) {
      throw { error: "Name must be unique across all Jobs tied to this tool" };
    }

    const configuration = {...jenkinsJobConfigurationModel.getPersistData()};
    jenkinsJobModel.setData("configuration", configuration);

    return await jenkinsJobsActions.createJenkinsJobs(getAccessToken, cancelTokenSource, toolData, jenkinsJobModel);
  };

  const getEditingWarning = () => {
    if (!jenkinsJobModel.isNew()) {
      return (
        <WarningDialog
          warningMessage={`
          Editing this template doesn't update the pipeline configuration. 
          Please update the job inside any relevant pipeline step before running the pipeline.
          `}
        />
      );
    }
  };

  if (!jenkinsJobModel) {
    return <LoadingDialog size="sm" />;
  }

  if (activeTab === "summary") {
    return (
      <JenkinsJobSummaryPanel
        toolData={toolData}
        jenkinsJobData={jenkinsJobModel}
        jenkinsJobTypeData={jenkinsJobConfigurationModel}
        setActiveTab={setActiveTab}
        loadData={loadData}
        handleClose={handleClose}
      />
    );
  }

  const deleteJob = async () => {
    const response = await jenkinsJobsActions.deleteJenkinsJobs(getAccessToken, cancelTokenSource, toolData, jenkinsJobModel);
    loadData();
    return response;
  };

  return (
    <EditorPanelContainer
      handleClose={handleClose}
      recordDto={jenkinsJobModel}
      createRecord={createJob}
      updateRecord={updateJob}
      lenient={true}
      disable={jenkinsJobModel?.isModelValid2() !== true || jenkinsJobConfigurationModel?.isModelValid2() !== true}
      setRecordDto={setJenkinsJobModel}
      extraButtons={<StandaloneDeleteButtonWithConfirmationModal model={jenkinsJobModel} deleteDataFunction={deleteJob} />}
    >
      {getEditingWarning()}
      <Row>
        <Col lg={6}>
          <JenkinsJobTypeSelectInput
            disabled={!jenkinsJobModel?.isNew()}
            setModel={setJenkinsJobModel}
            model={jenkinsJobModel}
            fieldName={"jobType"}
            setConfigurationModel={setJenkinsJobConfigurationModel}
          />
        </Col>
        <Col lg={6}>
          <TextInputBase setDataObject={setJenkinsJobModel} dataObject={jenkinsJobModel} fieldName={"name"}/>
        </Col>
        <Col lg={12}>
          <TextInputBase setDataObject={setJenkinsJobModel} dataObject={jenkinsJobModel} fieldName={"description"}/>
        </Col>
      </Row>
      <JenkinsJobSubEditorPanel
        jenkinsJobConfiguration={jenkinsJobModel?.getData("configuration")}
        setJenkinsJobConfigurationModel={setJenkinsJobConfigurationModel}
        jenkinsJobConfigurationModel={jenkinsJobConfigurationModel}
        jenkinsJobType={jenkinsJobModel?.getArrayData("type", 0)}
        autoScalingEnabled={toolData?.configuration?.autoScaleEnable}
      />
    </EditorPanelContainer>
  );
}
JenkinsJobEditorPanel.propTypes = {
  handleClose: PropTypes.func,
  toolData: PropTypes.object,
  jenkinsJobModel: PropTypes.object,
  setJenkinsJobModel: PropTypes.func,
  loadData: PropTypes.func,
  jobType: PropTypes.string
};

export default JenkinsJobEditorPanel;
