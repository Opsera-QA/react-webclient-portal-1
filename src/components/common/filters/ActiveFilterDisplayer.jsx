import React from "react";
import PropTypes from "prop-types";
import { faFilter, faTimes } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { hasStringValue } from "components/common/helpers/string-helpers";

function ActiveFilterDisplayer(
  {
    filterModel,
    loadData,
  }) {
  const getFilterCloseButton = (filterId) => {
    if (filterModel?.areFilterBadgesReadOnly == null || filterModel?.areFilterBadgesReadOnly() !== true) {
      return (
        <span
          className={"ml-1 pointer"}
          onClick={() => {
            removeFilter(filterId);
          }}
        >
          <IconBase icon={faTimes} />
        </span>
      );
    }
  };

  const getFilterActiveButton = (filter, key) => {
    if (hasStringValue(filter?.text) === true) {
      return (
        <span key={key} className="mx-1 badge badge-light filter-badge">
          <span className="mr-1"><IconBase icon={faFilter} /></span>
          <span>{filter?.text}</span>
          {getFilterCloseButton(filter?.filterId)}
       </span>
      );
    }
  };

  const removeFilter = (fieldName) => {
    filterModel?.setDefaultValue(fieldName);
    filterModel?.setData("currentPage", 1);
    loadData(filterModel);
  };

  const getActiveFilters = () => {
    const activeFilters = filterModel?.getArrayData("activeFilters");
    if (Array.isArray(activeFilters) && activeFilters.length > 0) {
      return (
        <div className={"active-filter-bar item-field py-2 px-1"}>
          {activeFilters.map((filter, key) => getFilterActiveButton(filter, key))}
        </div>
      );
    }

    return null;
  };

  if (filterModel == null) {
    return null;
  }

  return (getActiveFilters());
}

ActiveFilterDisplayer.propTypes = {
  filterModel: PropTypes.object,
  loadData: PropTypes.func,
};

export default ActiveFilterDisplayer;