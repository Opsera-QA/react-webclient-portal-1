import React from "react";
import PropTypes from "prop-types";
import InlineSearchFilter from "components/common/filters/search/InlineSearchFilter";
import ViewToggle from "components/common/view/ViewToggle";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import RefreshButton from "components/common/buttons/data/RefreshButton";
import FilterButtons from "components/common/filters/buttons/FilterButtons";
import InlineClientSideSearchFilter from "components/common/filters/search/InlineClientSideSearchFilter";

function FilterBar(
  { 
    filterModel, 
    setFilterModel, 
    loadData,
    isLoading, 
    saveCookies, 
    addRecordFunction,
    inlineFilters,
    supportSearch, 
    supportViewToggle,
    dropdownFilters,
    supportClientSideSearching,
    exportButton,
    type,
    metadata,
  }) {
  return (
    <div className="my-1 inline-filter-input">
      <div className="d-flex my-auto">
        <div className="d-flex my-auto">
          <NewRecordButton
            className={"mr-2 my-auto text-nowrap"}
            addRecordFunction={addRecordFunction}
            type={type || filterModel?.getType()}
            isLoading={isLoading}
            variant={"success"}
          />
          <span className="d-none d-xl-inline">{inlineFilters}</span>
          <InlineSearchFilter
            isLoading={isLoading}
            supportSearch={supportSearch}
            filterDto={filterModel}
            setFilterDto={setFilterModel}
            loadData={loadData}
            className={dropdownFilters != null || loadData != null || supportViewToggle ? "mr-3 d-none d-md-block" : null}
            metadata={metadata}
          />
          <InlineClientSideSearchFilter
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            isLoading={isLoading}
            supportClientSideSearching={supportClientSideSearching}
            className={dropdownFilters != null || loadData != null || supportViewToggle ? "mr-3 d-none d-md-block" : null}
          />
          <ViewToggle
            supportViewToggle={supportViewToggle}
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            saveCookies={saveCookies}
            isLoading={isLoading}
            className={dropdownFilters != null || loadData != null ? "mr-2" : null}
          />
          <RefreshButton
            isLoading={isLoading}
            loadData={loadData}
            className={dropdownFilters != null ? "mr-2" : null}
          />
          <FilterButtons
            isLoading={isLoading}
            loadData={loadData}
            dropdownFilters={dropdownFilters}
            filterDto={filterModel}
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
};

export default FilterBar;


