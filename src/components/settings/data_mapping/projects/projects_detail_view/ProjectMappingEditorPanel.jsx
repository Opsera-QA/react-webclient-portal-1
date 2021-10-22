import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Card, Col, Row } from "react-bootstrap";
import projectTagsMetadata from "components/settings/data_mapping/projects/tagging-project-metadata";
import Model from "core/data_model/model";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
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

function ProjectMappingEditor({ toolTypeData, setToolTypeData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [projectMappingDto, setProjectMappingDto] = useState(undefined);
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
      let modelData = typeof toolTypeData !== "undefined" ? toolTypeData.getPersistData() : projectTagsMetadata.newObjectFields;
      setProjectMappingDto(new Model(modelData, projectTagsMetadata, false));
      setIsLoading(false);
    }
  };

  const createMapping = async (cancelSource = cancelTokenSource) => {
    let response = await dataMappingActions.createProjectMappingV2(projectMappingDto, getAccessToken, cancelSource);
    if (response?.status === 200) {
      handleClose();
    }
  };

  const updateMapping = async (cancelSource = cancelTokenSource) => {
    return await dataMappingActions.updateProjectV2(projectMappingDto, getAccessToken, cancelSource);
  };

  const getDynamicFields = () => {
    if (projectMappingDto.getData("tool_identifier") === "jenkins") {
      return (
        <Col lg={12}>
          <JenkinsRegistryToolJobSelectInput
            model={projectMappingDto}
            setModel={setProjectMappingDto}
            fieldName={"key"}
            jenkinsToolId={projectMappingDto?.getData("tool_id")}
          />
        </Col>
      );
    }
    if (projectMappingDto.getData("tool_identifier") === "sonar") {
      return (
        <Col lg={12}>
          <SonarProjectSelectInput
            dataObject={projectMappingDto}
            setDataObject={setProjectMappingDto}
            tool_prop={projectMappingDto.getData("tool_id")}
          />
        </Col>
      );
    }
    if (projectMappingDto.getData("tool_identifier") === "bitbucket") {
      return (
        <>
        <Col lg={12}>
          <ProjectMappingWorkspaceSelectInput
            dataObject={projectMappingDto}
            setDataObject={setProjectMappingDto}
            toolId={projectMappingDto.getData("tool_id")}
          />
        </Col>
      <Col lg={12}>
        <ProjectRepositorySelectInput
          dataObject={projectMappingDto}
          setDataObject={setProjectMappingDto}
          tool_prop_name={projectMappingDto.getData("tool_prop_name")}
          tool_prop={projectMappingDto.getData("tool_prop")}
        />
      </Col>
          </>
      );
    }
    if (projectMappingDto.getData("tool_identifier") === "gitlab" || projectMappingDto.getData("tool_identifier") === "github") {
      return (
        <Col lg={12}>
          <ProjectRepositorySelectInput
            dataObject={projectMappingDto}
            setDataObject={setProjectMappingDto}
            tool_prop={projectMappingDto.getData("tool_id")}
          />
        </Col>
      );
    }
    if (projectMappingDto.getData("tool_identifier") === "jira") {
      return (
        <Col lg={12}>
          <ProjectMappingProjectSelectInput
            dataObject={projectMappingDto}
            setDataObject={setProjectMappingDto}
            tool_id={projectMappingDto.getData("tool_id")}
          />
        </Col>
      );
    }
  };

  if (projectMappingDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <EditorPanelContainer
      isLoading={isLoading}
      recordDto={projectMappingDto}
      setRecordDto={setProjectMappingDto}
      createRecord={createMapping}
      updateRecord={toolTypeData ? updateMapping : createMapping}
      handleClose={handleClose}
    >
      {
        toolTypeData &&
        <div className="m-2">
          <Card>
            <Card.Text className={"mt-3 mb-3"} style={{display: "flex", justifyContent: "center"}}>
              <strong>WARNING: </strong> Editing an active Analytics Data Mapping will result in loss of filtering
              functionality from data previously mapped with this information
            </Card.Text>
          </Card>
        </div>
      }

      <Row>
        <Col lg={12}>
          <ProjectMappingToolIdentifierSelectInput dataObject={projectMappingDto} setDataObject={setProjectMappingDto} />
        </Col>
        <Col lg={12}>
          <ProjectMappingToolSelectInput
            model={projectMappingDto}
            setModel={setProjectMappingDto}
          />
        </Col>
        {getDynamicFields()}
        <Col lg={12}>
          <TagManager
            type={"project"}
            dataObject={projectMappingDto}
            fieldName={"value"}
            setDataObject={setProjectMappingDto}
            disabled={projectMappingDto && projectMappingDto.getData("tool_id").length === 0}
          />
        </Col>
        <Col lg={12}>
          <ActivityToggleInput dataObject={projectMappingDto} fieldName={"active"} setDataObject={setProjectMappingDto} />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

ProjectMappingEditor.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ProjectMappingEditor;
