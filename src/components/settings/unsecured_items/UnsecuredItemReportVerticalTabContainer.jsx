import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {
  faTasks,
  faClipboardListCheck,
  faHandshake,
  faCompassDrafting,
  faFileCode,
} from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";

function UnsecuredItemReportVerticalTabContainer({
  isLoading,
  itemFilterModel,
  loadData,
}) {
  const handleTabClick = (category) => {
    itemFilterModel?.setData("category", category);
    loadData(itemFilterModel);
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"All"}
        tabName={"all"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={itemFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faCompassDrafting}
        tabText={"Pipelines"}
        tabName={"pipelines"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={itemFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"Tasks"}
        tabName={"task"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={itemFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faClipboardListCheck}
        tabText={"Tools"}
        tabName={"tools"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={itemFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faFileCode}
        tabText={"Scripts"}
        tabName={"scripts"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={itemFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faHandshake}
        tabText={"Parameters"}
        tabName={"parameters"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={itemFilterModel?.getData("category")}
      />
    </VanitySetVerticalTabContainer>
  );
}

UnsecuredItemReportVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  itemFilterModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default UnsecuredItemReportVerticalTabContainer;
