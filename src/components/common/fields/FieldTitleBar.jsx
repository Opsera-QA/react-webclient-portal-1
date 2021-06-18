import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function FieldTitleBar({ field, icon, isLoading, customTitle, actionButtons }) {
  return (
    <div className="pl-2 d-flex input-title-bar justify-content-between">
      <div className={"my-auto"}>
        <IconBase icon={icon} isLoading={isLoading} className={"mr-1"}/>
        <span>{customTitle ? customTitle : field?.label}</span>
      </div>
      <div>
        {actionButtons}
      </div>
    </div>
  );
}

FieldTitleBar.propTypes = {
  field: PropTypes.object,
  icon: PropTypes.object,
  isLoading: PropTypes.bool,
  customTitle: PropTypes.string,
  actionButtons: PropTypes.any
};

export default FieldTitleBar;