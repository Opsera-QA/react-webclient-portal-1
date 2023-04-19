import React from "react";
import {SubMenuContainer, SubMenuItem} from "@opsera/react-vanity-set";
import PropTypes from "prop-types";

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
  return (
    <SubMenuContainer className={"mx-auto"}>
      <SubMenuItem
        className={"px-3"}
        itemKey={WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS}
        currentView={currentView}
        setCurrentView={setCurrentView}
        label={"My Workflows"}
      />
      <SubMenuItem
        className={"px-3"}
        currentView={currentView}
        setCurrentView={setCurrentView}
        label={"Following"}
        itemKey={WORKFLOW_WIDGET_VIEWS.FOLLOWING}
      />
      <SubMenuItem
        className={"px-3"}
        currentView={currentView}
        setCurrentView={setCurrentView}
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
