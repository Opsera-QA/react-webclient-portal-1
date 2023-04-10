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
    filters,
    filterModel,
    setFilterModel,
    loadDataFunction,
    addRecordFunction,
    addRecordButtonCustomText,
  }) {
  const {
    currentUrl,
  } = useLocationReference();

  const getInactiveText = () => {
    if (inactive) {
      return (<span className="text-white-50 mx-1">{inactive && "Inactive"}</span>);
    }
  };

  const getRightSideItems = () => {
    return (
      <div className="ml-auto d-flex">
        <NewRecordButton
          className={"ml-2 my-auto text-nowrap"}
          addRecordFunction={addRecordFunction}
          type={filterModel?.getType()}
          isLoading={isLoading}
          variant={"success"}
          customButtonText={addRecordButtonCustomText}
        />
        {titleActionBar}
        <SearchFilter
          isLoading={isLoading}
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
          isLoading={isLoading}
          className={"ml-2"}
          variant={"secondary"}
        />
        <EditFiltersIcon
          filterModel={filterModel}
          filters={filters}
          loadDataFunction={loadDataFunction}
          className={"ml-3"}
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
          isLoading={isLoading}
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

  if (isLoading) {
    return (<span><IconBase isLoading={isLoading} className={"mr-2"}/>Loading Data</span>);
  }

  return (
    <div className="d-flex">
      <div><span><IconBase icon={titleIcon} className={"mr-2"}/>{title}</span></div>
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
  filters: PropTypes.any,
  addRecordFunction: PropTypes.func,
  addRecordButtonCustomText: PropTypes.string,
};

export default ScreenContainerTitleBar;