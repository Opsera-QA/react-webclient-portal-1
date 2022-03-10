import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
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
  import axios from "axios";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";

function UserDataMappingEditorPanel(
  {
    userDataMappingModel,
    setUserDataMappingModel,
    handleClose,
  }) {
  const { getAccessToken } = useContext(AuthContext);
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
              dataObject={userDataMappingModel}
              setDataObject={setUserDataMappingModel}
              tool_id={userDataMappingModel.getData("tool_id")}
              tool_user_prop={userDataMappingModel.getData("tool_user_prop")}
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
        <div className="m-2">
          <Card>
            <Card.Text className={"mt-3 mb-3"} style={{ display: "flex", justifyContent: "center" }}>
              <strong>WARNING: </strong> Editing an active Analytics Data Mapping will result in loss of filtering
              functionality from data previously mapped with this information
            </Card.Text>
          </Card>
        </div>
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
      className={"mx-3 my-2"}
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
