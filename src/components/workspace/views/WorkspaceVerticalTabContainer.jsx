import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {
  faTasks,
  faClipboardList,
  faDraftingCompass,
  faChartTreeMap,
} from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import { hasStringValue } from "components/common/helpers/string-helpers";

export default function WorkspaceVerticalTabContainer(
  {
    workspaceFilterModel,
    setWorkspaceFilterModel,
  }) {
  const setDataFunction = (selectedOption) => {
    const currentOption = workspaceFilterModel?.getData("type");

    if (hasStringValue(currentOption) && currentOption !== selectedOption) {
      workspaceFilterModel?.setData("type", selectedOption);
      setWorkspaceFilterModel({...workspaceFilterModel});
    }
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faChartTreeMap}
        tabText={"All"}
        tabName={"all"}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"Pipelines"}
        tabName={"pipelines"}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faClipboardList}
        tabText={"Registry"}
        tabName={"registry"}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"Tasks"}
        tabName={"tasks"}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
      />
    </VanitySetVerticalTabContainer>
  );
}

WorkspaceVerticalTabContainer.propTypes = {
  workspaceFilterModel: PropTypes.object,
  setWorkspaceFilterModel: PropTypes.func,
};