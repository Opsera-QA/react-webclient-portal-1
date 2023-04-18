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
    activeKey,
    setActiveKey,
  }) {
  const handleSubItemClick = (newScreen) => {
    if (newScreen === activeKey) {
      return;
    }

    setActiveKey(newScreen);
  };

  return (
    <SubMenuContainer className={"mx-auto"}>
      <SubMenuItem
        className={"px-3"}
        itemKey={WORKFLOW_WIDGET_VIEWS.MY_WORKFLOWS}
        activeKey={activeKey}
        setActiveKey={handleSubItemClick}
        label={"My Workflows"}
      />
      <SubMenuItem
        className={"px-3"}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        label={"Following"}
        itemKey={WORKFLOW_WIDGET_VIEWS.FOLLOWING}
      />
      <SubMenuItem
        className={"px-3"}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        label={"Recent"}
        itemKey={WORKFLOW_WIDGET_VIEWS.RECENT_ACTIVITY}
      />
    </SubMenuContainer>
  );
}

WorkflowWidgetNavigationBar.propTypes = {
  activeKey: PropTypes.string,
  setActiveKey: PropTypes.func,
};
