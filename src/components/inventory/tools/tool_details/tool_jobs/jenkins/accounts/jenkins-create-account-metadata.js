const jenkinsCreateAccountMetadata = {
  type: "Jenkins Account Credentials",
  fields: [
  {
    label: "Name of the credentials given",
    id: "credentialsId",
  },
  {
    label: "Description of the credentials",
    id: "credentialsDescription",
  }
],
  // newModelBase: {
  //   credentialsId: "",
  //   credentialsDescription: ""
  // }
};



// TODO: Put this in a more fitting spot if used elsewhere
export const platformList = [
  {
    label: "GitLab",
    value: "gitlab"
  },
  {
    label: "GitHub",
    value: "github"
  },
  {
    label: "Bitbucket",
    value: "bitbucket"
  },
];

export default jenkinsCreateAccountMetadata;