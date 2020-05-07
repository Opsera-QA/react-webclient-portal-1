// Dashboard Planning Tab, Persona Executives/Managers, Node Ticket AN-164
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveBar } from "@nivo/bar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import config from "./jiraIssuesByPriorityBarChartConfigs";
import "./charts.css";
import InfoDialog from "../../common/info";
import ModalLogs from "../../common/modalLogs";



function JiraIssuesByPriorityBarChart( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
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


  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "jiraIssuesByPriority",
          metric: "bar" 
        }
      ]
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jiraIssuesByPriority : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
  //   return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  } else {    
    console.log(data);
    return (
      <>
        <ModalLogs header="Issues By Project" size="lg" jsonMessage={data.data} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>

          <div className="chart-label-text">Jira: Issues By Project</div>
          {(typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            : 
            <ResponsiveBar
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}
              keys={config.keys}
              indexBy="project"
              margin={config.margin}
              padding={0.3}
              layout={"horizontal"}
              colors={({ id, data }) => data[`${id}_color`]}
              borderColor={{ theme: "background" }}
              colorBy="id"
              defs={config.defs}
              fill={config.fill}
              axisTop={null}
              axisRight={null}
              axisBottom={config.axisBottom}
              axisLeft={config.axisLeft}
              labelSkipWidth={12}
              labelSkipHeight={12}
              enableLabel={false}
              borderRadius={0}
              labelTextColor="inherit:darker(2)"
              animate={true}
              motionStiffness={90}
              borderWidth={2}
              motionDamping={15}
              tooltip={({ indexValue, value, id }) => (
                <div>
                  <strong>  Project: </strong> {indexValue}<br></br>
                  <strong>  Issue Type: </strong> {id}<br></br>
                  <strong>  No. of Issues: </strong> {value}<br></br>
                </div>
              )}
              theme={{
                tooltip: {
                  container: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          }
        </div>
      </>
    );
  }
}
JiraIssuesByPriorityBarChart.propTypes = {
  persona: PropTypes.string
};

export default JiraIssuesByPriorityBarChart;
