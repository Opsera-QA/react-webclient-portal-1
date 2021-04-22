import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function TitleBar({ title, titleIcon, isLoading, inactive, titleActionBar }) {
  const getInactiveText = () => {
    if (inactive) {
      return (<span className="text-white-50 mx-1">{inactive && "Inactive"}</span>);
    }
  };

  const getRightSideItems = () => {
    return (
      <div className="ml-auto d-flex mr-1">
        {getInactiveText()}
        {titleActionBar}
      </div>
    );
  };

  if (isLoading) {
    return (<span><IconBase isLoading={isLoading} className={"mr-2"}/>Loading Data</span>);
  }

  return (
    <div className="d-flex">
      <div><span><FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>{title}</span></div>
      {getRightSideItems()}
    </div>
  );
}


TitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  titleActionBar: PropTypes.object,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default TitleBar;