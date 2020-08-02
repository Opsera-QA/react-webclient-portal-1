import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveCalendar } from "@nivo/calendar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import config from "./GitlabTotalCountOfMergeReqAndPushPerDayConfig";
import "./charts.css";
import InfoDialog from "../../common/info";
import ModalLogs from "../../common/modal/modalLogs";

function GitlabTotalCountOfMergeReqAndPushPerDay( { persona, date } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "gitlabTotalCountOfMergeReqAndPushPerDay",
          metric: "calendar" 
        }
      ],
      startDate: date.start,
      endDate: date.end
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);      
      let dataObject = res && res.data ? res.data.data[0].gitlabTotalCountOfMergeReqAndPushPerDay : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }, [contextType, date]);

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
  }, [fetchData]);

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  } else {
    // console.log(data.data);    
    return (
      <>
        <ModalLogs header="Merge Requests, Pushes and Comments" size="lg" jsonMessage={data.data} dataType="line" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>
          <div className="chart-label-text">Merge Requests, Pushes and Comments</div>
          {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            : 
            <ResponsiveCalendar
              data={data ? data.data[0].data : []}
              onClick={() => setShowModal(true)}
              from="2020-05-01"
              to={new Date()}
              emptyColor="#ededed"
              colors={[ "#acd5f2", "#7fa8ca", "#537aa2", "#254e77" ]}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}              
              yearSpacing={40}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              legends={config.legends}
              tooltip={({ day, value, color }) => (
                <div style={{
                                    
                }}>
                  <strong>
                    {day}: {value} Contribution(s)
                  </strong>
                </div>
              )}            
            />          
          }
        </div>
      </>
    );
  }
}

GitlabTotalCountOfMergeReqAndPushPerDay.propTypes = {
  persona: PropTypes.string
};

export default GitlabTotalCountOfMergeReqAndPushPerDay;
