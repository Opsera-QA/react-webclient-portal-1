import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {
  faTasks,
  faTools,
  faChartNetwork,
  faDraftingCompass, faFileCode, faHandshake, faBallotCheck,
} from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";

export default function LdapGroupAssignedRolesTabContainer(
  {
    isLoading,
    assignedRoleFilterModel,
    loadData,
  }) {
  const handleTabClick = (type) => {
    if (assignedRoleFilterModel?.getData("type") !== type) {
      assignedRoleFilterModel?.setData("type", type);
      loadData(assignedRoleFilterModel);
    }
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faTools}
        tabText={"Tools"}
        tabName={"tools"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={assignedRoleFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"Pipelines"}
        tabName={"pipelines"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={assignedRoleFilterModel?.getData("type")}
      />
      {/*<VanitySetVerticalTab*/}
      {/*  icon={faBallotCheck}*/}
      {/*  tabText={"Pipeline Instructions"}*/}
      {/*  tabName={"pipeline_instructions"}*/}
      {/*  disabled={isLoading}*/}
      {/*  handleTabClick={handleTabClick}*/}
      {/*  activeTab={assignedRoleFilterModel?.getData("type")}*/}
      {/*/>*/}
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"Tasks"}
        tabName={"tasks"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={assignedRoleFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faChartNetwork}
        tabText={"Dashboards"}
        tabName={"dashboards"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={assignedRoleFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faFileCode}
        tabText={"Parameters"}
        tabName={"parameters"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={assignedRoleFilterModel?.getData("type")}
      />
      <VanitySetVerticalTab
        icon={faHandshake}
        tabText={"Scripts"}
        tabName={"scripts"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={assignedRoleFilterModel?.getData("type")}
      />
    </VanitySetVerticalTabContainer>
  );
}

LdapGroupAssignedRolesTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  assignedRoleFilterModel: PropTypes.object,
  loadData: PropTypes.func,
};