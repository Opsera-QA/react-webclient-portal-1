import {faOctopusDeploy, faSalesforce} from "@fortawesome/free-brands-svg-icons";
import toolIdentifierConstants from "@opsera/definitions/constants/tool_identifiers/toolIdentifier.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import constantsHelper from "@opsera/definitions/constants/constants.helper";

const baseBucketUrl = `${process.env.REACT_APP_OPSERA_S3_STORAGE_URL}/vendor-logos`;

export const vendorImageConstants = {};

vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS = {
  ANCHOR: `${baseBucketUrl}/anchor-96-256.png`,
  ANSIBLE: `${baseBucketUrl}/ansible-98-124.png`,
  APIGEE: `${baseBucketUrl}/apigee.png`,
  ARGO: `${baseBucketUrl}/argo.png`,
  AQUASEC: `${baseBucketUrl}/aquasec.png`,
  AWS: `${baseBucketUrl}/icons8-amazon-web-services-96.png`,
  AZURE: `${baseBucketUrl}/icons8-azure-96.png`,
  BITBUCKET: `${baseBucketUrl}/bitbucket-76-75.png`,
  BLACKDUCK: `${baseBucketUrl}/blackduck.png`,
  BOOMI: `${baseBucketUrl}/boomi.png`,
  BUILDKITE: `${baseBucketUrl}/buildkite.png`,
  COVERITY: `${baseBucketUrl}/coverity.png`,
  CYPRESS: `${baseBucketUrl}/cypress.png`,
  DOCKER: `${baseBucketUrl}/icons8-docker-96.png`,
  DOTNET: `${baseBucketUrl}/dotnet.png`,
  FLYWAY: `${baseBucketUrl}/flyway.png`,
  FORTIFY: `${baseBucketUrl}/fortify.png`,
  GIT: `${baseBucketUrl}/icons8-git-96.png`,
  GITHUB: `${baseBucketUrl}/icons8-github-96.png`,
  GITLAB: `${baseBucketUrl}/icons8-gitlab-96.png`,
  GOOGLE_CHAT: `${baseBucketUrl}/gchat.png`,
  GOOGLE_CLOUD_PLATFORM: `${baseBucketUrl}/icons8-google-cloud-platform-64.png`,
  HASHICORP: `${baseBucketUrl}/hashicorp.png`,
  HELM: `${baseBucketUrl}/heml.png`,
  INFORMATICA: `${baseBucketUrl}/informatica.png`,
  JENKINS: `${baseBucketUrl}/jenkins-98-113.png`,
  JFROG: `${baseBucketUrl}/jfog.jpg`,
  JIRA: `${baseBucketUrl}/jira-74-220.png`,
  JMETER: `${baseBucketUrl}/jmeter.png`,
  JUNIT: `${baseBucketUrl}/junit-97-172.png`,
  KAFKA: `${baseBucketUrl}/kafka.png`,
  LIQUIBASE: `${baseBucketUrl}/liquibase.png`,
  MICROSOFT: `${baseBucketUrl}/microsoft.png`,
  MICROSOFT_TEAMS: `${baseBucketUrl}/icons8-microsoft-teams-48.png`,
  MONGO_DB: `${baseBucketUrl}/icons8-mongodb-96.png`,
  NEXUS: `${baseBucketUrl}/nexus-122-116.png`,
  NPM: `${baseBucketUrl}/npm.png`,
  NUNIT: `${baseBucketUrl}/nunit.png`,
  OPSERA: `/img/logos/opsera_bird_infinity_171_126.png`,
  ORACLE: `${baseBucketUrl}/oracle.png`,
  PROVAR: `${baseBucketUrl}/provar.png`,
  SAP: `${baseBucketUrl}/sap.png`,
  SELENIUM: `${baseBucketUrl}/selenium-64-261.png`,
  SERVICE_NOW: `${baseBucketUrl}/servicenow.png`,
  SLACK: `${baseBucketUrl}/slack-64-252.png`,
  SNAPLOGIC: `${baseBucketUrl}/snaplogic.png`,
  SNYK: `${baseBucketUrl}/snyk.png`,
  SONAR: `${baseBucketUrl}/sonar.png`,
  SPINNAKER: `${baseBucketUrl}/spinnaker.png`,
  TEAMCITY: `${baseBucketUrl}/teamcity-120-120.png`,
  TERRAFORM: `${baseBucketUrl}/hashicorp-terraform-48.png`,
  TERRASCAN: `${baseBucketUrl}/terrascan.png`,
  THYCOTIC_VAULT: `${baseBucketUrl}/thycotic.png`,
  TWISTLOCK: `${baseBucketUrl}/twistlock-64-254.png`,
  XUNIT: `${baseBucketUrl}/xunit-60-213.png`,
};

