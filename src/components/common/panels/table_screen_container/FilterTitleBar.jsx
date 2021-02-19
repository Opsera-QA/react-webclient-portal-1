import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faSpinner } from "@fortawesome/pro-light-svg-icons";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";

function FilterTitleBar({ title, addRecordFunction, inlineFilters, filterDto, titleIcon, isLoading, type }) {
  // TODO: Make component
  const getTitleIcon = () => {
    if (isLoading) {
      return <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>;
    }

    return <FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>;
  };

  return (
    <div className="d-flex w-100 justify-content-end">
      <div className="d-none d-xl-block my-auto mr-2 filter-title-text text-nowrap">{getTitleIcon()}{title}</div>

      <div className="d-none d-xl-block mx-auto"></div>

      <NewRecordButton className={"mr-3 my-auto text-nowrap"} addRecordFunction={addRecordFunction}
                       type={filterDto?.getType() || type} isLoading={isLoading} variant={"success"}/>

      <div className="my-1">{inlineFilters}</div>
    </div>
  );
}

FilterTitleBar.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  inlineFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  addRecordFunction: PropTypes.func,
  filterDto: PropTypes.object,
  type: PropTypes.string,
};

export default FilterTitleBar;