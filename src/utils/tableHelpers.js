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