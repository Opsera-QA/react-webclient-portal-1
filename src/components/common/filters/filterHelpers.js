// TODO: Add groupBy option
export function createFilterOptions(data, prependText, textField, valueField) {
  let filterOptions = [];

  if (data && data.length > 0) {
    data.map((record, index) => {
      filterOptions.push({text: `${prependText}: ${record[textField]}`, value: record[valueField]});
    });
  }

  return filterOptions;
}