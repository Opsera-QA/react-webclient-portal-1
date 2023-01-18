import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";
import useComponentStateReference from "../../../../../hooks/useComponentStateReference";


function AccountSettingsHelpDocumentation() {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isPowerUser,
    isSaasUser,
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getDeleteToolChainsHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true)
      || isSaasUser === true
    ) {
      return (
        <li><b>Delete Tool Chains</b> - Choose a registered application, view the active tools, and then delete them from the application. This will perform a complete end to end removal of all instances related to an application.</li>
      );
    }
  };

  const getGroupsHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true)
      && isSaasUser !== true
    ) {
      return (
        <li><b>Groups</b> - Manage user groups and their Membership. View <b><a href="https://docs.opsera.io/role-based-access-pipelines-and-tool-registry#rolebasedaccess-pipelines-and-toolregistry-groupmanagement" target="_blank" rel="noreferrer">Group Management Help Documentation</a></b>.</li>
      );
    }
  };

  const getLogsExportHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true)
      && isSaasUser !== true
    ) {
      return (
        <li><b>Logs Export Options</b> - Manage export of pipeline activity audit logs.</li>
      );
    }
  };


  const getUnsecuredItemsHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser !== true)
      && isSaasUser !== true
    ) {
      return (
        <li><b>Unsecured Items</b> - View Items that have not been assigned access rules.</li>
      );
    }
  };

  const getSiteRolesHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser !== true)
      && isSaasUser !== true
    ) {
      return (
        <li><b>Site Roles</b> - Manage the following Site Roles levels: Administrators, Power Users and Users. View <b><a href="https://docs.opsera.io/role-based-access-pipelines-and-tool-registry" target="_blank" rel="noreferrer">Site Roles Help Documentation</a></b>. </li>
      );
    }
  };

  const getPoliciesHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser !== true)
      && isSaasUser !== true
    ) {
      return (
        <li><b>Policies</b> - Manage Organization Policies to tailor Opsera to your needs. </li>
      );
    }
  };
  const getUsersHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true)
      && isSaasUser !== true
    ) {
      return (
        <li><b>Users</b> - Manage existing users and register new users for this account. The New User form allows owners to create new user accounts with targeted group access. Users will receive an invitation email upon completion of the form. View <b><a href="https://docs.opsera.io/role-based-access-pipelines-and-tool-registry/manage-users" target="_blank" rel="noreferrer">User Management Help Documentation</a></b>.</li>
      );
    }
  };

  const getTagsHelpInformation = () => {
    if (
      (isSiteAdministrator === true
        || isOpseraAdministrator === true
        || isPowerUser === true)
      || isSaasUser === true
    ) {
      return (
        <li><b>Tags</b> - Manage Tags and view their usage in Tools, Pipelines, and Dashboards.</li>
      );
    }
  };

  const getHelpDocumentation = () => {
    return (
      <div>Administrators and Power Users can manage account settings from this dashboard.
        <div className={"mt-2"}>
          <ul style={{listStyleType: "none"}}>
            {getDeleteToolChainsHelpInformation()}
            {getGroupsHelpInformation()}
            {getLogsExportHelpInformation()}
            {getUnsecuredItemsHelpInformation()}
            {getSiteRolesHelpInformation()}
            {getPoliciesHelpInformation()}
            {getUsersHelpInformation()}
            {getTagsHelpInformation()}
          </ul>
        </div>
      </div>

    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpTopic={"Account Settings"}
      helpDocumentation={getHelpDocumentation()}
    >
    </HelpOverlayBase>
  );
}

export default React.memo(AccountSettingsHelpDocumentation);