vendorImageConstants.VENDOR_LOGO_IMAGE_CARD_HEIGHTS = {
  ANCHOR: 75,
  ANSIBLE: 100,
  APIGEE: undefined,
  ARGO: 100,
  AQUASEC: 40,
  AWS: 100,
  AZURE: 100,
  BITBUCKET: undefined,
  BLACKDUCK: undefined,
  BOOMI: undefined,
  BUILDKITE: undefined,
  COVERITY: undefined,
  CYPRESS: undefined,
  DOCKER: 100,
  DOTNET: 65,
  FLYWAY: 90,
  FORTIFY: undefined,
  GIT: 100,
  GITHUB: 100,
  GITLAB: 100,
  GOOGLE_CHAT: 75,
  GOOGLE_CLOUD_PLATFORM: 90,
  HASHICORP: 75,
  HELM: 100,
  INFORMATICA: 50,
  JENKINS: undefined,
  JFROG: undefined,
  JIRA: 60,
  JMETER: 30,
  JUNIT: 90,
  KAFKA: 60,
  LIQUIBASE: 70,
  MICROSOFT: undefined,
  MICROSOFT_TEAMS: 50,
  MONGO_DB: 100,
  NEXUS: 100,
  NPM: undefined,
  NUNIT: undefined,
  OPSERA: 100,
  ORACLE: undefined,
  PROVAR: undefined,
  SAP: undefined,
  SELENIUM: 50,
  SERVICE_NOW: undefined,
  SLACK: 50,
  SNAPLOGIC: undefined,
  SNYK: undefined,
  SONAR: undefined,
  SPINNAKER: undefined,
  TEAMCITY: 100,
  TERRAFORM: 50,
  TERRASCAN: undefined,
  THYCOTIC_VAULT: undefined,
  TWISTLOCK: 50,
  XUNIT: 50,
};

vendorImageConstants.VENDOR_LOGO_FONTAWESOME_ICONS = {
  OCTOPUS: faOctopusDeploy,
  SALESFORCE: faSalesforce,
};

