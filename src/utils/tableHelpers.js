import {hasStringValue} from "components/common/helpers/string-helpers";

export function createFilterOptionList(data, columnField, textField, valueField, matchPartial) {
  let filterOptionList = [];


  data.map((row, index) => {
    const filterOption = {
      field: columnField,
      matchPartial: matchPartial,
      text: row[textField],
      filterText: row[valueField]
    };
    
    if (!jsonContains(filterOptionList, "filterText", row[valueField])) {
      filterOptionList.push(filterOption);
    }
  });

  filterOptionList.unshift({
    field: columnField,
    matchPartial: matchPartial,
    text: "No Filter",
    filterText: undefined
  });  
  return filterOptionList;
}

export function jsonContains(json, columnField, value) {
  let contains = false;
  Object.keys(json).some(key => {
    contains = json[key][columnField] === value;
    return contains;
  });
  return contains;
}

export const localFilterFunction = (searchFilter, originalArray, filterModel, setFilterModel, prevSearchTerm, setPrevSearchTerm) => {
  const searchTerm = filterModel?.getFilterValue("search");
  const pageSize = filterModel?.getFilterValue("pageSize");
  let currentPage = filterModel?.getFilterValue("currentPage");
  const filteredArray = hasStringValue(searchTerm) ? originalArray.filter(searchFilter) : originalArray;

  if (searchTerm !== prevSearchTerm) {
    setPrevSearchTerm(searchTerm);
    currentPage = 1;
  }

  let newFilterModel = {...filterModel};
  newFilterModel.setData("totalCount", filteredArray.length);
  newFilterModel.setData("currentPage", currentPage);
  newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
  setFilterModel({ ...newFilterModel });
  return filteredArray.slice((currentPage-1)*pageSize, currentPage*pageSize);
};
