import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import CardGroup from "react-bootstrap/CardGroup";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import AnchoreSecurityReportTable from "components/blueprint/security_reports/anchore/AnchoreSecurityReportTable";
import IconBase from "components/common/icons/IconBase";

// TODO: Refactor and move to helper function. Make client-based paginator
function chunkData(jsonData, array, size) {
  const chunked_arr = [];
  let index = 0;

  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

// TODO: Refactor further.
function AnchoreSecurityReportOverlay({ anchoreSecurityVulnerabilities, stats }) {
  const toastContext = useContext(DialogToastContext);

  // let completeData = chunkData(anchoreSecurityVulnerabilities, pageSize);

  // Executed every time page number or page size changes
  // useEffect(() => {
  //   getToolLog();
  // }, [currentPage, pageSize]);

  // const getToolLog = async () => {
  //   try {
  //     setLogData(completeData[currentPage - 1]);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // TODO: Convert to next gen data blocks
  const getDataBlocks = () => {
    return (
      <CardGroup className="w-100 d-flex justify-content-center">
        {stats.length > 0 &&
        stats.map(function (item, index) {
          return (
            <div
              key={index}
              className="count-block-card-view ml-1 mr-1 w-50 text-center align-self-center"
              style={{ maxWidth: "150px", height: "150px" }}
            >
              <Card style={{ width: "100%", height: "135px" }}>
                <Card.Body>
                  <Card.Title className="count-block-primary-text" style={{ fontSize: "25px" }}>
                    {item.value}
                  </Card.Title>
                  <Card.Text className={"count-block-subtext mt-2 "}>{item.name}</Card.Text>
                </Card.Body>
                <Card.Text className="w-100 text-muted mb-1">
                  Change: {Math.abs(item.delta)}
                  {item.delta > 0 ? (
                    <IconBase icon={faCaretDown} className={"cell-icon green"} />
                  ) : item.delta < 0 ? (
                    <IconBase icon={faCaretUp} className={"cell-icon red"} />
                  ) : ""}
                </Card.Text>
              </Card>
            </div>
          );
        })}
      </CardGroup>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };


  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Anchore Security Report"}
      titleIcon={faFileCode}
    >
      <div className={"p-3"}>
        {getDataBlocks()}
        <AnchoreSecurityReportTable
          anchoreSecurityVulnerabilities={anchoreSecurityVulnerabilities}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

AnchoreSecurityReportOverlay.propTypes = {
  anchoreSecurityVulnerabilities: PropTypes.array,
  stats: PropTypes.object,
};

export default AnchoreSecurityReportOverlay;
