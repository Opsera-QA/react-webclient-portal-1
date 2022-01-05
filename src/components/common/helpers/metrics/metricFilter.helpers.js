// TODO: Eventually, we should just store the values inside the KPI and not as complex objects
//  if we don't do this, then make a metric model that handles setting and getting filter values in a better way
export const getMetricFilterValue = (filters, type) => {
  if (!Array.isArray(filters)) {
    return null;
  }

  const index = filters.findIndex((filter) => filter.type === type);

  if (index !== -1) {
    return filters[index]?.value;
  }

  return null;
};