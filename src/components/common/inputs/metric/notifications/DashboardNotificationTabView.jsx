import React, {useState} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import {faEnvelope} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SlackNotificationEditorPanel from "./inputs/slack/SlackNotificationEditorPanel";
import MicrosoftTeamsNotificationEditorPanel from "./inputs/teams/MicrosoftTeamsNotificationEditorPanel";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import GChatNotificationEditorPanel from "./inputs/gchat/GChatNotificationEditorPanel";
import DashboardNotificationVerticalTabContainer from "./DashboardNotificationVerticalTabContainer";
import EmailNotificationEditorPanel from "./inputs/email/EmailNotificationEditorPanel";

function DashboardNotificationTabView(
  {
    slackNotificationModel,
    setSlackNotificationModel,
    teamsNotificationModel,
    setTeamsNotificationModel,
    gChatNotificationModel,
    setGChatNotificationModel,
    emailNotificationModel,
    setEmailNotificationModel,
  }) {
  const [activeTab, setTabSelection] = useState("email");

  const getCurrentView = () => {
    switch (activeTab) {
      case "email":
        return (
          <EmailNotificationEditorPanel
            emailNotificationModel={emailNotificationModel}
            setEmailNotificationModel={setEmailNotificationModel}
          />
        );      
      case "slack":
        return (
          <SlackNotificationEditorPanel
            slackNotificationModel={slackNotificationModel}
            setSlackNotificationModel={setSlackNotificationModel}
          />
        );      
      case "teams":
        return (
          <MicrosoftTeamsNotificationEditorPanel
            teamsNotificationModel={teamsNotificationModel}
            setTeamsNotificationModel={setTeamsNotificationModel}
          />
        );
      case "gchat":
        return (
          <GChatNotificationEditorPanel
            gChatNotificationModel={gChatNotificationModel}
            setGChatNotificationModel={setGChatNotificationModel}
          />
        );
    }
  };

  const getNotificationContainer = () => {
    return (
      <Row className={"full-height-overlay-container-with-buttons-and-title mx-0"}>
        <Col sm={2} className={"px-0 full-height-overlay-container-with-buttons-and-title-tabs"}>
          <DashboardNotificationVerticalTabContainer
            handleTabClickFunction={setTabSelection}
            activeTab={activeTab}
          />
        </Col>
        <Col sm={10} className={"px-0 full-height-overlay-container-with-buttons-and-title-body"}>
          <div className={"mx-3 mt-1"}>
            {getCurrentView()}
            <RequiredFieldsMessage />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <FilterContainer
      body={getNotificationContainer()}
      titleIcon={faEnvelope}
      title={"Dashboard Notifications"}
    />
  );
}

DashboardNotificationTabView.propTypes = {
  slackNotificationModel: PropTypes.object,
  setSlackNotificationModel: PropTypes.func,
  teamsNotificationModel: PropTypes.object,
  setTeamsNotificationModel: PropTypes.func,
  gChatNotificationModel: PropTypes.object,
  setGChatNotificationModel: PropTypes.func,
  emailNotificationModel: PropTypes.object,
  setEmailNotificationModel: PropTypes.func,
};

export default DashboardNotificationTabView;
