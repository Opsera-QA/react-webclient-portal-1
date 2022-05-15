import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";

function DashboardVerticalTabContainer({ isLoading, dashboardFilterModel, loadData }) {
  const handleTabClick = (tab) => {
    dashboardFilterModel?.setData("type", tab);
    loadData(dashboardFilterModel);
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        tabText={"All Dashboards"}
        tabName={""}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"My Dashboards"}
        tabName={"owner"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Operations"}
        tabName={"operations"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Pipeline"}
        tabName={"pipeline"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Planning"}
        tabName={"planning"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Quality"}
        tabName={"quality"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={dashboardFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        tabText={"Security"}
        tabName={"security"}
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