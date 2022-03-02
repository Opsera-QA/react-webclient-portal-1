import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { faSearchPlus } from "@fortawesome/pro-light-svg-icons";
import { format } from "date-fns";
import InfoDialog from "components/common/status_notifications/info";
import IconBase from "components/common/icons/IconBase";

function BlueprintSearchResult({ searchResults }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  if (searchResults.length === 0) {
    return <InfoDialog message="No results found."/>;
  }

  return (
    <div>
      {searchResults.map((item, idx) => (

        <div key={idx} className="console-text-invert bordered-content-block p-3">
          <div>
            <IconBase
              icon={faSearchPlus}
              className={"ml-1"}
              iconSize={"lg"}
              iconStyling={{cursor: "pointer", float: "right"}}
              onClickFunction={() => {
                handleClick(item);
              }}/>
          </div>
          <h3>Build: {item["full_name"]}</h3>
          <b>Timestamp: {format(new Date(item["build_timestamp"]), "yyyy-MM-dd', 'hh:mm a")}</b>
          <br />
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
      <ModalLogs header={"Build: " + modalMessage.full_name} size="lg" jsonMessage={modalMessage} dataType="bar"
                 show={showModal} setParentVisibility={setShowModal}/>
    </div>
  );
}

BlueprintSearchResult.propTypes = {
  searchResults: PropTypes.array
};


export default BlueprintSearchResult;