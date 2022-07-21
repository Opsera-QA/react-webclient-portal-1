import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import axios from "axios";
import SourceRepositoryActions from "./step_configuration/repository/source-repository-actions";
import {DialogToastContext} from "contexts/DialogToastContext";

function PipelineExportToGitPanel({ pipeline, handleClose }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    if (isMounted?.current === true) {
      setIsLoading(true);
      const user = await getUserRecord();
      console.log(user);
      setIsLoading(false);
    }
  };

  const service = pipeline?.workflow?.source?.service;
  const gitToolId = pipeline?.workflow?.source?.accountId;

  const exportToGit = async () => {
    try {
      await SourceRepositoryActions.exportToGitlab(getAccessToken, cancelTokenSource, pipeline._id, service, gitToolId);
      toastContext.showSuccessDialog(`Pipeline configuration has been commited to ${service}`);
      handleClose();
    } catch (error) {
      toastContext.showErrorDialog(`Unable to export pipeline configuration to ${service}. Please check your repository configuration and try again.`);
      handleClose();
  }
  };

  const fullPath = service === "gitlab" ? `${pipeline?.workflow?.source?.repository}/${pipeline?.workflow?.source?.gitExportPath}` :
  service === "github" ? `${pipeline?.workflow?.source?.gitUrl}/${pipeline?.workflow?.source?.gitExportPath}` :
  "Unable to locate full path. Please check your repository configuration and try again.";

  const fileName = `Opsera ${pipeline._id} ${pipeline.name.substring(0,25)}`;
  
  return (
    <EditorPanelContainer
      isLoading={isLoading}
      handleClose={handleClose}
      showRequiredFieldsMessage={false}
    >
      <Row>
        <Col md={12}>
          <div className="h6 text-muted mb-2 mt-2"> A copy of the pipeline configuration is about to be exported to the configured git repository.</div>
        </Col>
        <Col md={12}>
          <div className="h6 text-muted mb-2 mt-2"> Full Export Path: {fullPath}</div>
        </Col>
        <Col md={12}>
          <div className="h6 text-muted mb-2 mt-2"> File Name: {fileName}</div>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

PipelineExportToGitPanel.propTypes = {
  tagData: PropTypes.object,
  setTagData: PropTypes.func,
  handleClose: PropTypes.func,
  pipeline: PropTypes.object
};

export default PipelineExportToGitPanel;


