import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";

function VanitySetTabAndViewContainer(
  {
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
  }) {
  return (
    <InfoContainer
      titleText={title}
      titleIcon={icon}
      className={className}
      isLoading={isLoading}
      loadDataFunction={loadDataFunction}
      titleRightSideButton={titleRightSideButton}
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
      <div className={"object-properties-footer"}/>
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
};

VanitySetTabAndViewContainer.defaultProps = {
  bodyClassName: "mx-0",
  minimumHeight: "calc(100vh - 264px)",
  maximumHeight: "calc(100vh - 264px)",
  overflowYBodyStyle: "auto",
  overflowYContainerStyle: "hidden",
};

export default VanitySetTabAndViewContainer;