import React from "react";
import PropTypes from "prop-types";
import FilterButtons from "components/common/filters/buttons/FilterButtons";
import ViewToggle from "components/common/view/ViewToggle";
import RefreshButton from "components/common/buttons/data/RefreshButton";
import FilterTitleBar from "components/common/table/FilterTitleBar";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import SearchFilter from "components/common/filters/search/SearchFilter";

// TODO: Refine further
function VanityDataContainer(
  {
    paginationModel,
    setPaginationModel,
    titleIcon,
    title,
    dropdownFilters,
    inlineFilters,
    loadData,
    isLoading,
    body,
    addRecordFunction,
    supportViewToggle,
    saveCookies,
    className,
    metadata,
    exportButton,
    type
  }) {

  const getInlineFilters = () => {
    return (
      <div className="my-1 inline-filter-input">
        <div className="d-flex my-auto">
          <NewRecordButton
            className={"mr-2 my-auto text-nowrap"}
            addRecordFunction={addRecordFunction}
            type={type || metadata?.type}
            isLoading={isLoading}
            variant={"success"}
          />
          <span className="d-none d-xl-inline">{inlineFilters}</span>
          <SearchFilter
            isLoading={isLoading}
            paginationModel={paginationModel}
            loadData={loadData}
            className={dropdownFilters != null || loadData != null || supportViewToggle ? "mr-3 d-none d-md-block" : null}
            metadata={metadata}
          />
          <ViewToggle
            supportViewToggle={supportViewToggle}
            filterDto={paginationModel}
            setFilterDto={setPaginationModel}
            saveCookies={saveCookies}
            isLoading={isLoading}
            className={dropdownFilters != null || loadData != null ? "mr-2" : null}
          />
          <RefreshButton isLoading={isLoading} loadData={loadData} className={dropdownFilters != null ? "mr-2" : null} />
          <FilterButtons isLoading={isLoading} loadData={loadData} dropdownFilters={dropdownFilters} filterDto={paginationModel} />
          {exportButton}
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="filter-container">
        <div className="filter-title-bar w-100">
          <div className="px-2 d-flex content-block-header">
            <FilterTitleBar
              isLoading={isLoading}
              title={title}
              type={type}
              filterDto={paginationModel}
              titleIcon={titleIcon}
              inlineFilters={getInlineFilters()}
              addRecordFunction={addRecordFunction}
            />
          </div>
          <ActiveFilterDisplayer filterDto={paginationModel} loadData={loadData} />
        </div>
        <div>
          {body}
        </div>
      </div>
    </div>
  );
}

VanityDataContainer.propTypes = {
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  dropdownFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  supportSearch: PropTypes.bool,
  titleIcon: PropTypes.object,
  title:PropTypes.string,
  children: PropTypes.any,
  body: PropTypes.object,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  supportViewToggle: PropTypes.bool,
  inlineFilters: PropTypes.any,
  saveCookies: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  stackFilters: PropTypes.bool,
  metadata: PropTypes.object,
  exportButton: PropTypes.object,
  showBorder: PropTypes.bool
};

export default VanityDataContainer;


