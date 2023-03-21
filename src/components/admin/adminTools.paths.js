export const adminToolsPaths = {};

adminToolsPaths.admin = "admin";

adminToolsPaths.systemStatus = adminToolsPaths.admin + "/system-status";
adminToolsPaths.systemHealthCheck = adminToolsPaths.admin + "/health";

adminToolsPaths.deprecatedReports = adminToolsPaths.admin + "/reports";
adminToolsPaths.reportsRegistration = adminToolsPaths.admin + "/analytics/reports-registration";
adminToolsPaths.systemManagement = adminToolsPaths.admin + "/manage-systems";

adminToolsPaths.templateManagement = adminToolsPaths.admin + "/templates";
adminToolsPaths.templateDetailView = adminToolsPaths.templateManagement + "/details/";

adminToolsPaths.taskTemplateManagement = adminToolsPaths.admin + "/templates/tasks";
adminToolsPaths.taskTemplateDetailView = adminToolsPaths.taskTemplateManagement + "/details/";

adminToolsPaths.platformSystemParameterManagement = adminToolsPaths.admin + "/platform/system-parameters";
adminToolsPaths.platformSystemParameterDetailView = adminToolsPaths.platformSystemParameterManagement + "/details";

adminToolsPaths.platformSettingsManagement = adminToolsPaths.admin + "/platform/settings";
adminToolsPaths.platformSettingsDetailView = adminToolsPaths.platformSettingsManagement + "/details";

adminToolsPaths.freeTrialCustomerWorkspaceManagement = adminToolsPaths.admin + "/customer/workspaces";
adminToolsPaths.freeTrialCustomerWorkspaceDetailView = adminToolsPaths.freeTrialCustomerWorkspaceManagement + "/user/";

adminToolsPaths.pipelineStorageManagement = adminToolsPaths.admin + "/pipeline-storage";
adminToolsPaths.pipelineStorageDetailView = adminToolsPaths.pipelineStorageManagement + "/details/";

adminToolsPaths.siteNotificationManagement = adminToolsPaths.admin + "/site-notifications/table";
adminToolsPaths.siteNotificationManager = adminToolsPaths.admin + "/site-notifications";
adminToolsPaths.siteNotificationDetailView = adminToolsPaths.siteNotificationManagement + "/details/";

adminToolsPaths.toolManagement = adminToolsPaths.admin + "/tools/categories";
adminToolsPaths.toolCategoryDetailView = adminToolsPaths.toolManagement + "/types/details/";
adminToolsPaths.toolIdentifierDetailView = adminToolsPaths.toolManagement + "/identifiers/details/";

adminToolsPaths.ldapOrganizationManagement = adminToolsPaths.admin + "/organizations";
adminToolsPaths.ldapOrganizationDetailView = adminToolsPaths.admin + "/organizations";

adminToolsPaths.ldapOrganizationAccountManagement = adminToolsPaths.admin + "/organization-accounts";
adminToolsPaths.ldapOrganizationDetailView = adminToolsPaths.admin + "/organization-accounts";

adminToolsPaths.customerOnboarding = "admin/accounts/create";

adminToolsPaths.customEnviromentVariableManagement = adminToolsPaths.admin + "/custom-environment-variables";
adminToolsPaths.registeredUsersManagement = adminToolsPaths.admin + "/registered-users";

adminToolsPaths.apiConnectionTest = adminToolsPaths.admin + "/demo/api";

adminToolsPaths.kpiManagement = adminToolsPaths.admin + "/kpis";
adminToolsPaths.kpiDetailView = adminToolsPaths.kpiManagement;

adminToolsPaths.remoteApplications = adminToolsPaths.admin + "/remote-applications";
adminToolsPaths.remoteApplicationDetailView = adminToolsPaths.remoteApplications + "/details/";
