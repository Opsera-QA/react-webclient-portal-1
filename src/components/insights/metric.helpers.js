import {hasStringValue} from "components/common/helpers/string-helpers";

export const metricHelpers = {};

metricHelpers.unpackSupportedFilterTypes = (supportedFilters) => {
  if (!Array.isArray(supportedFilters) || supportedFilters.length === 0) {
    return [];
  }

  const unpackedFilterTypes = [];

  supportedFilters.forEach((filter) => {
    const filterType = filter?.type;

    if (hasStringValue(filterType) && unpackedFilterTypes.includes(filterType) === false) {
      unpackedFilterTypes.push(filterType);
    }
  });

  return unpackedFilterTypes;
};

metricHelpers.unpackMetricFilterData = (metricFilters) => {
  if (!Array.isArray(metricFilters) || metricFilters.length === 0) {
    return undefined;
  }

  const unpackedFilterData = {};

  metricFilters.forEach((filter) => {
    const type = filter?.type;
    const value = filter?.value;

    if (type != null) {
      unpackedFilterData[type] = value;
    }
  });

  return unpackedFilterData;
};