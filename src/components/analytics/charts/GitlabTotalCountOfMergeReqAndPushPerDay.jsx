import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveCalendar } from "@nivo/calendar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, gradationalColors } from "../../insights/charts/charts-views";
import ChartTooltip from "../../insights/charts/ChartTooltip";

function GitlabTotalCountOfMergeReqAndPushPerDay({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const today = new Date();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "gitlabTotalCountOfMergeReqAndPushPerDay",
          metric: "calendar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].gitlabTotalCountOfMergeReqAndPushPerDay : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
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
          return;
        }
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;

  return (
    <>
      <ModalLogs
        header="Merge Requests, Pushes and Comments"
        size="lg"
        jsonMessage={data.data}
        dataType="line"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Merge Requests, Pushes and Comments</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveCalendar
            {...defaultConfig("", "", false, false, "", "", true)}
            data={data ? data.data[0].data : []}
            onClick={() => setShowModal(true)}
            from="2020-05-01"
            to={today}
            emptyColor="#ededed"
            colors={gradationalColors}
            yearSpacing={40}
            monthBorderColor="white"
            dayBorderWidth={2}
            dayBorderColor="white"
            margin={{
              top: 30,
              right: 40,
              bottom: 30,
              left: 40
            }}
            tooltip={({ day, value, color }) => <ChartTooltip 
                                          titles = {[day]}
                                          values = {[`${value || 0} contribution(s)`]}
                                          style = {false}
                                          color = {color} />}
          />
        )}
      </div>
    </>
  );
}

GitlabTotalCountOfMergeReqAndPushPerDay.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default GitlabTotalCountOfMergeReqAndPushPerDay;
