import React from "react";
import PropTypes from "prop-types";
import InlineSearchFilter from "components/common/filters/search/InlineSearchFilter";
import FilterButtons from "components/common/filters/buttons/FilterButtons";
import ViewToggle from "components/common/view/ViewToggle";
import RefreshButton from "components/common/buttons/data/RefreshButton";
import FilterTitleBar from "components/common/table/FilterTitleBar";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";

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

    // TODO: Remove after filters are used everywhere
    type
  }) {
  const getInlineFilters = () => {
    return (
      <div className="my-1 inline-filter-input">
        <div className="d-flex my-auto">
          <NewRecordButton
            className={"mr-2 my-auto text-nowrap"}
            addRecordFunction={addRecordFunction}
            type={filterDto?.getType() || type}
            isLoading={isLoading}
            variant={"success"}
          />
          <span className="d-none d-lg-inline">{inlineFilters}</span>
          <InlineSearchFilter
            isLoading={isLoading}
            supportSearch={supportSearch}
            filterDto={filterDto}
            setFilterDto={setFilterDto}
            loadData={loadData}
            className={dropdownFilters != null || loadData != null || supportViewToggle ? "mr-3 d-none d-md-block" : null}
            metadata={metadata}
          />
          <ViewToggle
            supportViewToggle={supportViewToggle}
            filterDto={filterDto}
            setFilterDto={setFilterDto}
            saveCookies={saveCookies}
            isLoading={isLoading}
            className={dropdownFilters != null || loadData != null ? "mr-2" : null}
          />
          <RefreshButton isLoading={isLoading} loadData={loadData} className={dropdownFilters != null ? "mr-2" : null} />
          <FilterButtons isLoading={isLoading} loadData={loadData} dropdownFilters={dropdownFilters} filterDto={filterDto} />
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
              filterDto={filterDto}
              titleIcon={titleIcon}
              inlineFilters={getInlineFilters()}
              addRecordFunction={addRecordFunction}
            />
          </div>
          <ActiveFilterDisplayer filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} />
        </div>
        <div>
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
  exportButton: PropTypes.object
};

export default FilterContainer;


