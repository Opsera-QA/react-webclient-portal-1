import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import BetaBadge from "components/common/badges/BetaBadge";
import useLocationReference from "hooks/useLocationReference";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import {faLink} from "@fortawesome/pro-light-svg-icons";
import EditFiltersIcon from "temp-library-components/icon/filters/EditFiltersIcon";
import RefreshIcon from "temp-library-components/icon/refresh/RefreshIcon";
import SearchFilter from "components/common/filters/search/SearchFilter";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import ViewToggle from "components/common/view/ViewToggle";

function ScreenContainerTitleBar(
  {
    title,
    titleIcon,
    isLoading,
    inactive,
    titleActionBar,
    helpComponent,
    isBeta,
    filterOverlay,
    filterModel,
    setFilterModel,
    loadDataFunction,
    addRecordFunction,
    addRecordButtonCustomText,
    isSoftLoading,
  }) {
  const {
    currentUrl,
  } = useLocationReference();

  const getInactiveText = () => {
    if (inactive) {
      return (<span className="text-white-50 ml-3">{inactive && "Inactive"}</span>);
    }
  };

  const getTitleActionBar = () => {
    if (titleActionBar) {
      return (
        <div className={"normal-text"}>
          {titleActionBar}
        </div>
      );
    }
  };

  const getRightSideItems = () => {
    return (
      <div className="ml-auto d-flex">
        <NewRecordButton
          className={"ml-2 my-auto text-nowrap"}
          addRecordFunction={addRecordFunction}
          type={filterModel?.getType()}
          isLoading={isLoading || isSoftLoading}
          variant={"success"}
          customButtonText={addRecordButtonCustomText}
        />
        {getTitleActionBar()}
        <SearchFilter
          isLoading={isLoading || isSoftLoading}
          paginationModel={filterModel}
          searchText={filterModel?.getData("search")}
          loadData={loadDataFunction}
          className={"ml-3"}
          metadata={filterModel?.getMetaData()}
          visible={typeof filterModel?.canSearch === "function" && filterModel?.canSearch() === true}
          variant={"secondary"}
        />
        <ViewToggle
          supportViewToggle={typeof filterModel?.canToggleView === "function" && filterModel?.canToggleView() === true}
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          isLoading={isLoading || isSoftLoading}
          className={"ml-2"}
          variant={"secondary"}
        />
        <EditFiltersIcon
          filterModel={filterModel}
          filterOverlay={filterOverlay}
          className={"ml-3"}
          isLoading={isLoading || isSoftLoading}
        />
        <CopyToClipboardIconBase
          className={"ml-3"}
          copyString={currentUrl}
          copyIcon={faLink}
          copyText={"Copy direct link to this page."}
          copiedText={"Copied direct link to clipboard!"}
        />
        <LaunchHelpIcon
          helpComponent={helpComponent}
          className={"ml-3"}
        />
        <RefreshIcon
          className={"ml-3"}
          isLoading={isLoading || isSoftLoading}
          loadDataFunction={loadDataFunction}
        />
        <BetaBadge
          isBeta={isBeta}
          className={"mr-1 ml-3 my-auto"}
        />
        {getInactiveText()}
      </div>
    );
  };

  return (
    <div className="d-flex">
      <div className={"title-text-header-1"}>
        <span>
          <IconBase isLoading={isLoading || isSoftLoading} icon={titleIcon} className={"mr-2"}/>
          {isLoading === true ? "Loading Data" : title}
        </span>
      </div>
      {getRightSideItems()}
    </div>
  );
}


ScreenContainerTitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  titleActionBar: PropTypes.object,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool,
  helpComponent: PropTypes.object,
  isBeta: PropTypes.bool,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  loadDataFunction: PropTypes.func,
  filterOverlay: PropTypes.any,
  addRecordFunction: PropTypes.func,
  addRecordButtonCustomText: PropTypes.string,
  isSoftLoading: PropTypes.bool,
};

export default ScreenContainerTitleBar;