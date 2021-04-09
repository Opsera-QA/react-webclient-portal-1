import React, {useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import {getBreadcrumb} from "components/common/navigation/trails";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import TitleBar from "components/common/fields/TitleBar";

function WideScreenContainer({ breadcrumbDestination, pageDescription, children, isLoading, accessDenied }) {
  const [breadcrumb] = useState(getBreadcrumb(breadcrumbDestination));

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

  if (accessDenied) {
    return (
      <AccessDeniedContainer />
    );
  }

  return (
    <div className="mb-2 ml-2 max-content-height">
      <BreadcrumbTrail destination={breadcrumbDestination} />
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <TitleBar titleIcon={breadcrumb.icon} title={breadcrumb.title} isLoading={isLoading}/>
        </div>
        {getPageDescription()}
        <div className="p-2 mt-2 shaded-container wide-screen-container-body">
          {getScreenBody()}
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


WideScreenContainer.propTypes = {
  breadcrumbDestination: PropTypes.string,
  pageDescription: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.any,
  accessDenied: PropTypes.bool
};

export default WideScreenContainer;