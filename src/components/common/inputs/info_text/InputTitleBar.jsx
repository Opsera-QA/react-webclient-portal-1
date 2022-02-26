import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import RefreshButton from "components/common/buttons/data/RefreshButton";

function InputTitleBar(
  {
    field,
    icon,
    isLoading,
    helpComponent,
    searchTerm,
    setSearchTerm,
    showSearchBar,
    disabled,
    customTitle,
    loadDataFunction,
    className,
  }) {
  const getTitle = () => {
    if (customTitle) {
      return customTitle;
    }

    if (field) {
      return (
        <span>{field?.label}{field?.isRequired && <span className="danger-red">*</span>}</span>
      );
    }
  };

  const getFormattedLabel = () => {
    return (
      <div className={"my-auto"}>
        <IconBase icon={icon} isLoading={isLoading} className={"mr-2"}/>
        <span>{getTitle()}</span>
      </div>
    );
  };

  // TODO: Make InputSearchBar component?
  const getSearchBar = () => {
    if (showSearchBar) {
      return (
        <input
          placeholder={"Search"}
          disabled={isLoading || disabled}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={"input-search-filter"}
        />
      );
    }
  };

  const getLoadDataButton = () => {
    if (loadDataFunction) {
      return (
        <RefreshButton
          loadData={loadDataFunction}
          isLoading={isLoading}
          className={"ml-2 my-auto"}
        />
      );
    }
  };


  return (
    <div className={`${className} px-2 d-flex justify-content-between`}>
      {getFormattedLabel()}
      <div className={"d-flex"}>
        {getSearchBar()}
        {getLoadDataButton()}
        <div className={"my-auto"}>
          <LaunchHelpIcon helpComponent={helpComponent}/>
        </div>
      </div>
    </div>
  );
}

InputTitleBar.propTypes = {
  field: PropTypes.object,
  icon: PropTypes.object,
  isLoading: PropTypes.bool,
  setSearchTerm: PropTypes.func,
  searchTerm: PropTypes.string,
  showSearchBar: PropTypes.bool,
  disabled: PropTypes.bool,
  customTitle: PropTypes.string,
  helpComponent: PropTypes.object,
  loadDataFunction: PropTypes.func,
  className: PropTypes.string,
};

InputTitleBar.defaultProps = {
  className: "input-title-bar",
};

export default InputTitleBar;