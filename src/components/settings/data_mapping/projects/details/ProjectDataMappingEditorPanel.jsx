import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import ProjectMappingToolIdentifierSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolIdentifierSelectInput";
import ProjectMappingWorkspaceSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingWorkspaceSelectInput";
import ProjectRepositorySelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectRepositorySelectInput";
import ProjectMappingToolSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolSelectInput";
import ProjectMappingProjectSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingProjectSelectInput";
import SonarProjectSelectInput
  from "../../../../common/list_of_values_input/settings/data_tagging/projects/SonarProjectSelectInput";
import TagManager from "components/common/inputs/tags/TagManager";
import axios from "axios";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";

function ProjectDataMappingEditorPanel(
  {
    projectDataMappingModel,
    setProjectDataMappingModel,
    handleClose,
  }) {
  const isMounted = useRef(false);
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

  // TODO: Rewrite into switch statement or sub panels
  const getDynamicFields = () => {
    if (projectDataMappingModel?.getData("tool_identifier") === "jenkins") {
      return (
        <Col lg={12}>
          <JenkinsRegistryToolJobSelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
            fieldName={"key"}
            jenkinsToolId={projectDataMappingModel?.getData("tool_id")}
          />
        </Col>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "sonar") {
      return (
        <Col lg={12}>
          <SonarProjectSelectInput
            dataObject={projectDataMappingModel}
            setDataObject={setProjectDataMappingModel}
            tool_prop={projectDataMappingModel.getData("tool_id")}
          />
        </Col>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "bitbucket") {
      return (
        <>
        <Col lg={12}>
          <ProjectMappingWorkspaceSelectInput
            dataObject={projectDataMappingModel}
            setDataObject={setProjectDataMappingModel}
            toolId={projectDataMappingModel.getData("tool_id")}
          />
        </Col>
      <Col lg={12}>
        <ProjectRepositorySelectInput
          model={projectDataMappingModel}
          setModel={setProjectDataMappingModel}
        />
      </Col>
          </>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "gitlab" || projectDataMappingModel?.getData("tool_identifier") === "github") {
      return (
        <Col lg={12}>
          <ProjectRepositorySelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
          />
        </Col>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "jira") {
      return (
        <Col lg={12}>
          <ProjectMappingProjectSelectInput
            dataObject={projectDataMappingModel}
            setDataObject={setProjectDataMappingModel}
            tool_id={projectDataMappingModel.getData("tool_id")}
          />
        </Col>
      );
    }
  };

  const getWarningMessage = () => {
    if (projectDataMappingModel?.isNew() !== true) {
      return (
        <div className="m-2">
          <Card>
            <Card.Text className={"mt-3 mb-3"} style={{display: "flex", justifyContent: "center"}}>
              <strong>WARNING: </strong> Editing an active Analytics Data Mapping will result in loss of filtering
              functionality from data previously mapped with this information
            </Card.Text>
          </Card>
        </div>
      );
    }
  };

  if (projectDataMappingModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <VanityEditorPanelContainer
      model={projectDataMappingModel}
      setModel={setProjectDataMappingModel}
      handleClose={handleClose}
      className={"mx-3 my-2"}
    >
      {getWarningMessage()}
      <Row>
        <Col lg={12}>
          <ProjectMappingToolIdentifierSelectInput
            dataObject={projectDataMappingModel}
            setDataObject={setProjectDataMappingModel}
          />
        </Col>
        <Col lg={12}>
          <ProjectMappingToolSelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
          />
        </Col>
        {getDynamicFields()}
        <Col lg={12}>
          <TagManager
            type={"project"}
            dataObject={projectDataMappingModel}
            fieldName={"value"}
            setDataObject={setProjectDataMappingModel}
            disabled={projectDataMappingModel && projectDataMappingModel.getData("tool_id").length === 0}
          />
        </Col>
        <Col lg={12}>
          <ActivityToggleInput
            dataObject={projectDataMappingModel}
            fieldName={"active"}
            setDataObject={setProjectDataMappingModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ProjectDataMappingEditorPanel.propTypes = {
  projectDataMappingModel: PropTypes.object,
  setProjectDataMappingModel: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ProjectDataMappingEditorPanel;
