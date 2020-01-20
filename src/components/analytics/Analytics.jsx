import React, {useContext, useReducer, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import ConfigurationsForm from "./configurationsForm";

/**
 * Demo of a React Function with hooks (to replace Class Components)
 *
 * @param {*} { tool }  Tools is a PROP passed into this React Component Function, not used initially but is there as a demo
 */

function Analytics() {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {loaded: false, fetching: false, data: null, error: null, messages: null}
  );

  useEffect(() => {
    setState({fetching: true});

    async function fetchData() {
      const { getAccessToken } = contextType;
      const accessToken = await getAccessToken();
      
      const apiCall = new ApiService("/analytics/settings", {}, accessToken);  
      apiCall.get()
        .then(function (response) {
          console.log(response);

          //TODO: REMOVE TEST DATA
          let test = {
            dataUsage: "1000",
            enabledTools: [{Jenkins: true, JUnit: false, JMeter: true, Selenium: false}],
            active: false
          };

          setState({
            data: test, // response.data,
            fetching: false,
            error: null,
            loaded: true
          }); 
        })
        .catch(function (error) {
          setState({
            fetching: false,
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

      { state.error ? <ErrorDialog error={state.error} /> : null }
      <div className="p-2 mt-4">
        <ConfigurationsForm settings={ state.data } />
      </div>

      <div style={{"color": "gray"}}>DATA: {state.data ? JSON.stringify(state.data) : null}</div>
    </div>
  );
}

Analytics.propTypes = {
  tools: PropTypes.object
};

export default Analytics;
