import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import { Alert, Button } from "react-bootstrap";
// import { format } from "date-fns";
import Modal from "../../common/modal/modal";
import "./logs.css";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
// import { faCalendar, faDraftingCompass, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";

function OpseraPipelineStatusFailed({ persona, date }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError")
          //console.log("Request was canceled via controller.abort");
          return;
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
          request: "opseraPipelineInfoFailed",
          metric: "bar",
        },
      ],
      startDate: date.start,
      endDate: date.end,
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].opseraPipelineInfoFailed.data : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };

  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  if (typeof data === "undefined" || data.length === 0) return "";
  if (data.length > 0 && Object.keys(data[0]).length === 0) return "";
  return (
    <>
      <div className="activity-label-text mb-2">Recent Failed OpsERA Pipelines</div>
      <MapActivityData data={data} className="mr-3 ml-3 p-4" />
    </>
  );
}

const MapActivityData = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const { data, type } = props;
  const history = useHistory();

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  const goToPipeline = (item) => {
    history.push(`/workflow/details/${item}/summary`);
  };

  if (typeof data === "undefined" || data.length === 0) return "";

  return (
    <>
      {data.map((item, idx) => (
        <Alert key={idx} variant={item.status === "failure" ? "danger" : item.status}>
          <div className="row">
            {item.name !== "N/A" ? (
              <div className="col">
                <strong> Pipeline: </strong> {item.pipeline_name}{" "}
              </div>
            ) : (
              ""
            )}
            <div
              className="col"
              style={{
                textAlign: "right",
              }}
            >
              <strong></strong>
              {item.timestamp}
            </div>
            {/* <Button variant="outline-dark mr-3" size="sm" onClick={() => { goToPipeline(item.pipeline_id); }}><FontAwesomeIcon icon={faDraftingCompass} fixedWidth/>View Pipeline</Button> */}
          </div>
          <div className="row">
            <div className="col">
              <strong> Pipeline ID: </strong>
              {item.pipeline_id}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <strong> Duration: </strong>
              {item.duration} Minutes
            </div>
          </div>
          <div className="row">
            {/* <div className="col">Version: {item["version"]}</div> */}
            <div className="col">
              <strong> Run Count: </strong> {item.run_count}
              <IconBase
                icon={faSearchPlus}
                iconSize={"xs"}
                className={"ml-1 pointer"}
                onClickFunction={() => {
                  handleClick(item);
                }}
              />
            </div>
          </div>
          {item.CpuUsage && (
            <div className="row">
              <div className="col">
                <strong> CPU Usage: </strong>
                {item.CpuUsage}%
              </div>
            </div>
          )}
        </Alert>
      ))}

      {showModal ? (
        <Modal
          header="Log Details"
          message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
          button="OK"
          size="lg"
          handleCancelModal={() => setShowModal(false)}
          handleConfirmModal={() => setShowModal(false)}
        />
      ) : null}
    </>
  );
};

MapActivityData.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
};

OpseraPipelineStatusFailed.propTypes = {
  persona: PropTypes.string,
  searchQuery: PropTypes.string,
  filterType: PropTypes.string,
  date: PropTypes.object
};

export default OpseraPipelineStatusFailed;
