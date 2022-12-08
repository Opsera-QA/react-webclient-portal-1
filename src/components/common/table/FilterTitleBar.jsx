import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function FilterTitleBar(
  {
    title,
    inlineFilters,
    titleIcon,
    isLoading,
    isPolling,
  }) {
  return (
    <div className={"d-flex w-100 justify-content-between filter-title-bar"}>
      <div className={"my-auto mr-2 filter-title-text text-nowrap"}>
        <span className={"d-flex"}>
          <IconBase icon={titleIcon} isLoading={isLoading || isPolling} className={"mr-2 d-none d-lg-block"} />
          {title}
        </span>
      </div>
      <div className={"d-flex"}>
        <div className={"my-1"}>
          {inlineFilters}
        </div>
      </div>
    </div>
  );
}

FilterTitleBar.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  inlineFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  isPolling: PropTypes.bool,
};

export default FilterTitleBar;