import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import {getBreadcrumb} from "components/common/navigation/trails";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import TitleBar from "components/common/fields/TitleBar";
import RoleRequirementField from "components/common/fields/access/RoleRequirementField";
import {meetsRequirements} from "components/common/helpers/role-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";

function ScreenContainer({ breadcrumbDestination, pageDescription, children, isLoading, accessDenied, showBreadcrumbTrail, navigationTabContainer, accessRoleData, roleRequirement, hasTabContainer, titleActionBar }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();
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

  const getBody = () => {
    if (hasTabContainer === true) {
      return (
        <div className="detail-container-body">
          {toastContext.getInlineBanner()}
          {getPageDescription()}
          <div className="shaded-container">
            <div className="mt-2">
              {getScreenBody()}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="screen-container-body shaded-container">
        {toastContext.getInlineBanner()}
        {getPageDescription()}
        <div className="mt-2">
          {getScreenBody()}
        </div>
      </div>
    );
  };

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer />
    )
  }

  if (!isLoading && accessRoleData && roleRequirement && !meetsRequirements(roleRequirement, accessRoleData)) {
    return (
      <AccessDeniedContainer />
    )
  }

  return (
    <div className="max-content-width ml-2 max-content-height scroll-y">
      {getTopNavigation()}
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <TitleBar titleIcon={breadcrumb.icon} title={breadcrumb.label} isLoading={isLoading} titleActionBar={titleActionBar}/>
        </div>
        {getBody()}
        <div className="content-block-footer-text-container pt-2">
          <RoleRequirementField className={"mx-2"} roleRequirement={roleRequirement} />
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
  navigationTabContainer: PropTypes.object,
  titleActionBar: PropTypes.object,
  accessRoleData: PropTypes.object,
  roleRequirement: PropTypes.string,
  hasTabContainer: PropTypes.bool
};

export default ScreenContainer;