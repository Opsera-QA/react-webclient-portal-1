import React, { useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import ConfigurationsForm from "./configurationsForm";

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
          console.log(response);

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
    <div>
      <h3>Analytics Dashboard</h3>

      { !state.loaded && <LoadingDialog />}

      <div className="p-2 mt-1">
        { state.error && <ErrorDialog error={state.error} /> }
        <ConfigurationsForm settings={ state.data } token={ state.token } />
      </div>

    </div>
  );
}

Analytics.propTypes = {
  tools: PropTypes.object
};

export default Analytics;
