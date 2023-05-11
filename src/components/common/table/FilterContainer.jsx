import React from "react";
import PropTypes from "prop-types";
import FilterTitleBar from "components/common/table/FilterTitleBar";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";
import FilterBar from "components/common/filters/FilterBar";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import ErrorMessageFieldBase from "components/common/fields/text/message/ErrorMessageFieldBase";
import ErrorLoadingDataField from "components/common/fields/text/message/ErrorLoadingDataField";
import sessionHelper from "utils/session.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

const TITLE_BAR_HEIGHT = "46px";
const screenContainerMargin = "30px";
export const FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER = `calc(${screenContainerHeights.TABLE_MINIMUM_HEIGHT} - ${screenContainerMargin} - ${TITLE_BAR_HEIGHT})`;
export const FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION = `calc(${FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER} - ${screenContainerHeights.PAGE_DESCRIPTION_HEIGHT})`;

function FilterContainer({
  filterDto,
  setFilterDto,
  titleIcon,
  title,
  dropdownFilters,
  inlineFilters,
  loadData,
  isLoading,
  isPolling,
  body,
  addRecordFunction,
  supportSearch,
  supportViewToggle,
  className,
  metadata,
  exportButton,
  supportClientSideSearching,
  bodyClassName,
  handleExportFunction,
  handleImportFunction,
  minimumHeight,
  maximumHeight,
  showRefreshButton,
  disableNewRecordButton,
  filterSelectionOverlayPanel,
  hideActiveFilterDisplayer,
  bodyStyling,
  hideXOverflow,
  addRecordButtonCustomText,
  error,
  // TODO: Remove after filters are used everywhere
  type,
  anchor,
}) {
  const isAnchored = hasStringValue(anchor) === true && sessionHelper.getUrlAnchor() === anchor;
  const anchorClassName = isAnchored === true ? "anchored-content" : "";

  const getFilterBar = () => {
    return (
      <FilterBar
        filterModel={filterDto}
        setFilterModel={setFilterDto}
        loadData={loadData}
        isLoading={isLoading}
        addRecordFunction={addRecordFunction}
        type={type}
        metadata={metadata}
        supportSearch={supportSearch}
        supportViewToggle={supportViewToggle}
        dropdownFilters={dropdownFilters}
        inlineFilters={inlineFilters}
        exportButton={exportButton}
        supportClientSideSearching={supportClientSideSearching}
        handleExportFunction={handleExportFunction}
        handleImportFunction={handleImportFunction}
        showRefreshButton={showRefreshButton}
        disableNewRecordButton={disableNewRecordButton}
        filterSelectionOverlayPanel={filterSelectionOverlayPanel}
        addRecordButtonCustomText={addRecordButtonCustomText}
      />
    );
  };

  const {
    isFreeTrial,
  } = useComponentStateReference();

  const getContainerStylingObject = () => {
    return ({
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: "hidden",
    });
  };

  const getBodyStylingObject = () => {
    if (bodyStyling) {
      return bodyStyling;
    }

    return ({
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: "auto",
      overflowX: hideXOverflow !== false ? "hidden" : undefined,
    });
  };

  const getActiveFilterDisplayer = () => {
    if (hideActiveFilterDisplayer !== true) {
      return (
        <ActiveFilterDisplayer
          filterModel={filterDto}
          loadData={loadData}
        />
      );
    }
  };

  const getBody = () => {
    if (error) {
      return (
        <CenteredContentWrapper
          minHeight={minimumHeight}
        >
          <ErrorLoadingDataField
            error={error}
            pluralTopic={title}
          />
        </CenteredContentWrapper>
      );
    }

    return body;
  };

  return (
    <div className={className}>
      <div
        id={anchor}
        className={`filter-container container-border ${anchorClassName}`}
      >
        <div className={isFreeTrial === true ? "w-100" : "w-100 filter-title-bar"}>
          <div className={
            isFreeTrial === true
              ? "d-flex filter-container-content-block-header"
              : "px-2 py-1 d-flex content-block-header"
          }>
            <FilterTitleBar
              title={title}
              inlineFilters={getFilterBar()}
              titleIcon={titleIcon}
              isLoading={isLoading}
              isPolling={isPolling}
            />
          </div>
          {getActiveFilterDisplayer()}
        </div>
        <div
          className={bodyClassName}
          style={getBodyStylingObject()}
        >
          {getBody()}
        </div>
      </div>
    </div>
  );
}

FilterContainer.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  dropdownFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  supportSearch: PropTypes.bool,
  titleIcon: PropTypes.object,
  title: PropTypes.string,
  body: PropTypes.object,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  supportViewToggle: PropTypes.bool,
  inlineFilters: PropTypes.any,
  type: PropTypes.string,
  className: PropTypes.string,
  metadata: PropTypes.object,
  exportButton: PropTypes.object,
  supportClientSideSearching: PropTypes.bool,
  bodyClassName: PropTypes.bool,
  handleExportFunction: PropTypes.func,
  handleImportFunction: PropTypes.func,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  loadingMessage: PropTypes.string,
  showRefreshButton: PropTypes.bool,
  disableNewRecordButton: PropTypes.bool,
  bodyStyling: PropTypes.object,
  hideXOverflow: PropTypes.bool,
  filterSelectionOverlayPanel: PropTypes.any,
  isPolling: PropTypes.bool,
  hideActiveFilterDisplayer: PropTypes.bool,
  addRecordButtonCustomText: PropTypes.string,
  error: PropTypes.any,
  anchor: PropTypes.string,
};

FilterContainer.defaultProps = {
  showRefreshButton: true,
  disableNewRecordButton: false,
};

export default FilterContainer;


