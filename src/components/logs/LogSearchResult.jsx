import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import ModalLogs from "components/common/modalLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const Highlight = require("react-highlighter");

function LogSearchResult({ searchResults, submittedSearchTerm }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleClick = (param) => {
    // ONLY FOR DEMO PURPOSES - REMOVE AFTER DEMO - START HERE
    // if (param._source && param._source.data && param._source.data.tool_output) {
    //   try {
    //     param._source.data.tool_output = param._source.data.tool_output.join("\n");
    //   } catch {
    //     console.log("Ignoring Parser");
    //   }
    // }
    // ONLY FOR DEMO PURPOSES - REMOVE AFTER DEMO - END HERE
    setModalMessage(param);
    setShowModal(true);
  };

  const handleHighlightText = (item) => {
    var thisStringItem = JSON.stringify(item, null, 2);
    return thisStringItem.substring(
      thisStringItem.lastIndexOf(submittedSearchTerm) - 500,
      thisStringItem.lastIndexOf(submittedSearchTerm) + 500
    );
  };

  return (
    <>
      {searchResults.map((item, idx) => (
        <div key={idx}>
          <Alert>
            <div className="row mb-3">
              <FontAwesomeIcon
                icon={faSearchPlus}
                className="mt-1"
                size="sm"
                style={{ cursor: "pointer", alignItems: "flex-end" }}
                onClick={() => {
                  handleClick(item);
                }}
              />
              <strong className="ml-2">
                {format(
                  new Date(typeof item._source["@timestamp"] !== "undefined" ? item._source["@timestamp"] : null),
                  "yyyy-MM-dd', 'hh:mm a"
                )}
              </strong>
              {item._source.data ? (
                <strong className="ml-4">
                  {typeof item._source.data.buildVariables !== "undefined"
                    ? "Job Name: " + item._source.data.buildVariables.JOB_NAME
                    : ""}
                </strong>
              ) : (
                ""
              )}
              {item._source.data ? (
                <strong className="ml-4">
                  {typeof item._source.data.buildNum !== "undefined"
                    ? "Build Number: " + item._source.data.buildNum
                    : ""}
                </strong>
              ) : (
                ""
              )}
            </div>
            <div className="row ml-2" style={{ lineHeight: 2 }}>
              <Highlight matchClass="react-highlighter-yellow" search={submittedSearchTerm}>
                {/* {JSON.stringify(item, null, 2).substring(0, 1000)}*/}
                {handleHighlightText(item)}
              </Highlight>
            </div>
          </Alert>
          <hr style={{ color: "#E5E7E9", backgroundColor: "#E5E7E9", borderColor: "#E5E7E9" }} />
        </div>
      ))}
      <ModalLogs
        header={modalMessage._index}
        size="lg"
        jsonMessage={modalMessage}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

LogSearchResult.propTypes = {
  searchResults: PropTypes.array,
  submittedSearchTerm: PropTypes.string,
};

export default LogSearchResult;
