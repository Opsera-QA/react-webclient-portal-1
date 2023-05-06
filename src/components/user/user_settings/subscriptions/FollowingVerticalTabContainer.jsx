import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faTasks, faDraftingCompass, faTags, faChartNetwork} from "@fortawesome/pro-light-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import userSubscriptionConstants from "@opsera/definitions/constants/subscriptions/userSubscription.constants";

export default function FollowingVerticalTabContainer(
  {
    activeTab,
    setActiveTab,
  }) {
  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faChartNetwork}
        tabText={"Dashboards"}
        tabName={userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.DASHBOARD}
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"Pipelines"}
        tabName={userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.PIPELINE}
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faTags}
        tabText={"Tags"}
        tabName={userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.TAG}
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />
      <VanitySetVerticalTab
        icon={faTasks}
        tabText={"Tasks"}
        tabName={userSubscriptionConstants.SUPPORTED_OBJECT_TYPES.TASK}
        handleTabClick={setActiveTab}
        activeTab={activeTab}
      />
    </VanitySetVerticalTabContainer>
  );
}

FollowingVerticalTabContainer.propTypes = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};
