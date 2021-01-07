import React, {useState} from "react";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import PropTypes from "prop-types";
import DetailScreenTitleBar from "../detail_view_container/DetailScreenTitleBar";
import {getBreadcrumb} from "../../navigation/trails";

function ScreenContainer({ breadcrumbDestination, pageDescription, children, isLoading }) {
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

    return (
      <div className="mt-2">
        {children}
      </div>
    );
  };

  return (
    <div className="max-content-width mb-2 ml-2">
      <BreadcrumbTrail destination={breadcrumbDestination} />
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <DetailScreenTitleBar titleIcon={breadcrumb.icon} title={breadcrumb.label} isLoading={isLoading} />
        </div>
        {getPageDescription()}
        <div className="p-2 shaded-container detail-view-body">
          {getScreenBody()}
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
  children: PropTypes.any
};

export default ScreenContainer;