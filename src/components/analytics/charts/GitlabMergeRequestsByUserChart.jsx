import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveBar } from "@nivo/bar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import config from "./GitlabMergeRequestsByUserChartConfig";
import "./charts.css";
import InfoDialog from "../../common/info";
import ModalLogs from "../../common/modal/modalLogs";

function GitlabMergeRequestsByUser( { persona, date } ) {
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
  }, [date]);

  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "gitlabMergeRequestsByUser",
          metric: "bar" 
        }
      ],
      startDate: date.start, 
      endDate: date.end
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].gitlabMergeRequestsByUser : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };

  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);  
  } else {    
    return (
      <>
        <ModalLogs header="Merge Requests by User" size="lg" jsonMessage={data.data} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>

          <div className="chart-label-text">Merge Requests by User</div>
          {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            : 
            <ResponsiveBar
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}
              keys={config.keys}
              indexBy="user"
              margin={config.margin}
              padding={0.3}
              layout={"horizontal"}
              colors={{ scheme: "category10" }}
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
              borderRadius={5}
              labelTextColor="inherit:darker(2)"
              animate={true}
              motionStiffness={90}
              borderWidth={2}
              motionDamping={15}
              legends={config.legends}
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

GitlabMergeRequestsByUser.propTypes = {
  persona: PropTypes.string
};

export default GitlabMergeRequestsByUser;