import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Card, Col, Row } from "react-bootstrap";
import projectTagsMetadata from "components/settings/data_tagging/projects/tagging-project-metadata";
import Model from "core/data_model/model";
import dataMappingActions from "components/settings/data_tagging/data-mapping-actions";
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
import JenkinsJobSelectInput
  from "../../../../common/list_of_values_input/settings/data_tagging/projects/JenkinsJobSelectInput";
import SonarProjectSelectInput
  from "../../../../common/list_of_values_input/settings/data_tagging/projects/SonarProjectSelectInput";
import TagManager from "components/common/inputs/tags/TagManager";

function ProjectMappingEditor({ toolTypeData, setToolTypeData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [projectMappingDto, setProjectMappingDto] = useState(undefined);
  console.log(projectMappingDto);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let modelData = typeof toolTypeData !== "undefined" ? toolTypeData.getPersistData() : projectTagsMetadata.newModelBase;
    setProjectMappingDto(new Model(modelData, projectTagsMetadata, false));
  };

  const createMapping = async () => {
    let response = await dataMappingActions.createProjectMapping(projectMappingDto, getAccessToken);
    if (response?.status === 200) {
      handleClose();
    }
  };

  const updateMapping = async () => {
    return await dataMappingActions.updateProject(projectMappingDto, getAccessToken);
  };

  const getDynamicFields = () => {
    if (projectMappingDto.getData("tool_identifier") === "jenkins") {
      return (
        <Col lg={12}>
          <JenkinsJobSelectInput
            dataObject={projectMappingDto}
            setDataObject={setProjectMappingDto}
            tool_prop={projectMappingDto.getData("tool_id")}
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
          <ProjectMappingToolSelectInput dataObject={projectMappingDto} setDataObject={setProjectMappingDto} />
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
