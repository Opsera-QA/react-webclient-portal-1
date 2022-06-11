import React, {useState} from "react";
import PropTypes from "prop-types";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import TitleBar from "components/common/fields/TitleBar";
import {getBreadcrumb, getParentBreadcrumb} from "components/common/navigation/trails";
import RoleRequirementField from "components/common/fields/access/RoleRequirementField";
import {meetsRequirements} from "components/common/helpers/role-helpers";
import AccessRoleLevelField from "components/common/fields/access/AccessRoleLevelField";
import ScreenContainerBodyLoadingDialog
  from "components/common/status_notifications/loading/ScreenContainerBodyLoadingDialog";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";

function DetailScreenContainer(
  {
    breadcrumbDestination,
    actionBar,
    dataObject,
    detailPanel,
    isLoading,
    accessDenied,
    metadata,
    showBreadcrumbTrail,
    navigationTabContainer,
    accessRoleData,
    roleRequirement,
    titleActionBar,
    objectRoles,
    helpComponent,
    isBeta,
  }) {
  const [breadcrumb] = useState(getBreadcrumb(breadcrumbDestination));
  const [parentBreadcrumb] = useState(getParentBreadcrumb(breadcrumbDestination));

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
        titleActionBar={titleActionBar}
        helpComponent={helpComponent}
        isBeta={isBeta}
      />
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <ScreenContainerBodyLoadingDialog />
      );
    }

    return (
      <div>
        {getActionBar()}
        <div>
          {detailPanel}
        </div>
      </div>
    );
  };

  const getActionBar = () => {
    if (dataObject != null) {
      return <div className="mb-1">{actionBar}</div>;
    }

    return <div className="py-2" />;
  };

  const getAccessBasedField = () => {
    if (objectRoles != null) {
      return (
        <div className={"content-block-footer-text-container pt-2"}>
          <AccessRoleLevelField
            className={"mx-2"}
            accessRoleData={accessRoleData}
            objectRoles={objectRoles}
            dataObject={dataObject}
          />
        </div>
      );
    }

    if (roleRequirement) {
      return (
        <div className={"content-block-footer-text-container pt-2"}>
          <RoleRequirementField
            className={"mx-2"}
            roleRequirement={roleRequirement}
          />
        </div>
      );
    }
  };

  const getBodyHeight = () => {
    let bodyHeightString = `calc(${screenContainerHeights.SCREEN_CONTAINER_HEIGHT} - ${screenContainerHeights.CONTENT_BLOCK_FOOTER_HEIGHT} - 50px`;

    if (roleRequirement != null || objectRoles != null) {
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

  if (!isLoading && dataObject == null) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={navigationTabContainer}
      />
    );
  }

  return (
    <div className="max-content-width ml-2 max-content-height scroll-y hide-x-overflow">
      {getTopNavigation()}
      <div
        className={"content-container content-card-1"}
        style={{ minHeight: screenContainerHeights.SCREEN_CONTAINER_HEIGHT}}
      >
        <div className="px-2 content-block-header title-text-header-1">
          {getTitleBar()}
        </div>
        <div
          style={{ minHeight: getBodyHeight()}}
        >
          {getBody()}
        </div>
        {getAccessBasedField()}
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
  metadata: PropTypes.object,
  accessRoleData: PropTypes.object,
  roleRequirement: PropTypes.string,
  titleActionBar: PropTypes.object,
  objectRoles: PropTypes.array,
  helpComponent: PropTypes.object,
  isBeta: PropTypes.bool,
};

export default DetailScreenContainer;