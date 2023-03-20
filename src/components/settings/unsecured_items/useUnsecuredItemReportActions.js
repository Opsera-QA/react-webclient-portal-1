import useApiService from "hooks/api/service/useApiService";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function useUnsecuredItemReportActions() {
  const apiService = useApiService();
  const unsecuredItemReportActions = {};

  unsecuredItemReportActions.getUnassignedRulesItems = async (itemFilterModel) => {
    const category = DataParsingHelper.parseString(itemFilterModel?.getData("category"), "all");
    const apiUrl = `/reports/unassigned-items/${category}`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return unsecuredItemReportActions;
}