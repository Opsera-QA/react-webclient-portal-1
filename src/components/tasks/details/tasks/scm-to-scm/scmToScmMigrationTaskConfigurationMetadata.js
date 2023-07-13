import { TASK_TYPES } from "components/tasks/task.types";

export const scmToScmMigrationTaskConfigurationMetadata = {
  type: "SCM to SCM Migration Task Configuration",
  fields: [
    {
      label: "Migration Type",
      id: "migrationType",
      isRequired: true,
    },
    {
      label: "Source Scm Type",
      id: "sourceScmType",
      isRequired: true,
    },
    {
      label: "Source Git ToolId",
      id: "sourceGitToolId",
      isRequired: true,
    },
    {
      label: "Source Workspace",
      id: "sourceWorkspace",
      isRequiredFunction: (model) => {
        return model?.getData("sourceScmType") === "bitbucket";
      },
    },
    {
      label: "Target Scm Type",
      id: "targetScmType",
      isRequired: true,
    },
    {
      label: "Target Git ToolId",
      id: "targetGitToolId",
      isRequired: true,
    },
    {
      label: "Repository Mapping",
      id: "repositoryMapList",
      isRequired: true,
      maxItems: 10,
    }
  ],
  newObjectFields: {
    migrationType: "",
    sourceScmType: "",
    sourceGitToolId: "",
    sourceWorkspace: "",
    targetScmType: "",
    targetGitToolId: "",
    repositoryMapList: [],
  },
};
