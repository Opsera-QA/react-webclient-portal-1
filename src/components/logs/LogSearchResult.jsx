import React, { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import IconBase from "components/common/icons/IconBase";
import TextHighlighter from "components/common/highlighter/TextHighlighter";
import { hasStringValue } from "components/common/helpers/string-helpers";

function LogSearchResult({ searchResults, submittedSearchTerm, getPaginator }) {
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

  const getHighlighterText = (item) => {
    const thisStringItem = JSON.stringify(item, null, 2);

    if (hasStringValue(thisStringItem) === false) {
      return "";
    }

    const lastIndex = thisStringItem.lastIndexOf(submittedSearchTerm);

    if (lastIndex === -1) {
      return thisStringItem;
    }

    const startIndex = Math.max(lastIndex - 500, 0);
    const endStartIndex = lastIndex + submittedSearchTerm.length;
    const endIndex = Math.min(endStartIndex + 500, thisStringItem.length - 1);

    return thisStringItem.substring(startIndex, endIndex);
  };

  return (
    <>
      {searchResults.map((item, idx) => (
        <div key={idx}>
          <Alert>
            <div className="row mb-3">
              <IconBase
                icon={faSearchPlus}
                iconClassName="mt-1"
                iconSize="sm"
                iconStyling={{ cursor: "pointer", alignItems: "flex-end" }}
                onClickFunction={() => {
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
              <TextHighlighter
                textToHighlight={submittedSearchTerm}
                text={getHighlighterText(item)}
              />
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
      {getPaginator()}
    </>
  );
}

LogSearchResult.propTypes = {
  searchResults: PropTypes.array,
  submittedSearchTerm: PropTypes.string,
  getPaginator: PropTypes.func,
};

export default LogSearchResult;
