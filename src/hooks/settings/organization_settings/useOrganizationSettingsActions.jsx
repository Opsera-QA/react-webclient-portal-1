import useApiService from "hooks/api/service/useApiService";

export default function useOrganizationSettingsActions() {
  const apiService = useApiService();
  const organizationSettingsActions = {};

  organizationSettingsActions.getOrganizationSettingsActions = async () => {
    const apiUrl = `/administration/organization-settings`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return organizationSettingsActions;
}
