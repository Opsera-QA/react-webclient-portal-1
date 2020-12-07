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
      <div className="page-description pl-3 pt-1">
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
        <div className="pt-2 pl-2 content-block-header">
          <h5><DetailScreenTitleBar titleIcon={breadcrumb.icon} title={breadcrumb.label} isLoading={isLoading} /></h5>
        </div>
        {getPageDescription()}
        <div className="p-3 shaded-container detail-view-body">
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