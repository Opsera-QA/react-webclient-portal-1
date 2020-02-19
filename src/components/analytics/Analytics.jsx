import React, { useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import ConfigurationsForm from "./configurationsForm";
import "./analytics.css";
import "./charts/charts.css";
import DemoLogView from "./logs/demoLogView";


function Analytics() {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loaded: false, fetching: false, data: null, error: null, messages: null, token: null }
  );

  useEffect(() => {
    setState({ fetching: true });

    async function fetchData() {
      const { getAccessToken } = contextType;
      const accessToken = await getAccessToken();
      setState({ token: accessToken });

      const apiCall = new ApiService("/analytics/settings", {}, accessToken);
      apiCall.get()
        .then(function (response) {
          //console.log(response);
          setState({
            data: response.data[0],
            fetching: false,
            error: null,
            loaded: true
          });
        })
        .catch(function (error) {
          setState({
            fetching: false,
            loaded: true,
            error: error,
            messages: "Error reported accessing list of tools."
          });
          console.log(`Error Reported: ${error}`);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="mt-3 max-content-width">
      <h4>Analytics</h4>
      <p>Access all available logging, reports and configurations around the OpsERA Analytics Platform.  
        Update your settings or configure your profile and logging tools in the settings below.</p>
      {!state.loaded && <LoadingDialog />}

      <div className="p-2 mt-1">
        {state.error && <ErrorDialog error={state.error} />}
        <ConfigurationsForm settings={state.data} token={state.token} />
      </div>

      {/* TODO Move this into a secondar "tabbed view" */}
      <div className="m-2">
        <DemoLogView />
      </div>

    </div>
  );
}

Analytics.propTypes = {
  tools: PropTypes.object
};

export default Analytics;
