import React, {useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import {getBreadcrumb} from "components/common/navigation/trails";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import TitleBar from "components/common/fields/TitleBar";

function ScreenContainer({ breadcrumbDestination, pageDescription, children, isLoading, accessDenied }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));

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
      {/*<div className="h4 mt-3 mb-4">Passed In Optional Title</div> TODO: Noah please wire this up for Tool Registry to just say "Registry" and disable breadcrumb for now in Tool Registry only*/}
      <BreadcrumbTrail destination={breadcrumbDestination} />
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
  accessDenied: PropTypes.bool
};

export default ScreenContainer;