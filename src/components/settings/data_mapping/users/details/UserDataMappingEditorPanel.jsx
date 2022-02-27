import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Card, Col, Row } from "react-bootstrap";
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
  import axios from "axios";
import {userDataMappingActions} from "components/settings/data_mapping/users/userDataMapping.actions";

function UserDataMappingEditorPanel({ userDataMappingModel, setUserDataMappingModel, handleClose }) {
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

  const createMapping = async (cancelSource = cancelTokenSource) => {
    let response = await userDataMappingActions.createUserDataMappingV2(getAccessToken, cancelSource, userDataMappingModel);
    if (response?.status === 200) {
      handleClose();
    }
  };

  const updateMapping = async (cancelSource = cancelTokenSource) => {
    return await userDataMappingActions.updateUserDataMappingV2(getAccessToken, cancelSource, userDataMappingModel);
  };

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
    <EditorPanelContainer
      recordDto={userDataMappingModel}
      setRecordDto={setUserDataMappingModel}
      createRecord={createMapping}
      updateRecord={updateMapping}
      handleClose={handleClose}
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
    </EditorPanelContainer>
  );
}

UserDataMappingEditorPanel.propTypes = {
  userDataMappingModel: PropTypes.object,
  setUserDataMappingModel: PropTypes.func,
  handleClose: PropTypes.func,
};

export default UserDataMappingEditorPanel;
