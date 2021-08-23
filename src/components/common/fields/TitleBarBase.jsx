import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function TitleBarBase({ icon, isLoading, title, actionButtons }) {
  return (
    <div className="px-2 d-flex input-title-bar justify-content-between">
      <div className={"my-auto"}>
        <IconBase icon={icon} isLoading={isLoading} className={"mr-1"}/>
        <span>{title}</span>
      </div>
      <div className={"my-auto"}>
        {actionButtons}
      </div>
    </div>
  );
}

TitleBarBase.propTypes = {
  icon: PropTypes.object,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  actionButtons: PropTypes.any
};

export default TitleBarBase;