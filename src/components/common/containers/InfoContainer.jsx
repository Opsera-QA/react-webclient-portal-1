import React from "react";
import PropTypes from "prop-types";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import IconBase from "components/common/icons/IconBase";

function InfoContainer({ children, isLoading, titleIcon, titleText, helpComponent }) {
  const getTitleBar = () => {
    return (
      <div className="px-2 pt-2 d-flex justify-content-between">
        <div><IconBase isLoading={isLoading} icon={titleIcon} className="mr-2"/>{titleText}</div>
        <div>
          <LaunchHelpIcon helpComponent={helpComponent} className={"pt-2 pr-2"} />
        </div>
      </div>
    );
  };

  return (
    <div className="object-properties-input">
      <div className="content-container">
        <div className="property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        {children}
      </div>
    </div>
  );
}

InfoContainer.propTypes = {
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  children: PropTypes.any,
  helpComponent: PropTypes.any,
  isLoading: PropTypes.bool
};

export default InfoContainer;