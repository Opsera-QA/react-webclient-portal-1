import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import CustomTable from "../common/table/CustomTable";
import Card from "react-bootstrap/Card";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardGroup from "react-bootstrap/CardGroup";

// TODO: Refactor
function ModalTable({ header, column_data, size, jsonData, stats, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);
  const [dataView, setDataView] = useState(jsonData);
  const noDataMessage = "No Data is available for this chart at this time";
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(0);
  const [logData, setLogData] = useState([]);
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "severity",
        desc: true,
      },
      {
        id: "cvss_base",
        desc: true,
      },
      {
        id: "cvss_exploitability_score",
        desc: true,
      },
      {
        id: "cvss_impact_score",
        desc: true,
      },
    ],
  };

  function chunk(array, size) {
    const chunked_arr = [];
    let index = 0;
    while (index < jsonData.length) {
      chunked_arr.push(array.slice(index, size + index));
      index += size;
    }
    return chunked_arr;
  }

  let completeData = chunk(jsonData, pageSize);
  useEffect(() => {
    setShowModal(show);
    if (jsonData !== undefined) {
      const new_obj = jsonData;
      setDataView(new_obj);
    }
  }, [jsonData, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility();
  };

  const columns = useMemo(() => column_data, [column_data]);

  // Executed every time page number or page size changes
  useEffect(() => {
    getToolLog();
  }, [currentPage, pageSize]);

  const getToolLog = async () => {
    try {
      setLogData(completeData[currentPage - 1]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getPaginationOptions = () => {
    return {
      pageSize: pageSize,
      totalCount: jsonData.length,
      currentPage: currentPage,
      gotoPageFn: gotoPage,
    };
  };

  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  return (
    <>
      <Modal show={showModal} size={size} style={{width:"100%"}} aria-labelledby="contained-modal-title-vcenter"
 onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <div className="m-3">
            <CustomTable
              columns={columns}
              data={logData}
              noDataMessage={noDataMessage}
              initialState={initialState}
              paginationOptions={getPaginationOptions()}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalTable.propTypes = {
  header: PropTypes.string,
  size: PropTypes.string,
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func,
  column_data: PropTypes.any,
  jsonData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  stats: PropTypes.object
};

export default ModalTable;
