import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import { faTasks, faClipboardListCheck, faUser } from "@fortawesome/pro-light-svg-icons";
import {faAws, faMicrosoft, faSalesforce} from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import {faGitAlt} from "@fortawesome/free-brands-svg-icons/faGitAlt";

function TaskVerticalTabContainer({ isLoading, taskFilterModel, loadData }) {
  const handleTabClick = (tab) => {
    taskFilterModel?.setData("category", tab);
    taskFilterModel?.setData("type", "");
    loadData(taskFilterModel);
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"All"}
        tabName={""}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={taskFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faUser}
        tabText={"My Tasks"}
        tabName={"owner"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={taskFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faAws}
        tabText={"AWS"}
        tabName={"aws"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={taskFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faMicrosoft}
        tabText={"Azure"}
        tabName={"azure"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={taskFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faGitAlt}
        tabText={"Git"}
        tabName={"git"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={taskFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faSalesforce}
        tabText={"Salesforce"}
        tabName={"salesforce"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={taskFilterModel?.getData("category")}
      />
      <VanitySetVerticalTab
        icon={faClipboardListCheck}
        tabText={"Compliance"}
        tabName={"compliance"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={taskFilterModel?.getData("category")}
      />
    </VanitySetVerticalTabContainer>
  );
}

TaskVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  taskFilterModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default TaskVerticalTabContainer;