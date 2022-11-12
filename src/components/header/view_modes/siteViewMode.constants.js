export const SITE_VIEW_MODES = {
  BUSINESS: "business",
  ENGINEERING: "engineering",
};

export const SITE_VIEW_MODE_LABELS = {
  BUSINESS: "Business",
  ENGINEERING: "Engineering",
};

export const getSiteViewModeLabel = (siteViewMode) => {
  switch (siteViewMode) {
    case SITE_VIEW_MODES.BUSINESS:
      return SITE_VIEW_MODE_LABELS.BUSINESS;
    case SITE_VIEW_MODES.ENGINEERING:
      return SITE_VIEW_MODE_LABELS.ENGINEERING;
    default:
      return siteViewMode;
  }
};

export const SITE_VIEW_MODE_SELECT_OPTIONS = [
  {
    text: SITE_VIEW_MODE_LABELS.BUSINESS,
    value: SITE_VIEW_MODES.BUSINESS,
  },
  {
    text: SITE_VIEW_MODE_LABELS.ENGINEERING,
    value: SITE_VIEW_MODES.ENGINEERING,
  },
];