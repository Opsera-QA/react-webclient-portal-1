import baseActions from "utils/actionsBase";

const chartsActions = {};

chartsActions.getChart = async (request, metric, date, getAccessToken) => {
  const apiUrl = "/analytics/data";

  const postBody = {
    data: [
      {
        request: request,
        metric: metric
      }
    ],
    startDate: date.start,
    endDate: date.end
  };

  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody)
};

export default chartsActions;