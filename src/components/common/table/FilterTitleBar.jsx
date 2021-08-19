import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function FilterTitleBar({ title, inlineFilters, titleIcon, isLoading }) {
  return (
    <div className="d-flex w-100 justify-content-between filter-title-bar">
      <div className="d-none d-lg-block my-auto mr-2 filter-title-text text-nowrap">
        <span><IconBase icon={titleIcon} isLoading={isLoading} className={"mr-2"} />{title}</span>
      </div>
      <div className="d-flex">
        <div className="my-1">{inlineFilters}</div>
      </div>
    </div>
  );
}

FilterTitleBar.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  inlineFilters: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default FilterTitleBar;