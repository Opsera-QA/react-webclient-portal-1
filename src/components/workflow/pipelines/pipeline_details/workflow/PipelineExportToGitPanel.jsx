import React, {useState, useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import axios from "axios";
import SourceRepositoryActions from "./step_configuration/repository/source-repository-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import useComponentStateReference from "hooks/useComponentStateReference";

function PipelineExportToGitPanel({ pipeline, handleClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const { isMounted, cancelTokenSource} = useComponentStateReference();
  const service = pipeline?.workflow?.source?.service;

  const fullPath = service === "gitlab" ? `${pipeline?.workflow?.source?.repository}/${pipeline?.workflow?.source?.gitExportPath}` :
  service === "github" ? `${pipeline?.workflow?.source?.gitUrl}/${pipeline?.workflow?.source?.gitExportPath}` :
  "Unable to locate full path. Please check your repository configuration and try again.";

  const fileName = `Opsera_Pipeline_${pipeline._id}.json`;
  
  return (
    <EditorPanelContainer
      isLoading={isLoading}
      handleClose={handleClose}
      showRequiredFieldsMessage={false}
    >
      <Row>
        <Col md={12}>
          <div className="h6 text-muted mb-4 mt-2"> Push the current version of this pipeline to your Git repository configured in the top level workflow settings for this pipeline..</div>
        </Col>
        <Col md={12}>
          <div className="h6 text-muted mb-4 mt-2"> Full Export Path: {fullPath}</div>
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


