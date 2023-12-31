export const screenContainerHeights = {};

screenContainerHeights.NAV_BAR_HEIGHT = "58px";
screenContainerHeights.MARGIN = `1rem`;
screenContainerHeights.OPSERA_FOOTER_HEIGHT = `21px`;
// screenContainerHeights.SCREEN_CONTAINER_HEIGHT = `calc(100vh - (${screenContainerHeights.MARGIN} * 2) - ${screenContainerHeights.NAV_BAR_HEIGHT} - ${screenContainerHeights.OPSERA_FOOTER_HEIGHT})`; // from free trial, leaving here for now
// screenContainerHeights.SCREEN_CONTAINER_HEIGHT = "calc(100vh - 160px)"; // Old size
screenContainerHeights.ACTION_BAR_HEIGHT = `38px`;
screenContainerHeights.DETAIL_PANEL_TAB_HEIGHT = `40px`;
screenContainerHeights.SCREEN_CONTAINER_HEIGHT = "calc(100vh - 164px)";
// screenContainerHeights.SCREEN_CONTAINER_HEIGHT = `calc(100vh - (${screenContainerHeights.MARGIN} * 2) - ${screenContainerHeights.NAV_BAR_HEIGHT} - ${screenContainerHeights.OPSERA_FOOTER_HEIGHT})`;
screenContainerHeights.CONTENT_BLOCK_FOOTER_HEIGHT = "1.5em";
screenContainerHeights.PAGE_DESCRIPTION_HEIGHT = "calc(2em + 1rem)";
screenContainerHeights.ROLE_REQUIREMENT_FIELD_HEIGHT = "2.2em";
screenContainerHeights.TITLE_BAR_HEIGHT = "48px";
screenContainerHeights.OVERLAY_PANEL_BODY_HEIGHT = "max(calc(100vh - 20px - 48px - 40px - 45px - 48px - 36px), 500px)";

screenContainerHeights.TABLE_MINIMUM_HEIGHT = `calc(${screenContainerHeights.SCREEN_CONTAINER_HEIGHT} - ${screenContainerHeights.TITLE_BAR_HEIGHT})`;
screenContainerHeights.TABLE_MINIMUM_HEIGHT_WITH_DESCRIPTION = `calc(${screenContainerHeights.TABLE_MINIMUM_HEIGHT} - ${screenContainerHeights.PAGE_DESCRIPTION_HEIGHT})`;
screenContainerHeights.DETAIL_PANEL_CONTENT_HEIGHT = `calc(${screenContainerHeights.SCREEN_CONTAINER_HEIGHT} - ${screenContainerHeights.TITLE_BAR_HEIGHT} - ${screenContainerHeights.ACTION_BAR_HEIGHT} - ${screenContainerHeights.DETAIL_PANEL_TAB_HEIGHT})`;
screenContainerHeights.DETAIL_PANEL_CONTENT_INFO_CONTAINER_HEIGHT = `calc(${screenContainerHeights.DETAIL_PANEL_CONTENT_HEIGHT} - ${screenContainerHeights.TITLE_BAR_HEIGHT} - ${screenContainerHeights.CONTENT_BLOCK_FOOTER_HEIGHT} - ${screenContainerHeights.ROLE_REQUIREMENT_FIELD_HEIGHT})`;