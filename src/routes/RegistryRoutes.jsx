import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Inventory from "components/inventory/Inventory";
import ToolInventory from "components/inventory/tools/ToolInventory";
import PlatformInventory from "components/inventory/platform/PlatformInventory";
import ParametersInventory from "components/inventory/parameters/ParametersInventory";
import ScriptsInventory from "components/inventory/scripts/ScriptsInventory";
import ToolDetailView from "components/inventory/tools/tool_details/ToolDetailView";
import ToolProjectsView from "components/inventory/tools/tool_details/projects/ToolProjectsView";

export default function RegistryRoutes() {
  return (
    <>
      <SecureRoute path="/inventory" exact component={Inventory} />
      <SecureRoute path="/inventory/tools" exact component={ToolInventory} />
      <SecureRoute path="/inventory/platform" exact component={PlatformInventory} />
      <SecureRoute path="/inventory/parameters" exact component={ParametersInventory} />
      <SecureRoute path="/inventory/scripts" exact component={ScriptsInventory} />
      <SecureRoute path="/inventory/tools/details/:id/:tab?" exact component={ToolDetailView} />
      <SecureRoute path="/inventory/tools/details/:id/projects/:projectId" exact
                   component={ToolProjectsView} />
    </>
  );
}

RegistryRoutes.propTypes = {};

