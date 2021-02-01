import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Card, Col, Row } from "react-bootstrap";
import usersTagsMetadata from "components/settings/data_tagging/users/tagging-users-metadata";
import Model from "core/data_model/model";
import dataMappingActions from "components/settings/data_tagging/data-mapping-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import UserMappingToolIdentifierSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/users/UserMappingToolIdentifierSelectInput";
import UserMappingToolSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/users/UserMappingToolSelectInput";
import UserMappingProjectSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/users/UserMappingProjectSelectInput";
import UserMappingJiraUserSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/users/UserMappingJiraUserSelectInput";
import UserMappingOpseraUserSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/users/UserMappingOpseraUserSelectInput";
import UserMappingSourceControlUserSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/users/UserMappingSourceControlUserSelectInput";

function UsersMappingEditor({ toolTypeData, setToolTypeData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [usersMappingDto, setUsersMappingDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let modelData = typeof toolTypeData !== "undefined" ? toolTypeData.getPersistData() : usersTagsMetadata.newModelBase;
    setUsersMappingDto(new Model(modelData, usersTagsMetadata, false));
  };

  const createMapping = async () => {
    let response = await dataMappingActions.createUserMapping(usersMappingDto, getAccessToken);
    if (response?.status === 200) {
      handleClose();
    }
  };

  const updateMapping = async () => {
    return await dataMappingActions.updateUserMapping(usersMappingDto, getAccessToken);
  };

  const getDynamicFields = () => {
    if (usersMappingDto.getData("tool_identifier") === "jira") {
      return (
        <>
          <Col lg={12}>
            <UserMappingProjectSelectInput dataObject={usersMappingDto} setDataObject={setUsersMappingDto} tool_id={usersMappingDto.getData("tool_id")}/>
          </Col>
          <Col lg={12}>
            <UserMappingJiraUserSelectInput
              dataObject={usersMappingDto}
              setDataObject={setUsersMappingDto}
              tool_id={usersMappingDto.getData("tool_id")}
              tool_user_prop={usersMappingDto.getData("tool_user_prop")}
            />
          </Col>
        </>
      );
    }

    if (usersMappingDto.getData("tool_identifier") === "gitlab" || usersMappingDto.getData("tool_identifier") === "github") {
      return (
        <Col lg={12}>
          <UserMappingSourceControlUserSelectInput
            tool_id={usersMappingDto.getData("tool_id")}
            dataObject={usersMappingDto}
            setDataObject={setUsersMappingDto}
          />
        </Col>
      );
    }
  }

  if (usersMappingDto == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <EditorPanelContainer
      recordDto={usersMappingDto}
      setRecordDto={setUsersMappingDto}
      createRecord={createMapping}
      updateRecord={toolTypeData ? updateMapping : createMapping}
      handleClose={handleClose}
    >
      {toolTypeData &&
      <div className="m-2">
        <Card>
          <Card.Text className={"mt-3 mb-3"} style={{ display: "flex", justifyContent: "center" }}>
            <strong>WARNING: </strong> Editing an active Analytics Data Mapping will result in loss of filtering
            functionality from data previously mapped with this information
          </Card.Text>
        </Card>
      </div>
      }
      <Row>
        <Col lg={12}>
          <UserMappingToolIdentifierSelectInput dataObject={usersMappingDto} setDataObject={setUsersMappingDto} />
        </Col>
        <Col lg={12}>
          <UserMappingToolSelectInput dataObject={usersMappingDto} setDataObject={setUsersMappingDto} />
        </Col>
        {getDynamicFields()}
        <Col lg={12}>
          <UserMappingOpseraUserSelectInput dataObject={usersMappingDto} setDataObject={setUsersMappingDto} />
        </Col>
        <Col lg={12}>
          <ActivityToggleInput dataObject={usersMappingDto} fieldName={"active"} setDataObject={setUsersMappingDto} />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

UsersMappingEditor.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default UsersMappingEditor;
