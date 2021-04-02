import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import "./charts.css";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";
import { defaultConfig, gradationalColors } from "../../insights/charts/charts-views";

function GitlabTotalCommitsByUserAndDate({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";
    const postBody = {
      data: [
        {
          request: "gitlabTotalCommitsByUserAndDate",
          metric: "calendar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].gitlabTotalCommitsByUserAndDate : [];
      var usersList = Object.keys(dataObject.data[0]);
      usersList = usersList.filter((value) => value != "date");
      setUsers(usersList);
      setData(dataObject);
      setLoading(false);
    } catch (err) {
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
        if (err.name === "AbortError") return;
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
        header="Commits by Authors"
        size="lg"
        jsonMessage={data.data}
        dataType="line"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Commits by Authors</div>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveHeatMap
            {...defaultConfig("Date", "", true, true, "yearMonthDate", "cutoffString")}
            data={data ? data.data : []}
            keys={users}
            indexBy="date"
            onClick={() => setShowModal(true)}
            forceSquare={true}
            margin={{
              top: 10,
              right: 40,
              bottom: 60,
              left: 40
            }}
            cellOpacity={1}
            cellBorderColor={{ from: "color", modifiers: [["darker", 0.4]] }}
            labelTextColor="white"
            colors={gradationalColors}
            cellShape={"circle"}
            enableLabels={true}
            hoverTarget="cell"
            cellHoverOthersOpacity={0.25}
          />
        )}
      </div>
    </>
  );
}

GitlabTotalCommitsByUserAndDate.propTypes = {
  persona: PropTypes.string,
  date: PropTypes.object
};

export default GitlabTotalCommitsByUserAndDate;
