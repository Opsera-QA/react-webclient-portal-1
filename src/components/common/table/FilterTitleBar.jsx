import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function FilterTitleBar({ title, inlineFilters, titleIcon, isLoading, stackFilters }) {

  if (stackFilters) {
    return (
      <div className="w-100 my-1">
        <div className="d-none d-lg-block my-auto mr-2 filter-title-text text-nowrap">
          <span><IconBase icon={titleIcon} isLoading={isLoading} className={"mr-1"}/>{title}</span>
        </div>
        <div className="d-flex">
          <div className="my-1">{inlineFilters}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex w-100 justify-content-between">
      <div className="d-none d-lg-block my-auto mr-2 filter-title-text text-nowrap">
        <span><IconBase icon={titleIcon} isLoading={isLoading} className={"mr-1"} />{title}</span>
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
  stackFilters: PropTypes.bool
};

export default FilterTitleBar;