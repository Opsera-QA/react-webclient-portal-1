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
  const unpackedFilterData = {};

  if (!Array.isArray(metricFilters) || metricFilters.length === 0) {
    return unpackedFilterData;
  }

  metricFilters.forEach((filter) => {
    const type = filter?.type;
    const value = filter?.value;

    if (type != null) {
      unpackedFilterData[type] = value;
    }
  });

  return unpackedFilterData;
};

metricHelpers.packFilterData = (filterObject) => {
  if (typeof filterObject !== "object") {
    return [];
  }

  const filterTypes = Object.keys(filterObject);

  const packedFilterData = [];

  filterTypes.forEach((filterType) => {
    const value = filterObject[filterType];

    if (hasStringValue(filterType) === true) {
      packedFilterData.push({
        type: filterType,
        value: value,
      });
    }
  });

  return packedFilterData;
};

metricHelpers.setDashboardDateToKPIs = (dashboardModel, dashboardDate) => {
  const newModel = {...dashboardModel};
  let kpiConfigurations = newModel?.getData("configuration");
  kpiConfigurations.map(kpiConfig => {
    const kpiDateFilterIndex = kpiConfig?.filters?.findIndex(item => item.type === "date");
    if(kpiDateFilterIndex > -1){
      kpiConfig.filters[kpiDateFilterIndex].value = dashboardDate;
    }
  });

  newModel.setData('configuration',kpiConfigurations);
  return newModel;
};