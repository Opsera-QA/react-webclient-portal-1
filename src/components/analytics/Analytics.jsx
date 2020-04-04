import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import ConfigurationsForm from "./configurationsForm";
import { Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./analytics.css";
import "./charts/charts.css";


function Analytics() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [token, setToken] = useState();
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        console.log("FETCHING DATA");
        await fetchData();        
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, []);


  async function fetchData() {
    setLoadingProfile(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/settings";   
    setToken(accessToken);
    try {
      const profile = await axiosApiService(accessToken).get(apiUrl);      
      console.log("Profile: ", profile);
      setData(profile && profile.data.profile[0]);
      console.log(profile && profile.data.profile[0]);

      if (typeof(data.profile) === "object" && data.profile.length === 0) {
        setErrors("Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed.");
      }

      setLoadingProfile(false);
    }
    catch (err) {
      console.log(err.message);
      setLoadingProfile(false);
      setErrors(err.message);
    }
  }

  return (
    <>
      {loadingProfile ? <LoadingDialog size="lg" /> : null }
      {error ? <ErrorDialog error={error} /> : null}

      <div className="mt-3">
        <div className="max-content-width">
          <h4>Analytics</h4>
          <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available 
         logging, reports and configurations around the OpsERA Analytics Platform or search your 
        currently configured logs repositories below.</p>
        </div>
        <div className="p-2 mt-1 max-content-width mb-4">
          <ConfigurationsForm settings={data} token={token} />
        </div>

        <div className="p-2">
          <div>
              TODO: Add a new UI here in place of searches!  This should follow a UI that has the layout below:
          </div>

          <Row className="mt-3">
            <Col>Layout the top 4 charts here that we show by default on dashboard</Col>
            <Col className="text-center">chart 2</Col>
          </Row>

          <Row className="mt-3">
            <Col className="text-center">chart 3</Col>
            <Col className="text-center">chart 4</Col>
          </Row>

          <Row className="mt-3">
            <Col xs lg="2" className="p-2">List of chart KPI's.  This list should match the KPI's in the release docs and 
          clicking on one should load the related charts in the column to the right.  Please work with Todd 
          on how we are going to flag a chart mapping to KPI.

            <ListGroup>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          
            </Col>
            <Col md="auto">
              {/* empty space here */}
            </Col>
            <Col className="p-2 text-center">
            chart content, listed vertically.  This area shows charts that match the selection on the left.
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}


export default Analytics;
