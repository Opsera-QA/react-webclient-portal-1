import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function InputTitleBar({ field, icon, isLoading, inputPopover, searchTerm, setSearchTerm, showSearchBar, disabled, customTitle }) {
  const getFormattedLabel = () => {
    return (
      <div className={"my-auto"}>
        <IconBase icon={icon} isLoading={isLoading} className={"mr-1"}/>
        <span>{customTitle ? customTitle : field?.label}{field?.isRequired ? <span className="danger-red">*</span> : null}</span>
      </div>
    );
  };

  const getInputPopover = () => {
    if (inputPopover) {
      return (
        <div>{inputPopover}</div>
      );
    }
  };

  const getSearchBar = () => {
    if (showSearchBar) {
      return (
        <input
          placeholder="Search"
          disabled={isLoading || disabled}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={"input-search-filter px-2"}
        />
      );
    }
  };

  return (
    <div className="pl-2 d-flex input-title-bar justify-content-between">
      {getFormattedLabel()}
      {getInputPopover()}
      {getSearchBar()}
    </div>
  );
}

InputTitleBar.propTypes = {
  field: PropTypes.object,
  inputPopover: PropTypes.object,
  icon: PropTypes.object,
  isLoading: PropTypes.bool,
  setSearchTerm: PropTypes.func,
  searchTerm: PropTypes.string,
  showSearchBar: PropTypes.bool,
  disabled: PropTypes.bool,
  customTitle: PropTypes.string
};

export default InputTitleBar;