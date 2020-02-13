/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect, useContext } from "react";
import PropTypes from "prop-types";
//import { CardGroup, Card, Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { ApiService } from "../../api/apiService";
//import LoadingDialog from "../common/loading";
//import ErrorDialog from "../common/error";

function BuildCounts({ settings }) {
  const contextType = useContext(AuthContext);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { message: null, detail: null, statusCode: null }
  );
  

  const getApiData = async () => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/users/get-users", {}, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        // console.log(response.data)
        currentComponent.setState({
          data: response.data,
          error: null,
          fetching: false
        });
      })
      .catch(function (error) {
        currentComponent.setState({
          error: error,
          fetching: false
        });
      });
  };

  useEffect( () => {
    if (settings) {
      if ("active" in settings) {
        setState({ data: settings });  
      } 
    }
  }, [settings]);

  return (
    <div>
      <div className="element-box p-3 text-center">
        <blockquote className="blockquote mb-0 ">
          <div className="box-metric">125</div>
          <footer className="blockquote">
            <small className="text-muted">
              Successful Builds
            </small>
          </footer>
        </blockquote>
      </div>
      
      <div className="element-box p-3 mt-3 text-center">
        <blockquote className="blockquote mb-0 ">
          <div className="box-metric">12</div>
          <footer className="blockquote">
            <small className="text-muted">
            Failed Builds
            </small>
          </footer>
        </blockquote>
      </div>

      <div className="element-box p-3 mt-3 text-center">
        <blockquote className="blockquote mb-0 ">
          <div className="box-metric">4</div>
          <footer className="blockquote">
            <small className="text-muted">
            Active Pipelines
            </small>
          </footer>
        </blockquote>
      </div>
    </div>
  );

}

BuildCounts.propTypes = {
  settings: PropTypes.object
};


export default BuildCounts;
