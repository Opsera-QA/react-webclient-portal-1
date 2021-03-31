import baseActions from "utils/actionsBase";

const organizationActions = {};

organizationActions.deleteOrganizationV2 = async (getAccessToken, cancelTokenSource, organizationId) => {
  const apiUrl = `/organization/${organizationId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

organizationActions.updateOrganizationV2 = async (getAccessToken, cancelTokenSource, organizationModel) => {
  let postBody = {
    ...organizationModel.getPersistData(),
  };
  const apiUrl = `/organization/${organizationModel.getData("_id")}/update/`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

organizationActions.getAllOrganizationsV2 = async (getAccessToken, cancelTokenSource, status = "active") => {
  const apiUrl = "/organization";
  const urlParams = {
    params: {
      size: 10000,
      status: status,
    },
  };
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

organizationActions.getOrganizationsV2 = async (getAccessToken, cancelTokenSource, organizationFilterDto) => {
  let sortOption = organizationFilterDto?.getData("sortOption");
  let status = organizationFilterDto.getData("status");

  const apiUrl = "/organization";
  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      size: organizationFilterDto?.getData("pageSize"),
      page: organizationFilterDto?.getData("currentPage"),
      status: status ? status.value : undefined,
      search: organizationFilterDto?.getData("search")
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

organizationActions.getOrganizationV2 = async (getAccessToken, cancelTokenSource, organizationId) => {
  const apiUrl = `/organization/${organizationId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

organizationActions.createOrganizationV2 = async (getAccessToken, cancelTokenSource, organizationModel) => {
  let postBody = {
    ...organizationModel.getPersistData(),
  };
  const apiUrl = "/organization/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default organizationActions;