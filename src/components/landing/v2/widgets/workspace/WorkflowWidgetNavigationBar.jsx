import React from "react";
import {SubMenuContainer, SubMenuItem} from "@opsera/react-vanity-set";
import PropTypes from "prop-types";
import sessionHelper from "utils/session.helper";

export const WORKFLOW_WIDGET_VIEWS = {
  MY_WORKFLOWS: "owned",
  FOLLOWING: "subscribed",
  RECENT_ACTIVITY: "recent",
};

export default function WorkflowWidgetNavigationBar(
  {
    currentView,
    setCurrentView,
  }) {
  const handleNavigationItemClick = (itemKey) => {
    sessionHelper.setCookie(sessionHelper.SUPPORTED_COOKIE_STORAGE_KEYS.LANDING_SCREEN_WORKFLOW_WIDGET_CURRENT_VIEW, itemKey);
    setCurrentView(itemKey);
  };

  if (setCurrentView == null) {
    return null;
  }

  return (
    <SubMenuContainer className={"mx-auto"}>
      <SubMenuItem
        className={"px-3"}
        itemKey={WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS}
        activeKey={currentView}
        setActiveKey={handleNavigationItemClick}
        label={"My Workflows"}
      />
      <SubMenuItem
        className={"px-3"}
        activeKey={currentView}
        setActiveKey={handleNavigationItemClick}
        label={"Following"}
        itemKey={WORKFLOW_WIDGET_VIEWS.FOLLOWING}
      />
      <SubMenuItem
        className={"px-3"}
        activeKey={currentView}
        setActiveKey={handleNavigationItemClick}
        label={"Recent"}
        itemKey={WORKFLOW_WIDGET_VIEWS.RECENT_ACTIVITY}
      />
    </SubMenuContainer>
  );
}

WorkflowWidgetNavigationBar.propTypes = {
  currentView: PropTypes.string,
  setCurrentView: PropTypes.func,
};
