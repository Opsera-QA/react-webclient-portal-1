import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
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
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import AnalyticsDataMappingEditWarningMessage
  from "components/settings/data_mapping/AnalyticsDataMappingEditWarningMessage";

function UserDataMappingEditorPanel(
  {
    userDataMappingModel,
    setUserDataMappingModel,
    handleClose,
  }) {

  // TODO: Rewrite into switch statement or sub panels
  const getDynamicFields = () => {
    if (userDataMappingModel?.getData("tool_identifier") === "jira") {
      return (
        <>
          <Col lg={12}>
            <UserMappingProjectSelectInput
              dataObject={userDataMappingModel}
              setDataObject={setUserDataMappingModel}
              tool_id={userDataMappingModel.getData("tool_id")}
            />
          </Col>
          <Col lg={12}>
            <UserMappingJiraUserSelectInput
              model={userDataMappingModel}
              setModel={setUserDataMappingModel}
            />
          </Col>
        </>
      );
    }


    if (userDataMappingModel.getData("tool_identifier") === "gitlab" || userDataMappingModel.getData("tool_identifier") === "github") {
      return (
        <Col lg={12}>
          <UserMappingSourceControlUserSelectInput
            tool_id={userDataMappingModel.getData("tool_id")}
            dataObject={userDataMappingModel}
            setDataObject={setUserDataMappingModel}
          />
        </Col>
      );
    }
  };

  const getWarningMessage = () => {
    if (userDataMappingModel?.isNew() !== true) {
      return (
        <AnalyticsDataMappingEditWarningMessage />
      );
    }
  };

  if (userDataMappingModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <VanityEditorPanelContainer
      model={userDataMappingModel}
      setModel={setUserDataMappingModel}
      handleClose={handleClose}
      className={"px-3 pb-3 pt-1"}
    >
      {getWarningMessage()}
      <Row>
        <Col lg={12}>
          <UserMappingToolIdentifierSelectInput
            dataObject={userDataMappingModel}
            setDataObject={setUserDataMappingModel}
          />
        </Col>
        <Col lg={12}>
          <UserMappingToolSelectInput
            dataObject={userDataMappingModel}
            setDataObject={setUserDataMappingModel}
          />
        </Col>
        {getDynamicFields()}
        <Col lg={12}>
          <UserMappingOpseraUserSelectInput
            dataObject={userDataMappingModel}
            setDataObject={setUserDataMappingModel}
          />
        </Col>
        <Col lg={12}>
          <ActivityToggleInput
            dataObject={userDataMappingModel}
            fieldName={"active"}
            setDataObject={setUserDataMappingModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

UserDataMappingEditorPanel.propTypes = {
  userDataMappingModel: PropTypes.object,
  setUserDataMappingModel: PropTypes.func,
  handleClose: PropTypes.func,
};

export default UserDataMappingEditorPanel;
