import {addDays} from "date-fns";
import {faChartBar} from "@fortawesome/pro-light-svg-icons";

export function getDateObjectFromKpiConfiguration(kpiConfiguration) {
  if (kpiConfiguration?.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")]?.value) {
    return ({
      "start": kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.startDate,
      "end": addDays(kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")].value.endDate, 1)
    })
  }
  return ({
    "start": "now-90d",
    "end": "now"
  });
}

export function getChartIconFromKpiConfiguration(kpiConfiguration) {
  return faChartBar;
}