import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function TwoLineDataBlockBase({ title, subtitle, className, icon,}) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div className={"data-block-left-icon"}>
          <IconBase icon={icon}  />
        </div>
      );
    }
  };

  const getTitle = () => {
    if (title) {
      return (
        <div>
          {title}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (subtitle) {
      return (
        <div>
          {subtitle}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"p-2 text-center"}>
        {getLeftDataBlockIcon()}
        <div className="data-block-focal-text">
          {getTitle()}
        </div>
        <div className="w-100 text-muted">
          {getSubtitle()}
        </div>
      </div>
    </div>
  );
}

TwoLineDataBlockBase.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
};

export default TwoLineDataBlockBase;