import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function FilterTitleBar({ title, inlineFilters, titleIcon, isLoading }) {
  return (
    <div className={"d-flex w-100 justify-content-between"}>
      <div className={"my-auto filter-title-text text-nowrap w-100"}>
        <span className={"d-flex"}>
          <IconBase icon={titleIcon} isLoading={isLoading} className={"mr-2 my-auto d-none d-lg-block"} />
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
  title: PropTypes.any,
  titleIcon: PropTypes.object,
  inlineFilters: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default FilterTitleBar;