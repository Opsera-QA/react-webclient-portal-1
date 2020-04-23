import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext"; 
import { axiosApiService } from "../../api/apiService";
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import ConfigurationsForm from "./configurationsForm";
import { Row, Col, ListGroup } from "react-bootstrap";
import SummaryChartsView from "./views/summaryChartsView";
import ReliabilityMetricsCharts from "./metrics/reliability/ReliabilityMetricsCharts";
import "./analytics.css";
import "./charts/charts.css";
import SonarLinesToCoverBarChart from "./charts/sonarLinesToCoverBarChart";
import SonarCodeCoverageBarChart from "./charts/sonarCodeCoverageBarChart";
import DeploymentFrequencyLineChart from "./charts/deploymentFrequencyLineChart.jsx";



function Analytics() {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [token, setToken] = useState();
  const [selection, setSelection] = useState("security");
  const [previewRole, setPreviewRole] = useState(false);
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
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
    const { getAccessToken, getIsPreviewRole } = contextType;

    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    const isPreviewRole = await getIsPreviewRole();
    setPreviewRole(isPreviewRole); 
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);     
    }

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

  const handleTabClick = param => e => {
    e.preventDefault();
    setSelection(param);
  };

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

        { previewRole ?  //display work for new (v2) design
          <>
            <div className="p-2">
              <div>
                <SummaryChartsView />
              </div>


              <Row className="mt-3">
                <Col xs lg="2" className="p-2">

                  <ListGroup>
                    <ListGroup.Item className={"pointer " + (selection === "security" ? "active" : "")} onClick={handleTabClick("security")}>Security</ListGroup.Item>
                    <ListGroup.Item className={"pointer " + (selection === "software_development" ? "active" : "")} onClick={handleTabClick("software_development")}>Software Development</ListGroup.Item>
                    <ListGroup.Item className={"pointer " + (selection === "software_testing" ? "active" : "")} onClick={handleTabClick("software_testing")}>Software Testing</ListGroup.Item>
                    <ListGroup.Item className={"pointer " + (selection === "service_operation" ? "active" : "")} onClick={handleTabClick("service_operation")}>Service Operation</ListGroup.Item>                
                  </ListGroup>
          
                </Col>
                <Col md="auto">
                  {/* empty space here */}
                </Col>
                <Col className="p-2 text-center">
                  <ChartView previewRole={previewRole} token={token} selection={selection} persona={null} />
                </Col>
              </Row>
            </div>
          </> : null }

      </div>
    </>
  );
}


function ChartView({ previewRole, token, selection, persona }) {
  useEffect(() => {
  }, [selection, persona]);

  if (selection) {
    switch (selection) {
    case "security":
      return (
        <>
          {/* Wire-up each chart component here, stacking them on top of each other.  Please wrap each individual chart in their own div with "m-2" class providing some margin around it */}
          {/* 
          <div className="m-2">
            <PipelineDashboard persona={persona} />
          </div> */}
          <ReliabilityMetricsCharts />
        </>);
        
    case "software_development":
      return (
        <>
          {/* Wire-up each chart component here, stacking them on top of each other.  Please wrap each individual chart in their own div with "m-2" class providing some margin around it */}
          {/* 
          <div className="m-2">
            <PipelineDashboard persona={persona} />
          </div> */}
          <div className="chart mb-3" style={{ height: "300px" }}>
            <DeploymentFrequencyLineChart persona={persona}/>
          </div>
        </>);
        
    case "software_testing":
      return (
        <>
          {/* Wire-up each chart component here, stacking them on top of each other.  Please wrap each individual chart in their own div with "m-2" class providing some margin around it */}
          {previewRole ? <div className="m-2">
            <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarLinesToCoverBarChart token={token} persona={persona} />
            </div>
          </div> : ""}

          {previewRole ? <div className="m-2">
            <div className="chart mb-3" style={{ height: "300px" }}>
              <SonarCodeCoverageBarChart token={token} persona={persona} />
            </div> 
          </div> : ""}
        </>);

    case "service_operation":
      return (
        <>
          {/* Wire-up each chart component here, stacking them on top of each other.  Please wrap each individual chart in their own div with "m-2" class providing some margin around it */}
          {/* 
          <div className="m-2">
            <PipelineDashboard persona={persona} />
          </div> */}
        </>);

    default:
      return null; 
    }
  }
  
}

ChartView.propTypes = {
  selection: PropTypes.string,
  persona: PropTypes.string
};


