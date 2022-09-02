import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

function FilterTitleBar(
  {
    title,
    inlineFilters,
    titleIcon,
    isLoading,
    className,
  }) {
  const getClassNames = () => {
    if (hasStringValue(className) === true) {
      return `${className} d-flex w-100 justify-content-between`;
    }

    return `d-flex w-100 justify-content-between py-2 pl-3 pr-2`;
  };

  return (
    <div className={getClassNames()}>
      <div className={"my-auto filter-title-text text-nowrap w-100"}>
          <span className={"d-flex"}>
            <IconBase icon={titleIcon} isLoading={isLoading} className={"mr-2 my-auto d-none d-lg-block"} />
            <span className={"my-auto"}>{title}</span>
          </span>
      </div>
      <div className={"d-flex"}>
        {inlineFilters}
      </div>
    </div>
  );
}

FilterTitleBar.propTypes = {
  title: PropTypes.any,
  titleIcon: PropTypes.object,
  inlineFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default FilterTitleBar;