import React from "react";
import PropTypes from "prop-types";
import FilterTitleBar from "components/common/table/FilterTitleBar";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";
import FilterBar from "components/common/filters/FilterBar";

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
    className,
    metadata,
    exportButton,
    minimumHeight,
    maximumHeight,
    type,
  }) {

  const getFilterBar = () => {
    return (
      <FilterBar
        filterModel={paginationModel}
        setFilterModel={setPaginationModel}
        loadData={loadData}
        isLoading={isLoading}
        addRecordFunction={addRecordFunction}
        type={type}
        metadata={metadata}
        supportViewToggle={supportViewToggle}
        dropdownFilters={dropdownFilters}
        inlineFilters={inlineFilters}
        exportButton={exportButton}
      />
    );
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
      <div className="filter-container container-border">
        <div className="filter-title-bar w-100">
          <div className="d-flex filter-container-content-block-header">
            <FilterTitleBar
              isLoading={isLoading}
              title={title}
              type={type}
              filterDto={paginationModel}
              titleIcon={titleIcon}
              inlineFilters={getFilterBar()}
              addRecordFunction={addRecordFunction}
            />
          </div>
          <ActiveFilterDisplayer filterModel={paginationModel} loadData={loadData} />
        </div>
        <div style={getBodyStylingObject()}>
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
  type: PropTypes.string,
  className: PropTypes.string,
  stackFilters: PropTypes.bool,
  metadata: PropTypes.object,
  exportButton: PropTypes.object,
  showBorder: PropTypes.bool,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
};

export default VanityDataContainer;


