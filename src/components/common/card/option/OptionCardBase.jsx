import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function OptionCardBase({body, icon, visible, className, onClickFunction}) {
  const getIcon = () => {
    if (icon) {
      return (
        <IconBase
          iconSize={"2x"}
          icon={icon}
          className={"page-link-card-icon p-2 mr-3 mb-auto"}
        />
      );
    }
  };

  if (visible === false || onClickFunction == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={'mb-3 page-link-card'} onClick={onClickFunction}>
        {/*<div className={'mb-3 page-link-card container-border'} onClick={onClickFunction}>*/}
        <div className={"page-link-card-body d-flex p-2"}>
          {getIcon()}
          {body}
        </div>
      </div>
    </div>
  );
}

OptionCardBase.propTypes = {
  body: PropTypes.any,
  onClickFunction: PropTypes.func,
  icon: PropTypes.object,
  visible: PropTypes.bool,
  className: PropTypes.string,
  pageDescription: PropTypes.string,
};

export default OptionCardBase;