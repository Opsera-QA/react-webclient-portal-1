import React, {useContext, useReducer, useEffect} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import WorkflowType from "./workflowType";
import EnableTools from "./enableTools";

/**
 * Demo of a React Function with hooks (to replace Class Components)
 *
 * @param {*} { tool }  Tools is a PROP passed into this React Component Function, not used initially but is there as a demo
 */

function Analytics({ tools }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {loaded: false, fetching: false, data: null, error: null, messages: null}
  );

  useEffect(async() => {
    setState({fetching: true});
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    
    const apiCall = new ApiService("/users/tools", {}, accessToken);
    apiCall.get()
      .then(function (response) {
      /* const tool = response.tools.find(tool => {    //api not working timeout error hope this works!
        return tool.name === TOOL_NAME;
      }); */
        console.log(response);
        
        setState({
          data: response.data,
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

  }, [tools]); //tools in this form (and any other props) tells the useEffect hook to refresh/reload when those values change. (basically setting watchers)
  return (
    <div>
      <h3>Analytics Dashboard</h3>

      { state.error ? <ErrorDialog error={state.error} /> : null }
      <div className="p-2 mt-4">
        <WorkflowType />
        <EnableTools />
      </div>

      <div style={{"color": "gray"}}>DATA: {state.data ? state.data[0].email : null}</div>
    </div>
  );
}

Analytics.propTypes = {
  tools: PropTypes.object
};

export default Analytics;
