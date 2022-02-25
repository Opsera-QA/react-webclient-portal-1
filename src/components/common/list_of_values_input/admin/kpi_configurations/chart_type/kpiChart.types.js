export const KPI_CHART_TYPES = {
  BAR_CHART: "bar-chart",
  LINE_CHART: "line-chart",
  PIE_CHART: "pie-chart",
  CALENDAR: "calendar",
  TABLE: "table",
  NUMBER: "number",
};

export const KPI_CHART_TYPE_LABELS = {
  BAR_CHART: "Bar Chart",
  LINE_CHART: "Line Chart",
  PIE_CHART: "Pie Chart",
  CALENDAR: "Calendar",
  TABLE: "Table",
  NUMBER: "Number",
};

export const getKpiChartTypeLabel = (kpiCategoryType) => {
  switch (kpiCategoryType) {
    case KPI_CHART_TYPES.BAR_CHART:
      return KPI_CHART_TYPE_LABELS.BAR_CHART;
    case KPI_CHART_TYPES.LINE_CHART:
      return KPI_CHART_TYPE_LABELS.LINE_CHART;
    case KPI_CHART_TYPES.PIE_CHART:
      return KPI_CHART_TYPE_LABELS.PIE_CHART;
    case KPI_CHART_TYPES.CALENDAR:
      return KPI_CHART_TYPE_LABELS.CALENDAR;
    case KPI_CHART_TYPES.TABLE:
      return KPI_CHART_TYPE_LABELS.TABLE;
    case KPI_CHART_TYPES.NUMBER:
      return KPI_CHART_TYPE_LABELS.NUMBER;
    default:
      return kpiCategoryType;
  }
};

export const KPI_CHART_TYPE_SELECT_OPTIONS = [
  {
    value: KPI_CHART_TYPES.BAR_CHART,
    text: KPI_CHART_TYPE_LABELS.BAR_CHART,
  },
  {
    value: KPI_CHART_TYPES.LINE_CHART,
    text: KPI_CHART_TYPE_LABELS.LINE_CHART,
  },
  {
    value: KPI_CHART_TYPES.PIE_CHART,
    text: KPI_CHART_TYPE_LABELS.PIE_CHART,
  },
  {
    value: KPI_CHART_TYPES.CALENDAR,
    text: KPI_CHART_TYPE_LABELS.CALENDAR,
  },
  {
    value: KPI_CHART_TYPES.TABLE,
    text: KPI_CHART_TYPE_LABELS.TABLE,
  },
  {
    value: KPI_CHART_TYPES.NUMBER,
    text: KPI_CHART_TYPE_LABELS.NUMBER,
  },
];