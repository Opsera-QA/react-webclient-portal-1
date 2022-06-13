import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {
  faChartNetwork,
  faUser,
  faDraftingCompass,
  faShieldCheck,
  faBanBug,
  faMemoCircleCheck,
  faDisplayMedical,
  faRss,
} from "@fortawesome/pro-light-svg-icons";

function DashboardVerticalTabContainer({ isLoading, dashboardFilterModel, loadData }) {
  const handleTabClick = (tab) => {
    dashboardFilterModel?.setData("type", tab);

    if (tab === "owner") {
      dashboardFilterModel?.setDefaultValue("owner");
    }

    loadData(dashboardFilterModel);
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        tabText={"All Dashboards"}
        icon={faChartNetwork}
        tabName={""}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"My Dashboards"}
        tabName={"owner"}
        icon={faUser}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Operations"}
        tabName={"operations"}
        icon={faDisplayMedical}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Pipeline"}
        tabName={"pipeline"}
        icon={faDraftingCompass}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Planning"}
        tabName={"planning"}
        icon={faMemoCircleCheck}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Quality"}
        tabName={"quality"}
        icon={faBanBug}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Security"}
        tabName={"security"}
        icon={faShieldCheck}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faRss}
        tabText={"Subscriptions"}
        tabName={"subscribed"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
    </VanitySetVerticalTabContainer>
  );
}

DashboardVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  dashboardFilterModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default DashboardVerticalTabContainer;