vendorImageConstants.TOOL_IDENTIFIER_LOGOS = {
  ANCHORE_INTEGRATOR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ANCHOR,
  ANCHORE_SCAN: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ANCHOR,
  ANSIBLE: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ANSIBLE,
  APIGEE: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.APIGEE,
  APPROVAL: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  ARGO: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ARGO,
  AWS_ACCOUNT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS,
  AWS_DEPLOY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS,
  AWS_ECS_DEPLOY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS,
  AWS_LAMDA: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS,
  AQUASEC: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AQUASEC,
  AZURE: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_ACCOUNT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_ACR_PUSH: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_AKS_DEPLOY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_CLI: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_DEVOPS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_FUNCTIONS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_SCRIPTS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_WEBAPPS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  AZURE_ZIP_DEPLOYMENT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AZURE,
  BITBUCKET: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.BITBUCKET,
  BLACKDUCK: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.BLACKDUCK,
  BOOMI: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.BOOMI,
  BUILDKITE: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.BUILDKITE,
  CHILD_PIPELINE: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  COMMAND_LINE: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  CONDITIONAL_OPERATOR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  COVERITY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.COVERITY,
  CYPRESS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.CYPRESS,
  DATABRICKS_NOTEBOOK: undefined,
  DOCKER_PUSH: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.DOCKER,
  DOCKER_CLI: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.DOCKER,
  DOT_NET: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.DOTNET,
  DOT_NET_CLI: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.DOTNET,
  ELASTIC_BEANSTALK: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS,
  EXTERNAL_API_INTEGRATOR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  EXTERNAL_REST_API_INTEGRATION: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  FLYWAY_DATABASE_MIGRATOR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.FLYWAY,
  FORTIFY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.FORTIFY,
  GCHAT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GOOGLE_CHAT,
  GCP_ACCOUNT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GOOGLE_CLOUD_PLATFORM,
  GCP_DEPLOY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GOOGLE_CLOUD_PLATFORM,
  GITHUB: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GITHUB,
  GITHUB_DEPLOY_KEY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GITHUB,
  GITLAB: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GITLAB,
  GITOPS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GIT,
  GIT_OPERATION: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.GIT,
  GITSCRAPER: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  HASHICORP_VAULT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.HASHICORP,
  HELM: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.HELM,
  INFORMATICA: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.INFORMATICA,
  INFORMATICA_IDQ: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.INFORMATICA,
  JENKINS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JENKINS,
  JFROG_ARTIFACTORY_DOCKER: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JFROG,
  JFROG_ARTIFACTORY_MAVEN: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JFROG,
  JIRA: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JIRA,
  JMETER: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JMETER,
  JUNIT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.JUNIT,
  KAFKA_CONNECT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.KAFKA,
  LIQUIBASE: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.LIQUIBASE,
  MOCK_STEP: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  MONGO_DB: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.MONGO_DB,
  MONGODB_REALM: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.MONGO_DB,
  NEXUS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.NEXUS,
  NPM: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.NPM,
  NUNIT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.NUNIT,
  OCTOPUS: vendorImageConstants.VENDOR_LOGO_FONTAWESOME_ICONS.OCTOPUS,
  ORACLE_FUSION: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ORACLE,
  ORACLE_FUSION_REPORT_MIGRATION: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.ORACLE,
  PACKER: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.HASHICORP,
  PARALLEL_PROCESSOR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  PMD: undefined,
  POWERSHELL: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  PROVAR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.PROVAR,
  RUNTIME_SETTINGS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  S3: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.AWS,
  SAP_CPQ: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SAP,
  SALESFORCE_CODE_ANALYZER: vendorImageConstants.VENDOR_LOGO_FONTAWESOME_ICONS.SALESFORCE,
  SELENIUM: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SELENIUM,
  SENTINEL: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.MICROSOFT,
  SERVICE_NOW: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SERVICE_NOW,
  SFDC_CONFIGURATOR: vendorImageConstants.VENDOR_LOGO_FONTAWESOME_ICONS.SALESFORCE,
  SLACK: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SLACK,
  SNAPLOGIC: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SNAPLOGIC,
  SNYK: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SNYK,
  SONAR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SONAR,
  SPINNAKER: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.SPINNAKER,
  SSH_UPLOAD: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  TEAMCITY: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TEAMCITY,
  TEAMS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.MICROSOFT_TEAMS,
  TERRAFORM: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TERRAFORM,
  TERRAFORM_CLOUD: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TERRAFORM,
  TERRAFORM_VCS: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TERRAFORM,
  TERRASCAN: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TERRASCAN,
  THYCOTIC_VAULT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.THYCOTIC_VAULT,
  TWISTLOCK: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.TWISTLOCK,
  USER_ACTION: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
  XUNIT: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.XUNIT,
  YAML_GIT_PROCESSOR: vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS.OPSERA,
};

vendorImageConstants.getVendorImageForToolIdentifier = (
  toolIdentifier,
) => {
  const key = toolIdentifierConstants.getEnumKeyForToolIdentifier(toolIdentifier);

  if (!key) {
    return undefined;
  }

  return DataParsingHelper.parseString(
    vendorImageConstants.TOOL_IDENTIFIER_LOGOS[key],
  );
};

vendorImageConstants.getRecommendedCardVendorImageHeight = (
  toolIdentifier,
) => {
  const vendorImageLink = vendorImageConstants.getVendorImageForToolIdentifier(toolIdentifier);

  if (!vendorImageLink) {
    return undefined;
  }

  const key = constantsHelper.getKeyForValue(
    vendorImageConstants.VENDOR_LOGO_IMAGE_LINKS,
    vendorImageLink,
  );

  if (!key) {
    return undefined;
  }

  const recommendedHeight = DataParsingHelper.parseInteger(vendorImageConstants.VENDOR_LOGO_IMAGE_CARD_HEIGHTS[key]);

  if (recommendedHeight) {
    return recommendedHeight;
  }
};

