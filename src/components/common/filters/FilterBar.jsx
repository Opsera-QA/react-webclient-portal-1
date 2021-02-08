import React from "react";
import PropTypes from "prop-types";
import ActiveFilterDisplayer from "./ActiveFilterDisplayer";
import InlineSearchFilter from "components/common/filters/search/InlineSearchFilter";
import ViewToggle from "components/common/view/ViewToggle";
import NewRecordButton from "components/common/buttons/data/NewRecordButton";
import RefreshButton from "components/common/buttons/data/RefreshButton";
import FilterButtons from "components/common/filters/buttons/FilterButtons";

function FilterBar({ filterDto, setFilterDto, filters, children, loadData, isLoading, saveCookies, addRecordFunction, customButtons, supportSearch, supportViewToggle}) {
  const getCustomButtons = () => {
    if (children === undefined) {
      return null;
    }

    return (<div className="mr-2">{customButtons}</div>);
  };

  return (
    <>
      <div className="filter-bar p-2">
        <div className="justify-content-between d-flex">
          <div>
            <NewRecordButton addRecordFunction={addRecordFunction} type={filterDto?.getType()} isLoading={isLoading} variant="warning" />
          </div>
          <div className="d-flex">
            {getCustomButtons()}
            <InlineSearchFilter supportSearch={supportSearch} filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} />
            <ViewToggle supportViewToggle={supportViewToggle} filterDto={filterDto} setFilterDto={setFilterDto} saveCookies={saveCookies} className="mx-2" />
            <RefreshButton isLoading={isLoading} loadData={loadData} className="mx-2" />
            <FilterButtons isLoading={isLoading} loadData={loadData} dropdownFilters={children} filterDto={filterDto} />
          </div>
        </div>
      </div>
      <ActiveFilterDisplayer filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} filters={filters} />
    </>
  );
}


FilterBar.propTypes = {
  filterDto: PropTypes.object,
  activeFilterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  supportSearch: PropTypes.bool,
  supportViewToggle: PropTypes.bool,
  saveCookies: PropTypes.func,
  customButtons: PropTypes.any,
  children: PropTypes.any,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  filters: PropTypes.array,
  isLoading: PropTypes.bool
};

export default FilterBar;


