import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import RefreshButton from "components/common/buttons/data/RefreshButton";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";

function InputTitleBar(
  {
    field,
    icon,
    isLoading,
    helpComponent,
    searchTerm,
    setSearchTerm,
    showSearchBar,
    disableSearch,
    customTitle,
    loadDataFunction,
    rightSideButton,
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

  const getRightSideButton = () => {
    if (rightSideButton) {
      return (
        <div className={"ml-2 my-auto"}>
          {rightSideButton}
        </div>
      );
    }
  };

  // TODO: Make InputSearchBar component?
  const getSearchBar = () => {
    if (showSearchBar) {
      return (
        // <InputGroup className={"flex-nowrap"}>
        //   <InputGroup.Prepend>
        //     <Button
        //       disabled={isLoading}
        //       size={"sm"}
        //     >
        //       <IconBase
        //         isLoading={isLoading}
        //         icon={faSearch}
        //       />
        //     </Button>
        //   </InputGroup.Prepend>
          <input
            placeholder={"Search"}
            disabled={disableSearch}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={"input-search-filter"}
          />
        // </InputGroup>
      );
    }
  };

  const getLoadDataButton = () => {
    if (loadDataFunction) {
      return (
        <RefreshButton
          loadDataFunction={loadDataFunction}
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
        <div className={"my-auto"}>
          <LaunchHelpIcon helpComponent={helpComponent}/>
        </div>
        {getLoadDataButton()}
        {getRightSideButton()}
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
  disableSearch: PropTypes.bool,
  customTitle: PropTypes.string,
  helpComponent: PropTypes.object,
  loadDataFunction: PropTypes.func,
  className: PropTypes.string,
  rightSideButton: PropTypes.object,
};

InputTitleBar.defaultProps = {
  className: "input-title-bar py-1",
};

export default InputTitleBar;