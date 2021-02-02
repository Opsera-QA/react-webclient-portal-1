import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import {getBreadcrumb} from "components/common/navigation/trails";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import TitleBar from "components/common/fields/TitleBar";
import TitleComponent from "components/common/panels/TitleComponent";

function ScreenContainer({ breadcrumbDestination, pageDescription, children, isLoading, accessDenied, showBreadcrumbTrail, navigationTabContainer }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));

  useEffect(() => {
    if (breadcrumb.name !== breadcrumbDestination) {
      setBreadcrumb(getBreadcrumb(breadcrumbDestination));
    }
  }, [breadcrumbDestination]);

  const getTopNavigation = () => {
    if (showBreadcrumbTrail) {
      return (<BreadcrumbTrail destination={breadcrumbDestination} />);
    }

    if (navigationTabContainer) {
      return (
        <div className="mb-2">
          {navigationTabContainer}
        </div>
      );
    }

    return (<TitleComponent title={breadcrumb.label} />);
  };

  const getPageDescription = () => {
    if (pageDescription == null) {
      return <></>;
    }

    return (
      <div className="page-description px-3 py-2">
        {pageDescription}
      </div>
    );
  };

  const getScreenBody = () => {
    if (isLoading) {
      return <div className="content-block-loading m-3"/>;
    }

    return (children);
  };

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer />
    )
  }

  return (
    <div className="max-content-width mb-2 ml-2 max-content-height">
      {getTopNavigation()}
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <TitleBar titleIcon={breadcrumb.icon} title={breadcrumb.label} isLoading={isLoading}/>
        </div>
        <div className="screen-container-body shaded-container">
          {getPageDescription()}
          <div className="p-2 mt-2">
            {getScreenBody()}
          </div>
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


ScreenContainer.propTypes = {
  breadcrumbDestination: PropTypes.string,
  pageDescription: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  accessDenied: PropTypes.bool,
  showBreadcrumbTrail: PropTypes.bool,
  navigationTabContainer: PropTypes.object
};

export default ScreenContainer;