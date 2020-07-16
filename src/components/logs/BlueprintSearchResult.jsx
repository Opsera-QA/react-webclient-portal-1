import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import ModalLogs from "components/common/modalLogs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

function BlueprintSearchResult({ searchResults }) {
  console.log(searchResults);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  return (   
    <>
      {searchResults.length > 0 ?
        <div className="mb-1 mt-3 bordered-content-block p-3 max-content-width"> 
          <div>
            
            {searchResults.map((item, idx) => (
              
              <div key={idx} className="console-text-invert">
                <h3>Build: {item["full_name"]}</h3>
                <b>Timestamp: {format(new Date(item["build_timestamp"]), "yyyy-MM-dd', 'hh:mm a")}</b>
                <div>
                  <FontAwesomeIcon icon={faSearchPlus}
                    className="ml-1"
                    size="lg"
                    style={{ cursor: "pointer", float: "right" }}
                    onClick= {() => { handleClick(item); }} />
                </div>
                <br></br>
                {item["log"]}
              </div>
            ))}

            {/* <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
        {searchResults.length > 0 ? <thead>
          <tr>
            <th style={{ width: "5%" }}>Build</th>
            <th style={{ width: "5%" }}>Environment</th>
            <th style={{ width: "20%" }}>Date</th>
            <th style={{ width: "10%" }}>Tool</th>
            <th style={{ width: "30%" }}>Message</th>
            <th style={{ width: "25%" }}>Git Commit ID</th>
            <th style={{ width: "5%" }}>Status</th>
          </tr>
        </thead> : ""}
        <tbody>
          {searchResults.map((item, idx) => (
            <tr key={idx} >
              <td>{item["build_number"]}
                <FontAwesomeIcon icon={faSearchPlus}
                  className="ml-1"
                  size="xs"
                  style={{ cursor: "pointer" }}
                  onClick= {() => { handleClick(item); }} /></td>
              <td className="force-text-wrap upper-case-all">{item["Release Environment"]}</td> 
              <td>{format(new Date(item["time"]), "yyyy-MM-dd', 'hh:mm a")}</td>                
              <td className="upper-case-first">{item["tool"]}</td>
              <td className="force-text-wrap">{item["message"]}</td>
              <td className="force-text-wrap">{item["Git Commit ID"]}</td>
              <td className="upper-case-all">{item["status"]}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
          </div>
        </div>  : ""}
      <ModalLogs header={"Build: " + modalMessage.full_name} size="lg" jsonMessage={modalMessage} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
    </>
  );
}

BlueprintSearchResult.propTypes = {
  searchResults: PropTypes.array
};


export default BlueprintSearchResult;