import React, { useContext, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import LoadingDialog from "../common/loading";
import ErrorDialog from "../common/error";
import "./workflows.css";


function Workflow({ project }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loaded: false, fetching: false, data: null, error: null, messages: null, token: null }
  );

  let history = useHistory();

  const handleClick = param => e => {
    e.preventDefault();
    history.push(`/${param}`);
  };

  useEffect(() => {
    setState({ fetching: true });

    async function fetchData() {
      const { getAccessToken } = contextType;
      const accessToken = await getAccessToken();
      setState({ token: accessToken });

      const apiCall = new ApiService("/pipelines", {}, accessToken);
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
            messages: "Error reported accessing list of pipeline workflows."
          });
          console.log(`Error Reported: ${error}`);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="mt-3 max-content-width">
      <h4>Pipelines</h4>
      <p>Configure your <b>C</b>ontinuous <b>I</b>ntegration and <b>C</b>ontinuous <b>D</b>elivery pipeline workflows below.</p>
      {!state.loaded && <LoadingDialog />}

      <h5 className="mt-5">Coming Soon!</h5>

      <div><a href="#" onClick={handleClick("pipeline")}>Access the original CI/CD Pipeline interface, here.</a></div>

    </div>
  );
}

Workflow.propTypes = {
  project: PropTypes.object
};

export default Workflow;
