import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faStar} from "@fortawesome/pro-solid-svg-icons";

export default function FollowingVerticalTab(
  {
    pluralResourceType,
    isLoading,
    activeTab,
    handleTabClickFunction,
  }) {
  return (
    <VanitySetVerticalTab
      icon={faStar}
      tabText={"Following"}
      tabName={"subscribed"}
      disabled={isLoading}
      handleTabClick={handleTabClickFunction}
      activeTab={activeTab}
      tooltipText={`View ${pluralResourceType} that you have access to and have followed.`}
      className={"opsera-yellow"}
    />
  );
}

FollowingVerticalTab.propTypes = {
  isLoading: PropTypes.bool,
  pluralResourceType: PropTypes.string,
  activeTab: PropTypes.string,
  handleTabClickFunction: PropTypes.func,
};

FollowingVerticalTab.defaultProps = {
  pluralResourceType: "Items",
};
