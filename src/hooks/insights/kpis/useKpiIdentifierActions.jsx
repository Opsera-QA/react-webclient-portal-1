import useApiService from "hooks/api/service/useApiService";

export default function useKpiIdentifierActions() {
  const apiService = useApiService();
  const kpiIdentifierActions = {};

  kpiIdentifierActions.getKpis = async (status, policySupport, manualDataEntry) => {
    const apiUrl = "/analytics/kpi/configurations";
    const queryParameters = {
      pageSize: 10000,
      status: status,
      policySupport: policySupport,
      manualDataEntry: manualDataEntry,
    };

    return apiService.handleApiGetRequest(apiUrl, queryParameters);
  };

  return kpiIdentifierActions;
}
