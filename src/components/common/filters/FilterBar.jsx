import React from "react";
import PropTypes from "prop-types";
import InlineSearchFilter from "components/common/filters/search/InlineSearchFilter";
import ViewToggle from "components/common/view/ViewToggle";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import RefreshButton from "components/common/buttons/data/RefreshButton";
import FilterButtons from "components/common/filters/buttons/FilterButtons";
import InlineClientSideSearchFilter from "components/common/filters/search/InlineClientSideSearchFilter";
import {hasStringValue} from "components/common/helpers/string-helpers";
import ExportDataButton from "components/common/buttons/data/export/ExportDataButton";
import ImportDataButton from "components/common/buttons/data/import/ImportDataButton";
import SearchFilter from "components/common/filters/search/SearchFilter";

function FilterBar(
  {
    filterModel,
    setFilterModel,
    loadData,
    isLoading,
    addRecordFunction,
    inlineFilters,
    supportSearch,
    supportViewToggle,
    dropdownFilters,
    supportClientSideSearching,
    exportButton,
    type,
    metadata,
    handleExportFunction,
    handleImportFunction,
    showRefreshButton,
    disableNewRecordButton,
    filterSelectionOverlayPanel,
  }) {
  const getType = () => {
    if (hasStringValue(type) === true) {
      return type;
    }

    if (hasStringValue(metadata?.type) === true) {
      return metadata?.type;
    }

    if (hasStringValue(filterModel?.getType()) === true) {
      return filterModel?.getType();
    }
  };

  // TODO: Remove or combine the duplicate search filters
  const getSearchBar = () => {
    if (supportClientSideSearching === true) {
      return (
        <InlineClientSideSearchFilter
          filterModel={filterModel}
          setFilterModel={setFilterModel}
          isLoading={isLoading}
          supportClientSideSearching={supportClientSideSearching}
          className={dropdownFilters != null || loadData != null || supportViewToggle ? "ml-2 d-none d-md-block" : null}
        />
      );
    }

    if (typeof filterModel?.canSearch === "function" && filterModel?.canSearch() === true) {
      return (
        <SearchFilter
          isLoading={isLoading}
          paginationModel={filterModel}
          searchText={filterModel?.getData("search")}
          loadData={loadData}
          className={dropdownFilters != null || loadData != null || supportViewToggle ? "ml-2 d-none d-md-block" : null}
          metadata={metadata}
        />
      );
    }

    return (
      <InlineSearchFilter
        isLoading={isLoading}
        supportSearch={supportSearch}
        filterDto={filterModel}
        setFilterDto={setFilterModel}
        loadData={loadData}
        className={dropdownFilters != null || loadData != null || supportViewToggle ? "ml-2 d-none d-md-block" : null}
        metadata={metadata}
      />
    );
  };

  return (
    <div className="inline-filter-input">
      <div className="d-flex my-auto">
        <div className="d-flex my-auto">
          <NewRecordButton
            className={"ml-2 my-auto text-nowrap"}
            addRecordFunction={addRecordFunction}
            type={getType()}
            isLoading={isLoading}
            variant={"success"}
            disabled={disableNewRecordButton}
          />
          <ImportDataButton
            className={"ml-2"}
            importDataFunction={handleImportFunction}
            isLoading={isLoading}
          />
          <ExportDataButton
            className={"ml-2"}
            exportDataFunction={handleExportFunction}
            isLoading={isLoading}
          />
          <span className={"d-none d-xl-inline ml-2"}>{inlineFilters}</span>
          {getSearchBar()}
          <ViewToggle
            supportViewToggle={supportViewToggle}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            isLoading={isLoading}
            className={"ml-2"}
          />
          {showRefreshButton &&
            <RefreshButton
              isLoading={isLoading}
              loadDataFunction={loadData}
              className={"ml-2"}
            />
          }
          <FilterButtons
            isLoading={isLoading}
            loadData={loadData}
            dropdownFilters={dropdownFilters}
            inlineFilters={inlineFilters}
            filterDto={filterModel}
            className={"ml-2"}
            filterSelectionOverlayPanel={filterSelectionOverlayPanel}
          />
          {exportButton}
        </div>
      </div>
    </div>
  );
}


FilterBar.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  supportSearch: PropTypes.bool,
  supportViewToggle: PropTypes.bool,
  saveCookies: PropTypes.func,
  inlineFilters: PropTypes.any,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  dropdownFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  supportClientSideSearching: PropTypes.bool,
  type: PropTypes.string,
  metadata: PropTypes.object,
  exportButton: PropTypes.any,
  handleExportFunction: PropTypes.func,
  handleImportFunction: PropTypes.func,
  showRefreshButton: PropTypes.bool,
  disableNewRecordButton: PropTypes.bool,
  filterSelectionOverlayPanel: PropTypes.object,
};

FilterBar.defaultProps = {
  showRefreshButton: true,
  disableNewRecordButton: false,
};

export default FilterBar;


