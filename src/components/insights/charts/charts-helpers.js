import {addDays} from "date-fns";
import {faChartBar} from "@fortawesome/pro-light-svg-icons";

export function getDateObjectFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")]?.value) {
    return ({
      "start": kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.startDate,
      "end": addDays(new Date(kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.endDate), 1).toISOString()
    })
  }
  return ({
    "start": addDays(new Date(), -90).toISOString(),
    "end": new Date().toISOString()
  });
}

export function getTagsFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")]?.value && 
      kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")]?.value.length > 0) {
    return kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")].value;
  }
  return null;
}

export function getChartIconFromKpiConfiguration(kpiConfiguration) {
  return faChartBar;
}