// TODO: Add groupBy option
export function createFilterOptions(data, textField, valueField) {
  let filterOptions = [];

  if (data && data.length > 0) {
    data.map((record, index) => {
      filterOptions.push({text: record[textField], value: record[valueField]});
    });
  }

  return filterOptions;
}