// TODO: Please keep aligned with node's version
export const TOOL_IDENTIFIERS = {
  DOT_NET: "dotnet",
  DOT_NET_CLI: "dotnet-cli",
  "aws_account":"aws_account",
  "aws_lambda":"aws_lambda",
  "anchore-scan":"anchore-scan",
  "anchore-integrator":"anchore-integrator",
  "ansible":"ansible",
  "jmeter":"jmeter",
  "approval":"approval",
  "argo":"argo",
  "jira":"jira",
  "azure":"azure",
  "azure_acr_push":"azure_acr_push",
  "azure_aks_deploy":"azure_aks_deploy",
  "azure_account":"azure_account",
  "azure-devops":"azure-devops",
  "azure-functions":"azure-functions",
  "bitbucket":"bitbucket",
  "buildkite":"buildkite",
  "child-pipeline":"child-pipeline",
  "command-line":"command-line",
  "coverity":"coverity",
  "cypress":"cypress",
  "databricks-notebook":"databricks-notebook",
  "docker-push":"docker-push",
  "elastic-beanstalk":"elastic-beanstalk",
  "flyway-database-migrator":"flyway-database-migrator",
  "gcp_account":"gcp_account",
  "github":"github",
  "gitlab":"gitlab",
  "gitops":"gitops",
  "gcp-deploy":"gcp-deploy",
  "hashicorp_vault":"hashicorp_vault",
  "informatica":"informatica",
  "jfrog_artifactory_docker":"jfrog_artifactory_docker",
  "jfrog_artifactory_maven":"jfrog_artifactory_maven",
  "junit":"junit",
  "jenkins":"jenkins",
  "kafka_connect":"kafka_connect",
  "mock-step":"mock-step",
  "mongodb":"mongodb",
  "npm":"npm",
  "nunit":"nunit",
  "nexus":"nexus",
  "octopus":"octopus",
  "pmd":"pmd",
  "packer":"packer",
  "parallel-processor":"parallel-processor",
  "powershell":"powershell",
  "s3":"s3",
  "azure-zip-deployment":"azure-zip-deployment",
  "sfdc-configurator":"sfdc-configurator",
  "ssh-upload":"ssh-upload",
  "selenium":"selenium",
  "sentinel":"sentinel",
  "servicenow":"servicenow",
  "slack":"slack",
  "sonar":"sonar",
  "spinnaker":"spinnaker",
  "teamcity":"teamcity",
  "teams":"teams",
  "terraform":"terraform",
  "terraform-cloud":"terraform-cloud",
  "terrascan":"terrascan",
  "320s":"320s",
  "twistlock":"twistlock",
  "yaml_git_processor":"yaml_git_processor",
  "test-create-modal-5":"test-create-modal-5",
  "orchestration":"orchestration",
  "unit-test":"unit-test",
  "interaction-gate":"interaction-gate",
  "test-new-save-button-c-and-ctest":"test-new-save-button-c-and-ctest",
  "tester":"tester",
  "tool-identifier-test":"tool-identifier-test",
  "xunit":"xunit"
};

export const TOOL_IDENTIFIER_LABELS = {
  DOT_NET: ".NET",
  DOT_NET_CLI:".NET CLI",
  "aws_account":"AWS Account",
  "aws_lambda":"AWS Lambda Deploy",
  "anchore-scan":"Anchore (Jenkins)",
  "anchore-integrator":"Anchore Integratoor",
  "ansible":"Ansible",
  "jmeter":"Apache JMeter",
  "approval":"Approval Gate",
  "argo":"Argo CD",
  "jira":"Atlassian Jira",
  "azure":"Azure",
  "azure_acr_push":"Azure ACR Push",
  "azure_aks_deploy":"Azure AKS Deploy",
  "azure_account":"Azure Account",
  "azure-devops":"Azure Devops",
  "azure-functions":"Azure Functions",
  "bitbucket":"Bitbucket",
  "buildkite":"Buildkite",
  "child-pipeline":"Child Pipeline",
  "command-line":"Command Line",
  "coverity":"Coverity",
  "cypress":"Cypress",
  "databricks-notebook":"Databricks Notebook Execution",
  "docker-push":"Docker ECR Push",
  "elastic-beanstalk":"Elastic Beanstalk Deploy",
  "flyway-database-migrator":"Flyway Database Migrator",
  "gcp_account":"GCP Account",
  "github":"GitHub",
  "gitlab":"GitLab",
  "gitops":"GitOps",
  "gcp-deploy":"Google Cloud Platform Deploy",
  "hashicorp_vault":"Hashicorp Vault",
  "informatica":"Informatica",
  "jfrog_artifactory_docker":"JFrog Artifactory Docker",
  "jfrog_artifactory_maven":"JFrog Artifactory Maven",
  "junit":"JUnit",
  "jenkins":"Jenkins",
  "kafka_connect":"Kafka Connect",
  "mock-step":"Mock Step",
  "mongodb":"MongoDB",
  "npm":"NPM Scripts",
  "nunit":"NUnit",
  "nexus":"Nexus Repository",
  "octopus":"Octopus Deploy",
  "pmd":"PMD Scan",
  "packer":"Packer",
  "parallel-processor":"Parallel Processor",
  "powershell":"Powershell",
  "s3":"Publish to S3",
  "azure-zip-deployment":"Push to Azure Storage",
  "sfdc-configurator":"SFDC Configurator",
  "ssh-upload":"SSH Based Deploy",
  "selenium":"Selenium Framework",
  "sentinel":"Sentinel",
  "servicenow":"ServiceNow",
  "slack":"Slack",
  "sonar":"SonarQube",
  "spinnaker":"Spinnaker",
  "teamcity":"TeamCity",
  "teams":"Teams",
  "terraform":"Terraform",
  "terraform-cloud":"Terraform Cloud",
  "terrascan":"Terrascan",
  "320s":"Test 316",
  "twistlock":"Twistlock",
  "yaml_git_processor":"YAML Git Processor",
  "test-create-modal-5":"test-create-modal-5",
  "orchestration":"test-create-properties",
  "unit-test":"test-create-properties-old",
  "interaction-gate":"test-final-34",
  "test-new-save-button-c-and-ctest":"test-new-save-button-c-and-c3",
  "tester":"this is a test of the ident creation",
  "tool-identifier-test":"tool-identifier-test",
  "xunit":"xUnit"
};

//
// export const getTaskTypeLabel = (taskType) => {
//   switch (taskType) {
//     // Salesforce
//     case TASK_TYPES.SYNC_SALESFORCE_REPO:
//       return TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO;
//     case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
//       return TASK_TYPE_LABELS.SALESFORCE_CERTIFICATE_GENERATION;
//     case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
//       return TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE;
//     case TASK_TYPES.SALESFORCE_BULK_MIGRATION:
//       return TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION;
//
//     // Git
//     case TASK_TYPES.SYNC_GIT_BRANCHES:
//       return TASK_TYPE_LABELS.SYNC_GIT_BRANCHES;
//
//     // AWS
//     case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
//       return TASK_TYPE_LABELS.AWS_CREATE_ECS_CLUSTER;
//     case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
//       return TASK_TYPE_LABELS.AWS_CREATE_ECS_SERVICE;
//     case TASK_TYPES.AWS_CREATE_LAMBDA_FUNCTION:
//       return TASK_TYPE_LABELS.AWS_CREATE_LAMBDA_FUNCTION;
//
//     // Azure
//     case TASK_TYPES.AZURE_CLUSTER_CREATION:
//       return TASK_TYPE_LABELS.AZURE_CLUSTER_CREATION;
//     default:
//       return taskType;
//   }
// };