export function createPageSortOptions(data, prependText, textField = "text", valueField = "option") {
  let filterOptions = [];

  if (data && data.length > 0) {
    data.map((record, index) => {
      filterOptions.push({key: index, text: `${prependText}: ${record[textField]}`, value: record[valueField], order: record['order']});
    });
  }

  return filterOptions;
}