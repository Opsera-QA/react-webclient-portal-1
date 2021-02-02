import React, {useState} from "react";
import PropTypes from "prop-types";
import DataNotFoundContainer from "components/common/panels/detail_view_container/DataNotFoundContainer";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import TitleBar from "components/common/fields/TitleBar";
import {getBreadcrumb, getParentBreadcrumb} from "components/common/navigation/trails";

function DetailScreenContainer({ breadcrumbDestination, actionBar, dataObject, detailPanel, isLoading, accessDenied, metadata, showBreadcrumbTrail, navigationTabContainer }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));
  const [parentBreadcrumb, setParentBreadcrumb] = useState(getParentBreadcrumb(breadcrumbDestination));

  const getTopNavigation = () => {
    if (showBreadcrumbTrail) {
      return (<BreadcrumbTrail destination={breadcrumbDestination} />);
    }

    if (navigationTabContainer) {
      return (
        <div className="mb-3">
          {navigationTabContainer}
        </div>
      );
    }

    return (
      <div className="mb-3">
        <div className="sub-navigation-block" />
      </div>
    );
  };

  const getTitleBar = () => {
    const activeField = dataObject?.getActiveField();
    return (
      <TitleBar
        isLoading={isLoading}
        parentBreadcrumb={parentBreadcrumb}
        titleIcon={breadcrumb?.icon}
        title={dataObject?.getDetailViewTitle()}
        inactive={activeField ? dataObject?.getData(activeField) === false : false}
      />
    );
  };

  const getDetailBody = () => {
    if (isLoading) {
      return <div className="content-block-loading m-3" />;
    }

    return (detailPanel);
  };

  const getActionBar = () => {
    if (dataObject != null) {
      return <div className="mb-1">{actionBar}</div>;
    }

    return <div className="py-2" />;
  };

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer />
    )
  }

  if (!isLoading && dataObject == null) {
    return (
      <DataNotFoundContainer type={metadata?.type} breadcrumbDestination={breadcrumbDestination} />
    )
  }

  return (
    <div className="max-content-width mb-2 ml-2 max-content-height">
      {getTopNavigation()}
      <div className="content-container content-card-1">
        <div className="px-2 content-block-header title-text-header-1">
          {getTitleBar()}
        </div>
        <div className="detail-container-body">
          {getActionBar()}
          <div className="shaded-container">
            {getDetailBody()}
          </div>
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


DetailScreenContainer.propTypes = {
  showBreadcrumbTrail: PropTypes.bool,
  navigationTabContainer: PropTypes.object,
  breadcrumbDestination: PropTypes.string,
  detailPanel: PropTypes.object,
  dataObject: PropTypes.object,
  actionBar: PropTypes.object,
  isLoading: PropTypes.bool,
  accessDenied: PropTypes.bool,
  metadata: PropTypes.object
};

export default DetailScreenContainer;