import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import { Alert } from "react-bootstrap";
import Moment from "react-moment";
import Modal from "../../common/modal";
import "./logs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";

function ActivityLogView({ persona, searchQuery, filterType }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const urlParams = {
      search: searchQuery,
      filter: filterType
    };
    const apiCall = new ApiService("/analytics/search", urlParams, accessToken);
    const result = await apiCall.get()
      .catch(function (error) {
        setErrors(error.toJSON());
      });

    setLoading(false);
    console.log("Results:", result);
    setData((result && result.data && result.data.hits) ? result.data.hits.hits : []);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
  }, [searchQuery, filterType]);


  if (loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        <MapActivityData data={data} search={searchQuery} filter={filterType} type="secondary" />
      </>
    );
  }
}


const MapActivityData = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const { data, type, search, filter } = props;

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };
  if (typeof data === "undefined" || data.length === 0) {
    return (
      <div style={{ height: "400px" }}>
        <div className="row h-100">
          <div className="col-sm-12 my-auto text-center">
            {search ?
              <div className="h6">No Results found for {search}</div> :
              <div className="h6">Enter a Search Term</div>}
          </div>
        </div>
      </div>
    );
  } else if (filter === "pipeline" && data[0]._source) {
    return (
      <>
        {data.map((item, idx) => (
          <Alert key={idx} variant={type}>
            <div className="row">
              <div className="col">{item._index}: {item._source.message ? item._source.message[0] : null}</div>
              <div className="col text-right"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" date={item._source["@timestamp"]} /></div>
            </div>
            <div className="row mt-1">
              <div className="col">{item._source.data["projectName"]}</div>
              <div className="col">Version: {item._source["@version"]}</div>
              <div className="col">Build: {item._source.data["buildNum"]}
                <FontAwesomeIcon icon={faSearchPlus}
                  className="ml-1"
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleClick(item._source.data); }} /></div>
              <div className="col text-right text-muted">{item._score}</div>
            </div>
          </Alert>
        ))}

        {showModal ? <Modal header="Log Details"
          message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
          button="OK"
          size="lg"
          handleCancelModal={() => setShowModal(false)}
          handleConfirmModal={() => setShowModal(false)} /> : null}
      </>
    );
  } else if (filter === "blueprint") {
    return (
      <>
        {data.map((item, idx) => (
          <Alert key={idx} variant={type}>
            <div className="row">
              <div className="col text-left"><b>Build: </b>{item["build_number"]}
                <FontAwesomeIcon icon={faSearchPlus}
                  className="ml-1"
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleClick(item); }} /></div>
              {item["Release Environment"] ? 
                <div className="col text-center"><b>Environment: </b>{item["Release Environment"]}</div> 
                : "" }
              <div className="col text-right"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" date={item["time"]} /></div>
            </div>
            <div className="row mt-1">
              <div className="col"><b>Message: </b>{item["message"]}</div>
            </div>
            <div className="row mt-1">
              {item["Git Commit ID"] ? 
                <div className="col"><b>Git Commit ID: </b>{item["Git Commit ID"]}</div> 
                : ""}
              <div className="col text-right"><b>Tool: </b>{item["tool"]}</div>
            </div>
          </Alert>
        ))}

        {showModal ? <Modal header="Log Details"
          message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
          button="OK"
          size="lg"
          handleCancelModal={() => setShowModal(false)}
          handleConfirmModal={() => setShowModal(false)} /> : null}
      </>
    );
  }
  else {
    return (
      <>
        {data.map((item, idx) => (
          <Alert key={idx} variant="light">
            {JSON.stringify(item)}
          </Alert>
        ))}
      </>
    );
  }
};

MapActivityData.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string
};

ActivityLogView.propTypes = {
  persona: PropTypes.string,
  searchQuery: PropTypes.string,
  filterType: PropTypes.string
};

export default ActivityLogView;

