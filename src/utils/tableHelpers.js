export function createFilterOptionList(data, columnField, textField, valueField, matchPartial) {
  let filterOptionList = [];

  filterOptionList.push({
    field: columnField,
    matchPartial: matchPartial,
    text: "No Filter",
    filterText: undefined
  });  

  data.map((row, index) => {
    filterOptionList.push({
      field: columnField,
      matchPartial: matchPartial,
      text: row[textField],
      filterText: row[valueField]
    });
  });
  return filterOptionList;
}