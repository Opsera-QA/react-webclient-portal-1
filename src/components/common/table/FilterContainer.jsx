import React from "react";
import PropTypes from "prop-types";
import FilterTitleBar from "components/common/table/FilterTitleBar";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";
import FilterBar from "components/common/filters/FilterBar";

function FilterContainer(
  {
    filterDto,
    setFilterDto,
    titleIcon,
    title,
    dropdownFilters,
    inlineFilters,
    loadData,
    isLoading,
    body,
    addRecordFunction,
    supportSearch,
    supportViewToggle,
    saveCookies,
    className,
    metadata,
    exportButton,
    supportClientSideSearching,
    bodyClassName,
    handleExportFunction,
    handleImportFunction,
    minimumHeight,
    maximumHeight,
    showRefreshButton,
    disableNewRecordButton,

    // TODO: Remove after filters are used everywhere
    type
  }) {
  const getFilterBar = () => {
    return (
      <FilterBar
        filterModel={filterDto}
        setFilterModel={setFilterDto}
        loadData={loadData}
        isLoading={isLoading}
        addRecordFunction={addRecordFunction}
        type={type}
        metadata={metadata}
        saveCookies={saveCookies}
        supportSearch={supportSearch}
        supportViewToggle={supportViewToggle}
        dropdownFilters={dropdownFilters}
        inlineFilters={inlineFilters}
        exportButton={exportButton}
        supportClientSideSearching={supportClientSideSearching}
        handleExportFunction={handleExportFunction}
        handleImportFunction={handleImportFunction}
        showRefreshButton={showRefreshButton}
        disableNewRecordButton={disableNewRecordButton}
      />
    );
  };

  const getContainerStylingObject = () => {
    return ({
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: "hidden",
    });
  };

  const getBodyStylingObject = () => {
    return ({
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: "auto",
      overflowX: "hidden",
    });
  };

  return (
    <div className={className}>
      <div
        className={"filter-container container-border"}
      >
        <div className={"filter-title-bar w-100"}>
          <div className={"px-2 d-flex content-block-header"}>
            <FilterTitleBar
              isLoading={isLoading}
              title={title}
              type={type}
              filterDto={filterDto}
              titleIcon={titleIcon}
              inlineFilters={getFilterBar()}
              addRecordFunction={addRecordFunction}
            />
          </div>
          <ActiveFilterDisplayer
            filterModel={filterDto}
            loadData={loadData}
          />
        </div>
        <div
          className={bodyClassName}
          style={getBodyStylingObject()}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

FilterContainer.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  dropdownFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  supportSearch: PropTypes.bool,
  titleIcon: PropTypes.object,
  title:PropTypes.string,
  body: PropTypes.object,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  supportViewToggle: PropTypes.bool,
  inlineFilters: PropTypes.any,
  saveCookies: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  metadata: PropTypes.object,
  exportButton: PropTypes.object,
  supportClientSideSearching: PropTypes.bool,
  bodyClassName: PropTypes.bool,
  handleExportFunction: PropTypes.func,
  handleImportFunction: PropTypes.func,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  loadingMessage: PropTypes.string,
  showRefreshButton: PropTypes.bool,
  disableNewRecordButton: PropTypes.bool
};

FilterContainer.defaultProps = {
  showRefreshButton: true,
  disableNewRecordButton: false
};

export default FilterContainer;


