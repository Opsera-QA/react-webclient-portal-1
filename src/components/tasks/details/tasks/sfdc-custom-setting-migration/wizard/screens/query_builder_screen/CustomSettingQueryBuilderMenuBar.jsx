import React from "react";
import {SubMenuContainer, SubMenuItem} from "@opsera/react-vanity-set";
import PropTypes from "prop-types";

export const QUERY_BUILDER_VIEWS = {
  MANUAL_QUERY_BUILDER: "manual",
  FILTER_SELECTION_QUERY_BUILDER: "filter",
};

export default function CustomSettingQueryBuilderMenuBar(
  {
    currentView,
    setCurrentView,
  }) {
  const handleNavigationItemClick = (itemKey) => {
    setCurrentView(itemKey);
  };

  if (setCurrentView == null) {
    return null;
  }

  return (
    <SubMenuContainer className={"mx-auto"}>
      <SubMenuItem
        className={"px-3"}
        itemKey={QUERY_BUILDER_VIEWS.MANUAL_QUERY_BUILDER}
        activeKey={currentView}
        setActiveKey={handleNavigationItemClick}
        label={"Manual Query Editor"}
      />
      <SubMenuItem
        className={"px-3"}
        activeKey={currentView}
        setActiveKey={handleNavigationItemClick}
        label={"Query Builder"}
        itemKey={QUERY_BUILDER_VIEWS.FILTER_SELECTION_QUERY_BUILDER}
      />
    </SubMenuContainer>
  );
}

CustomSettingQueryBuilderMenuBar.propTypes = {
  currentView: PropTypes.string,
  setCurrentView: PropTypes.func,
};
