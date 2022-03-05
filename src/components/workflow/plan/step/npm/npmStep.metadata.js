export const npmStepMetadata = {
  type: "NPM Configuration",
  fields: [
    {
      label: "NPM Commands",
      id: "commands",
      formText: "Specify which NPM commands to run",
      isRequired: true,
    },
    {
      label: "Path to Node.js NPM",
      id: "path",
      formText: "Specify path to your Node.js NPM executable. Leave blank to use an agent-installed instance",
    }
  ],
  newObjectFields: {
    commands: "",
    path: ""
  }
};