export default Analytics;

// THE CODE HERE IS COMMENTED OUT - ITS PART OF THE BREAKOUT ANALYTICS PAGE AND API CALLS FOR THE SAME = NEEDS TO BE WORKED ON POST PHASE 2 ONCE WE HAVE 

// import React, { useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
// import { axiosApiService } from "../../api/apiService";
// import ErrorDialog from "../common/error";
// import LoadingDialog from "../common/loading";
// import ConfigurationsForm from "./configurationsForm";
// import { Row, Col, ListGroup } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCog } from "@fortawesome/free-solid-svg-icons";
// import SonarCodeCategoriesNO_VALUEPieChart from "./charts/sonarCodeCategoriesNO_VALUEPieChart";
// import InfoDialog from "../common/info";
// import JenkinsStatusByJobNameBarChar from "./charts/jenkinsStatusByJobNameBarChart";
// import JenkinsBuildDurationBarChart from "./charts/jenkinsBuildDurationBarChart";
// import JenkinsBuildsByUserBarChart from "./charts/jenkinsBuildsByUserBarChart";


// import "./analytics.css";
// import "./charts/charts.css";


// function Analytics() {
//   const contextType = useContext(AuthContext);
//   const [error, setErrors] = useState();
//   const [profileData, setProfileData] = useState({});
//   const [securityData, setSecurityData] = useState([]);
//   const [pipelineData, setPipelineData] = useState([]);
//   const [testingData, setTestingData] = useState([]);
//   const [loadingProfile, setLoadingProfile] = useState(false);
//   const [token, setToken] = useState();
//   const [loading, setLoading] = useState(false);

//   const getApiData = async () => {
//     setLoading(true);
//     const { getAccessToken } = contextType;
//     const accessToken = await getAccessToken();
//     const securityDataApiCall = "/analytics/dashboard/secops";
//     const pipelineDataApiCall = "/analytics/dashboard/pipeline";
//     const testingDataApiCall = "/analytics/dashboard/testing";
    
//     // await axiosApiService(accessToken).get(securityDataApiCall)
//     //   .then(res => {
//     //     let dataObject = res && res.data ? res.data.data[0] : [];
//     //     setSecurityData(dataObject);
//     //     setLoading(false);
//     //   })
//     //   .catch(err => {
//     //     setErrors(err);
//     //     setLoading(false);
//     //   });

//     await axiosApiService(accessToken).get(pipelineDataApiCall)
//       .then(res => {
//         let dataObject = res && res.data ? res.data.data[0] : [];
//         setPipelineData(dataObject);
//         setLoading(false);
//       })
//       .catch(err => {
//         setErrors(err);
//         setLoading(false);
//       });

//     // await axiosApiService(accessToken).get(testingDataApiCall)
//     //   .then(res => {
//     //     let dataObject = res && res.data ? res.data.data[0] : [];
//     //     setTestingData(dataObject);
//     //     setLoading(false);
//     //   })
//     //   .catch(err => {
//     //     setErrors(err);
//     //     setLoading(false);
//     //   });
//   };

//   useEffect( () => {
//     getApiData();
//   }, []);
  
//   useEffect(() => {    
//     const controller = new AbortController();
//     const runEffect = async () => {
//       try {
//         console.log("FETCHING DATA");
//         await fetchData();        
//       } catch (err) {
//         if (err.name === "AbortError") {
//           console.log("Request was canceled via controller.abort");
//           return;
//         }        
//       }
//     };
//     runEffect();
//     return () => {
//       controller.abort();
//     };
//   }, []);

//   async function fetchData() {
//     setLoadingProfile(true);
//     const { getAccessToken } = contextType;
//     const accessToken = await getAccessToken();
//     const apiUrl = "/analytics/settings";   
//     setToken(accessToken);
//     try {
//       const profile = await axiosApiService(accessToken).get(apiUrl);      
//       console.log("Profile: ", profile);
//       setProfileData(profile && profile.data.profile[0]);
//       console.log(profile && profile.data.profile[0]);

//       if (typeof(profileData.profile) === "object" && profileData.profile.length === 0) {
//         setErrors("Warning!  Profile settings associated with your account are incomplete.  Log searching will be unavailable until this is fixed.");
//       }

//       setLoadingProfile(false);
//     }
//     catch (err) {
//       console.log(err.message);
//       setLoadingProfile(false);
//       setErrors(err.message);
//     }
//   }

