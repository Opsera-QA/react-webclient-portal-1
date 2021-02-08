import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";

function FilterTitleBar({ title, addRecordFunction, inlineFilters, filterDto, titleIcon, isLoading }) {
  // TODO: Make component
  const getTitleIcon = () => {
    if (isLoading) {
      return <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>;
    }

    return <FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>;
  };

  return (
    <div className="d-flex w-100 justify-content-between">
      <div className="title-text-header d-flex">
        <div className="mt-2 mr-2">{getTitleIcon()} {title}</div>
        <div className="mt-1"><NewRecordButton addRecordFunction={addRecordFunction} type={filterDto?.getType()} isLoading={isLoading} /></div>
      </div>
      {inlineFilters}
    </div>
  );
}


FilterTitleBar.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  inlineFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  addRecordFunction: PropTypes.func,
  filterDto: PropTypes.object
};

export default FilterTitleBar;