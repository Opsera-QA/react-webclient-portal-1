import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabAndViewContainer";

export const DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT = "calc(100vh - 264px)";

function VanitySetTabAndViewContainer({
  verticalTabContainer,
  currentView,
  className,
  tabColumnSize,
  icon,
  title,
  defaultActiveKey,
  bodyClassName,
  minimumHeight,
  maximumHeight,
  isLoading,
  titleRightSideButton,
  loadDataFunction,
  overflowYBodyStyle,
  overflowXBodyStyle,
  overflowYContainerStyle,
  titleClassName,
  titleBar,
}) {
  if (!titleBar) {
    return (
      <TabAndViewContainer
        verticalTabContainer={verticalTabContainer}
        currentView={currentView}
        tabColumnSize={tabColumnSize}
        defaultActiveKey={defaultActiveKey}
        bodyClassName={bodyClassName}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
        overflowXBodyStyle={overflowXBodyStyle}
        overflowYContainerStyle={overflowYContainerStyle}
        overflowYBodyStyle={overflowYBodyStyle}
      />
    );
  }
  return (
    <InfoContainer
      titleText={title}
      titleIcon={icon}
      className={className}
      isLoading={isLoading}
      loadDataFunction={loadDataFunction}
      titleRightSideButton={titleRightSideButton}
      titleClassName={titleClassName}
    >
      <TabAndViewContainer
        verticalTabContainer={verticalTabContainer}
        currentView={currentView}
        tabColumnSize={tabColumnSize}
        defaultActiveKey={defaultActiveKey}
        bodyClassName={bodyClassName}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
        overflowXBodyStyle={overflowXBodyStyle}
        overflowYContainerStyle={overflowYContainerStyle}
        overflowYBodyStyle={overflowYBodyStyle}
      />
    </InfoContainer>
  );
}

VanitySetTabAndViewContainer.propTypes = {
  verticalTabContainer: PropTypes.object,
  currentView: PropTypes.object,
  className: PropTypes.string,
  tabColumnSize: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.object,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bodyClassName: PropTypes.string,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  isLoading: PropTypes.bool,
  titleRightSideButton: PropTypes.object,
  loadDataFunction: PropTypes.func,
  overflowYBodyStyle: PropTypes.string,
  overflowXBodyStyle: PropTypes.string,
  overflowYContainerStyle: PropTypes.string,
  titleClassName: PropTypes.string,
  titleBar: PropTypes.bool,
};

VanitySetTabAndViewContainer.defaultProps = {
  bodyClassName: "mx-0",
  minimumHeight: DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT,
  maximumHeight: DEFAULT_TAB_AND_VIEW_CONTAINER_HEIGHT,
  overflowYBodyStyle: "auto",
  overflowYContainerStyle: "hidden",
  titleBar: true,
};

export default VanitySetTabAndViewContainer;