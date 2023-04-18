import { faRectangleList, } from "@fortawesome/pro-light-svg-icons";
import {workspacePaths} from "components/workspace/workspace.paths";

export const workspaceTrails = {};

workspaceTrails.workspace = {
  parent: undefined,
    name: "workspace",
    path: workspacePaths.workspace,
    title: "Workspace",
    linkText: "Workspace",
    icon: faRectangleList,
    pageDescription: "The Opsera workspace allows you to configure and track all workflows in one central location.",
};