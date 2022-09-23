import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import BadgeBase from "components/common/badges/BadgeBase";
import { faCircleInfo } from "@fortawesome/pro-light-svg-icons";
import BetaBadge from "components/common/badges/BetaBadge";

function TitleBar(
  {
    title,
    titleIcon,
    isLoading,
    inactive,
    titleActionBar,
    helpComponent,
    isBeta,
  }) {
  const getInactiveText = () => {
    if (inactive) {
      return (<span className="text-white-50 mx-1">{inactive && "Inactive"}</span>);
    }
  };

  const getRightSideItems = () => {
    return (
      <div className="ml-auto d-flex mr-2">
        {getInactiveText()}
        {titleActionBar}
        <LaunchHelpIcon helpComponent={helpComponent} className={"ml-2"} />
        <BetaBadge
          isBeta={isBeta}
          className={"mr-1 ml-2 my-auto"}
        />
      </div>
    );
  };

  if (isLoading) {
    return (<span><IconBase isLoading={isLoading} className={"mr-1"}/>Loading Data</span>);
  }

  return (
    <div className="d-flex">
      <div><span><IconBase icon={titleIcon} className={"mr-1"}/>{title}</span></div>
      {getRightSideItems()}
    </div>
  );
}


TitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  titleActionBar: PropTypes.object,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool,
  helpComponent: PropTypes.object,
  isBeta: PropTypes.bool,
};

export default TitleBar;