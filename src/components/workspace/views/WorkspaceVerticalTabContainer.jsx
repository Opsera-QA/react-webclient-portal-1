import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {
  faTasks,
  faClipboardList,
  faDraftingCompass,
} from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";

export default function WorkspaceVerticalTabContainer(
  {
    activeView,
    setActiveView,
  }) {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"Pipelines"}
        tabName={"pipelines"}
        handleTabClick={setActiveView}
        activeTab={activeView}
      />
      <VanitySetVerticalTab
        icon={faClipboardList}
        tabText={"Registry"}
        tabName={"registry"}
        handleTabClick={setActiveView}
        activeTab={activeView}
      />
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"Tasks"}
        tabName={"tasks"}
        handleTabClick={setActiveView}
        activeTab={activeView}
      />
    </VanitySetVerticalTabContainer>
  );
}

WorkspaceVerticalTabContainer.propTypes = {
  activeView: PropTypes.string,
  setActiveView: PropTypes.func,
};