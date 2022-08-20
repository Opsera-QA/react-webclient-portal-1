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
import { workspaceConstants } from "components/workspace/workspace.constants";

export default function FreeTrialWorkspaceVerticalTabContainer(
  {
    workspaceFilterModel,
    loadData,
    isLoading,
  }) {
  const setDataFunction = (selectedOption) => {
    const currentOption = workspaceFilterModel?.getData("type");

    if (currentOption !== selectedOption) {
      workspaceFilterModel?.setData("type", selectedOption);
      loadData({...workspaceFilterModel});
    }
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faChartTreeMap}
        tabText={"All"}
        tabName={workspaceConstants.WORKSPACE_ITEM_TYPES.ALL}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
        disabled={isLoading}
      />
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"Pipelines"}
        tabName={workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
        disabled={isLoading}
      />
      <VanitySetVerticalTab
        icon={faClipboardList}
        tabText={"Registry"}
        tabName={workspaceConstants.WORKSPACE_ITEM_TYPES.TOOL}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
        disabled={isLoading}
      />
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"Tasks"}
        tabName={workspaceConstants.WORKSPACE_ITEM_TYPES.TASK}
        handleTabClick={setDataFunction}
        activeTab={workspaceFilterModel?.getData("type")}
        disabled={isLoading}
      />
    </VanitySetVerticalTabContainer>
  );
}

FreeTrialWorkspaceVerticalTabContainer.propTypes = {
  workspaceFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};