import React, {useContext} from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardGroup from "react-bootstrap/CardGroup";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import TwistlockSecurityReportTable from "components/blueprint/security_reports/twistlock/TwistlockSecurityReportTable";

// TODO: Refactor
function TwistlockSecurityReportOverlay({ twistlockSecurityReportVulnerabilities, stats }) {
  const toastContext = useContext(DialogToastContext);

  // function chunk(array, size) {
  //   const chunked_arr = [];
  //   let index = 0;
  //   while (index < jsonData.length) {
  //     chunked_arr.push(array.slice(index, size + index));
  //     index += size;
  //   }
  //   return chunked_arr;
  // }
  //
  // let completeData = chunk(jsonData, pageSize);
  // useEffect(() => {
  //   if (jsonData !== undefined) {
  //     const new_obj = jsonData;
  //     setDataView(new_obj);
  //   }
  // }, [jsonData]);
  //
  // const handleClose = () => {
  //   setShowModal(false);
  // };

  // Executed every time page number or page size changes
  // useEffect(() => {
  //   getToolLog();
  // }, [currentPage, pageSize]);
  //
  // const getToolLog = async () => {
  //   try {
  //     setLogData(completeData[currentPage - 1]);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // TODO: Make actual data blocks, do defensive programming
  const getDataBlocks = () => {
    return (
      <div>
        <CardGroup className="w-100 d-flex justify-content-center">
          {stats.twistlockVulnerabilityStats.length > 0 &&
          stats.twistlockVulnerabilityStats.map(function (item, index) {
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
                      <FontAwesomeIcon icon={faCaretDown} className="cell-icon green" fixedWidth />
                    ) : item.delta < 0 ? (
                      <FontAwesomeIcon icon={faCaretUp} className="cell-icon red" fixedWidth />
                    ) : ""}
                  </Card.Text>
                </Card>
              </div>
            );
          })}
        </CardGroup>
        <CardGroup className="w-100 d-flex justify-content-center">
          {stats.twistlockComplianceIssueStats.length > 0 &&
          stats.twistlockComplianceIssueStats.map(function (item, index) {
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
                      <FontAwesomeIcon icon={faCaretDown} className="cell-icon green" fixedWidth />
                    ) : item.delta < 0 ? (
                      <FontAwesomeIcon icon={faCaretUp} className="cell-icon red" fixedWidth />
                    ) : ""}
                  </Card.Text>
                </Card>
              </div>
            );
          })}
        </CardGroup>
      </div>
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
      titleText={"Twistlock Security Report"}
      titleIcon={faFileCode}
    >
      <div className={"p-3"}>
        {getDataBlocks()}
        <TwistlockSecurityReportTable
          twistlockSecurityReportVulnerabilities={twistlockSecurityReportVulnerabilities}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

TwistlockSecurityReportOverlay.propTypes = {
  twistlockSecurityReportVulnerabilities: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  stats: PropTypes.object
};

export default TwistlockSecurityReportOverlay;
