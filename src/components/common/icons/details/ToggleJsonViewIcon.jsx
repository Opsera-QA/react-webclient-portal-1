import React from "react";
import PropTypes from "prop-types";
import {faCode} from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function ToggleJsonViewIcon(
  {
    activeTab,
    setActiveTab,
    className,
    visible,
  }) {

  if (!setActiveTab || activeTab === "json" || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <OverlayIconBase
        className={className}
        overlayBody={"Toggle JSON View"}
        icon={faCode}
        onClickFunction={() => setActiveTab("json")}
      />
    </div>
  );
}

ToggleJsonViewIcon.propTypes = {
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool
};

ToggleJsonViewIcon.defaultProps = {
  visible: false, // TODO: Remove this when approved. It's used as a feature flag
};