//   if (loading || Object.keys(pipelineData).length == 0) {
//     // return (<LoadingDialog size="lg" />);
//     // TEMPORARY: NOT ACTUAL LOADING DIALOG
//     return (<div className="mt-3">
//       <div className="max-content-width">
//         <h4>Analytics</h4>
//         <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available 
//      logging, reports and configurations around the OpsERA Analytics Platform or search your 
//     currently configured logs repositories below.</p>
//       </div>
//       <div className="p-2 mt-1 max-content-width mb-2">
//         <ConfigurationsForm settings={profileData} token={token} />
//       </div></div>);
//   } 
//   // else if (error) {
//   //   return (<ErrorDialog  error={error} />);
//   // // } else if (data === undefined || Object.keys(data).length == 0 || Object.values(data).every(element => Object.keys(element.data[0]).length === 0)) {
//   // //   return (
//   //   // <InfoDialog  message="No log activity has been captured for this dashboard yet." />
//   //   // );
//   // } else {
//   //   return (
//   //     <>
//   //       {loadingProfile ? <LoadingDialog size="lg" /> : null }
//   //       {error ? <ErrorDialog error={error} /> : null}
  
//   //       <div className="mt-3">
//   //         <div className="max-content-width">
//   //           <h4>Analytics</h4>
//   //           <p>OpsERA provides users with access to a vast repository of logging and analytics.  Access all available 
//   //          logging, reports and configurations around the OpsERA Analytics Platform or search your 
//   //         currently configured logs repositories below.</p>
//   //         </div>
//   //         <div className="p-2 mt-1 max-content-width mb-2">
//   //           <ConfigurationsForm settings={profileData} token={token} />
//   //         </div>
  
//   //         <div className="p-2">
  
//   //           { (loading || pipelineData === undefined || Object.keys(pipelineData).length == 0 || Object.values(pipelineData).every(element => Object.keys(element.data[0]).length === 0)) ? 
//   //             // (<LoadingDialog size="lg" />)
//   //             (<InfoDialog  message="No log activity has been captured for this dashboard yet." />)
//   //             : 
//   //             <>
//   //               {/* <div className="max-content-width">
//   //                 <Row className="mt-3 ">
//   //                   <Col className="chart" style={{ height: "300px" }}><JenkinsBuildDurationBarChart data={pipelineData} persona="Developer" /></Col>
//   //                   <Col md="auto">
                      
//   //                   </Col>
//   //                   <Col className="chart" style={{ height: "300px" }}><JenkinsStatusByJobNameBarChar data={pipelineData} persona="Developer" /></Col>
//   //                 </Row>
//   //                 <Row className="mt-4 ">
//   //                   <Col className="chart" style={{ height: "300px" }}><JenkinsBuildsByUserBarChart data={pipelineData} persona="Developer" /></Col>
//   //                   <Col md="auto">
                      
//   //                   </Col>
//   //                   <Col className="chart" style={{ height: "300px" }}><JenkinsBuildDurationBarChart data={pipelineData} persona="Developer" /></Col>
//   //                 </Row>
//   //               </div>  
//   //               <div className="h5 mt-4">Select KPI to view: </div>
//   //               <Row className="mt-1 max-content-width">
//   //                 <Col xs lg="2" className="p-2">
  
//   //                   <ListGroup className="pt-3">
//   //                     <ListGroup.Item action onClick={console.log("clicked")} active >Jenkins: Build Status by Job Name</ListGroup.Item>
//   //                     <ListGroup.Item action onClick={console.log("clicked")}>Jenkins: Average Build Duration</ListGroup.Item>
//   //                     <ListGroup.Item action onClick={console.log("clicked")}>Jenkins: Builds By User</ListGroup.Item>
//   //                     <ListGroup.Item action onClick={console.log("clicked")}>Sonar: Code Scan Categories</ListGroup.Item>
//   //                     <ListGroup.Item action onClick={console.log("clicked")}>XUnit: Average Test Duration</ListGroup.Item>
//   //                   </ListGroup>
                
            
//   //                 </Col>
//   //                 <Col md="auto">
                    
//   //                 </Col>
  
//   //                 <Col className="mt-4 text-center chart" style={{ height: "315px" }}>
//   //                   <JenkinsStatusByJobNameBarChar className="chart" data={pipelineData} persona="Developer"/>
//   //                 </Col>
  
//   //               </Row> */}
//   //             </>
//   //           }
//   //         </div>
//   //       </div>
//   //     </>
//   //   );
//   // }


// }


// export default Analytics;