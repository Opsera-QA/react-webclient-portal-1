import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import BetaBadge from "components/common/badges/TooltipBadgeBase";

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
      <div className="ml-auto d-flex">
        {getInactiveText()}
        {titleActionBar}
        <LaunchHelpIcon helpComponent={helpComponent} className={"ml-2"} />
        <BetaBadge isBeta={isBeta} />
      </div>
    );
  };

  if (isLoading) {
    return (<span><IconBase isLoading={isLoading} className={"mr-2"}/>Loading Data</span>);
  }

  return (
    <div className="d-flex">
      <div><span><IconBase icon={titleIcon} className={"mr-2"}/>{title}</span></div>
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