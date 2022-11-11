import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import {getBreadcrumb} from "components/common/navigation/trails";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import TitleBar from "components/common/fields/TitleBar";
import RoleRequirementField from "components/common/fields/access/RoleRequirementField";
import {meetsRequirements} from "components/common/helpers/role-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainerBodyLoadingDialog
  from "components/common/status_notifications/loading/ScreenContainerBodyLoadingDialog";
import {hasStringValue} from "components/common/helpers/string-helpers";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import useComponentStateReference from "hooks/useComponentStateReference";

function ScreenContainer(
  {
    breadcrumbDestination,
    pageDescription,
    children,
    isLoading,
    accessDenied,
    showBreadcrumbTrail,
    navigationTabContainer,
    accessRoleData,
    roleRequirement,
    titleActionBar,
    helpComponent,
    bodyClassName,
    className,
  }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));
  const toastContext = useContext(DialogToastContext);
  const {
    isOpseraAdministrator,
    isFreeTrial
  } = useComponentStateReference();

  useEffect(() => {
    toastContext.removeInlineMessage();
    if (breadcrumb?.name !== breadcrumbDestination) {
      setBreadcrumb(getBreadcrumb(breadcrumbDestination));
    }
  }, [breadcrumbDestination]);

  const getTopNavigation = () => {
    if (showBreadcrumbTrail) {
      return (<BreadcrumbTrail destination={breadcrumbDestination} />);
    }

    if (navigationTabContainer) {
      return (
        <div className={"mb-2"}>
          {navigationTabContainer}
        </div>
      );
    }

    if (isFreeTrial !== true || isOpseraAdministrator === true) {
      return (
        <div className="mb-2">
          <div className="sub-navigation-block" />
        </div>
      );
    }
  };

  const getPageDescription = () => {
    const breadcrumbPageDescription = breadcrumb?.pageDescription;

    if (hasStringValue(pageDescription) === true) {
      return (
        <div className={"page-description px-3 d-flex"}>
          <div className={"mt-auto"}>
            {pageDescription}
          </div>
        </div>
      );
    }

    if (hasStringValue(breadcrumbPageDescription) === true) {
      return (
        <div className={"page-description px-3 d-flex"}>
          <div className={"mt-auto"}>
            {breadcrumbPageDescription}
          </div>
        </div>
      );
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <ScreenContainerBodyLoadingDialog />
      );
    }

    return (
      <div>
        {toastContext.getInlineBanner()}
        {getPageDescription()}
        <div className={bodyClassName}>
          {children}
        </div>
      </div>
    );
  };

  const getRoleRequirementField = () => {
    if (roleRequirement) {
      return (
        <div className={"content-block-footer-text-container pt-2"}>
          <RoleRequirementField className={"mx-2"} roleRequirement={roleRequirement} />
        </div>
      );
    }
  };

  const getBodyHeight = () => {
    let bodyHeightString = `calc(${screenContainerHeights.SCREEN_CONTAINER_HEIGHT} - ${screenContainerHeights.CONTENT_BLOCK_FOOTER_HEIGHT} - 22px`;

    if (getPageDescription() !== null) {
      bodyHeightString += ` - ${screenContainerHeights.PAGE_DESCRIPTION_HEIGHT}`;
    }

    if (roleRequirement != null) {
      bodyHeightString += ` - ${screenContainerHeights.ROLE_REQUIREMENT_FIELD_HEIGHT}`;
    }

    bodyHeightString += ")";
    return bodyHeightString;
  };

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={navigationTabContainer}
      />
    );
  }

  if (!isLoading && accessRoleData && roleRequirement && !meetsRequirements(roleRequirement, accessRoleData)) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={navigationTabContainer}
      />
    );
  }

  return (
    <div className={className}>
      <div className={"max-content-width max-content-height scroll-y hide-x-overflow"}>
        {getTopNavigation()}
        <div
          className={"screen-container content-container content-card-1"}
          style={{
            minHeight: screenContainerHeights.SCREEN_CONTAINER_HEIGHT,
        }}
        >
          <div className={"px-3 py-2 content-block-header title-text-header-1"}>
            <TitleBar
              titleIcon={breadcrumb?.icon}
              title={breadcrumb?.title}
              isBeta={breadcrumb?.isBeta === true}
              isLoading={isLoading}
              titleActionBar={titleActionBar}
              helpComponent={helpComponent}
            />
          </div>
          <div
            style={{ minHeight: getBodyHeight()}}
          >
            {getBody()}
          </div>
          {getRoleRequirementField()}
        </div>
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
  helpComponent: PropTypes.object,
  bodyClassName: PropTypes.string,
  className: PropTypes.string,
};

ScreenContainer.defaultProps = {
  bodyClassName: "mt-2",
};

export default ScreenContainer;