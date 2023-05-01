import React from "react";
import PropTypes from "prop-types";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import ScreenContainerTitleBar from "components/common/fields/ScreenContainerTitleBar";
import {getBreadcrumb, getParentBreadcrumb} from "components/common/navigation/trails";
import RoleRequirementField from "components/common/fields/access/RoleRequirementField";
import {meetsRequirements} from "components/common/helpers/role-helpers";
import AccessRoleLevelField from "components/common/fields/access/AccessRoleLevelField";
import ScreenContainerBodyLoadingDialog
  from "components/common/status_notifications/loading/ScreenContainerBodyLoadingDialog";
import {screenContainerHeights} from "components/common/panels/general/screenContainer.heights";
import useComponentStateReference from "hooks/useComponentStateReference";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";

function DetailScreenContainer(
  {
    breadcrumbDestination,
    actionBar,
    dataObject,
    detailPanel,
    isLoading,
    accessDenied,
    showBreadcrumbTrail,
    navigationTabContainer,
    roleRequirement,
    titleActionBar,
    objectRoles,
    helpComponent,
    isBeta,
    showActiveFilters,
    filterModel,
    filterOverlay,
    loadDataFunction,
  }) {
  const breadcrumb = getBreadcrumb(breadcrumbDestination);
  const parentBreadcrumb = getParentBreadcrumb(breadcrumbDestination);
  const activeField = dataObject?.getActiveField();
  const {
    accessRoleData,
    userData,
  } = useComponentStateReference();

  const getTopNavigation = () => {
    if (showBreadcrumbTrail) {
      return (<BreadcrumbTrail destination={breadcrumbDestination}/>);
    }

    if (navigationTabContainer) {
      return (
        <div className={"mb-2"}>
          {navigationTabContainer}
        </div>
      );
    }

    return (
      <div className={"mb-2"}>
        <div className={"sub-navigation-block"}/>
      </div>
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <ScreenContainerBodyLoadingDialog/>
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

    return <div className="py-2"/>;
  };

  const getAccessBasedField = () => {
    if (objectRoles != null) {
      return (
        <div className={"content-block-footer-text-container pt-2"}>
          <AccessRoleLevelField
            className={"mx-2"}
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

  const getActiveFilterDisplayer = () => {
    if (showActiveFilters === true) {
      return (
        <ActiveFilterDisplayer
          filterModel={filterModel}
          loadData={loadDataFunction}
        />
      );
    }
  };

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={navigationTabContainer}
      />
    );
  }

  if (breadcrumb && Array.isArray(breadcrumb?.allowedRoles) && RoleHelper.doesUserMeetSiteRoleRequirements(userData, breadcrumb?.allowedRoles) !== true) {
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
    <div className={"max-content-width"}>
      {getTopNavigation()}
      <div
        className={"screen-container content-container content-card-1"}
        style={{
          minHeight: screenContainerHeights.SCREEN_CONTAINER_HEIGHT,
        }}
      >
        <div className={"p-2 content-block-header title-text-header-1 d-flex"}>
          <div className={"my-auto w-100"}>
            <ScreenContainerTitleBar
              isLoading={isLoading}
              parentBreadcrumb={parentBreadcrumb}
              titleIcon={breadcrumb?.dynamicIconFunction ? breadcrumb?.dynamicIconFunction(dataObject) : breadcrumb?.icon}
              title={dataObject?.getDetailViewTitle()}
              inactive={activeField ? dataObject?.getData(activeField) === false : false}
              titleActionBar={titleActionBar}
              helpComponent={helpComponent}
              isBeta={isBeta}
              filterModel={filterModel}
              filterOverlay={filterOverlay}
              loadDataFunction={loadDataFunction}
            />
          </div>
        </div>
        {getActiveFilterDisplayer()}
        <div
          style={{minHeight: getBodyHeight()}}
        >
          {getBody()}
        </div>
        {getAccessBasedField()}
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
  roleRequirement: PropTypes.string,
  titleActionBar: PropTypes.object,
  objectRoles: PropTypes.array,
  helpComponent: PropTypes.object,
  isBeta: PropTypes.bool,
  showActiveFilters: PropTypes.bool,
  filterModel: PropTypes.object,
  filterOverlay: PropTypes.any,
  loadDataFunction: PropTypes.func,
};

export default DetailScreenContainer;