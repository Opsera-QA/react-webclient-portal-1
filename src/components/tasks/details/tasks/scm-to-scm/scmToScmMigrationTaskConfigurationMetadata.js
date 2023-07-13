import { TASK_TYPES } from "components/tasks/task.types";

export const scmToScmMigrationTaskConfigurationMetadata = {
  type: "SCM to SCM Migration Task Configuration",
  fields: [
    {
      label: "Migration Type",
      id: "migrationType",
    },
    {
      label: "Source Scm Type",
      id: "sourceScmType",
    },
    {
      label: "Source Git ToolId",
      id: "sourceGitToolId",
    },
    {
      label: "Source Workspace",
      id: "sourceWorkspace",
    },
    {
      label: "Target Scm Type",
      id: "targetScmType",
    },
    {
      label: "Target Git ToolId",
      id: "targetGitToolId",
    },
  ],
  newObjectFields: {
    migrationType: "",
    sourceScmType: "",
    sourceGitToolId: "",
    sourceWorkspace: "",
    targetScmType: "",
    targetGitToolId: "",
  },
};
