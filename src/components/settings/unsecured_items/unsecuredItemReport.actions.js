import baseActions from "utils/actionsBase";

export const unsecuredItemReportActions = {};

unsecuredItemReportActions.getUnassingedRulesItems = async (
  getAccessToken,
  cancelTokenSource,
  itemFilterModel,
) => {
  let category = itemFilterModel?.getData("category");

  if (!category) {
    category = "all";
  }

  const apiUrl = `/reports/unassigned-items/${category}`;
  return await baseActions.apiGetCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};
