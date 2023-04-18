import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

export default function WidgetTitleBar(
  {
    title,
    rightSideComponents,
    middleComponents,
    titleIcon,
    isLoading,
    isPolling,
  }) {
  return (
    <div className={"d-flex w-100 justify-content-between"}>
      <div className={"my-auto mr-2 filter-title-text text-nowrap"}>
        <span className={"d-flex"}>
          <IconBase icon={titleIcon} isLoading={isLoading || isPolling} className={"mr-2 d-none d-lg-block"} />
          {title}
        </span>
      </div>
      <div>
        {middleComponents}
      </div>
      <div className={"d-flex"}>
        {rightSideComponents}
      </div>
    </div>
  );
}

WidgetTitleBar.propTypes = {
  title: PropTypes.any,
  titleIcon: PropTypes.object,
  rightSideComponents: PropTypes.any,
  middleComponents: PropTypes.any,
  isLoading: PropTypes.bool,
  isPolling: PropTypes.bool,
};
