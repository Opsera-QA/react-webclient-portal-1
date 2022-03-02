import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import IconBase from "components/common/icons/IconBase";

function CommitSearchResult({ searchResults }) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };

  return (   
    <>
    GITLAB BRANCHES
      <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
        <thead>
          <tr>
            <th style={{ width: "25%" }}>Git Commit ID</th>
            <th style={{ width: "20%" }}>User</th>
            <th style={{ width: "5%" }}>Git Branch</th>
            <th style={{ width: "20%" }}>Project</th>
            <th style={{ width: "20%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.gitlab.map((item, idx) => (
            <tr key={idx} >
              <td>{item["git_commit"]}
                <IconBase
                  className={"pointer"}
                  icon={faSearchPlus}
                  iconClassName={"ml-1"}
                  iconSize={"xs"}
                  onClickFunction={() => { handleClick(item); }}
                />
              </td>
              <td className="force-text-wrap">{item["user"]}</td>
              <td className="force-text-wrap">{item["git_branch"]}</td>
              <td className="force-text-wrap">{item["project"]}</td>
              <td>{format(new Date(item["time"]), "yyyy-MM-dd', 'hh:mm a")}</td>  
            </tr>
          ))}
        </tbody>
      </Table>
      JENKINS PIPELINES
      <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Build</th>
            <th style={{ width: "25%" }}>Git Commit ID</th>
            <th style={{ width: "5%" }}>Git Branch</th>
            <th style={{ width: "20%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.jenkins.map((item, idx) => (
            <tr key={idx} >
              <td>{item["build_tag"]}
                <IconBase
                  className={"pointer"}
                  icon={faSearchPlus}
                  iconClassName={"ml-1"}
                  iconSize={"xs"}
                  onClickFunction={() => { handleClick(item); }}
                />
              </td>
              <td className="force-text-wrap">{item["git_commit"]}</td>
              <td className="force-text-wrap">{item["git_branch"]}</td>
              <td>{format(new Date(item["time"]), "yyyy-MM-dd', 'hh:mm a")}</td>  
            </tr>
          ))}
        </tbody>
      </Table>
      SONARQUBE SCANS
      <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Task ID</th>
            <th style={{ width: "25%" }}>Git Commit ID</th>
            <th style={{ width: "5%" }}>Git Branch</th>
            <th style={{ width: "20%" }}>Project</th>
            <th style={{ width: "20%" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.sonar.map((item, idx) => (
            <tr key={idx} >
              <td>{item["task"]}
                <IconBase
                  className={"pointer"}
                  icon={faSearchPlus}
                  iconClassName={"ml-1"}
                  iconSize={"xs"}
                  onClickFunction={() => { handleClick(item); }}
                />
              </td>
              <td className="force-text-wrap">{item["git_commit"]}</td>
              <td className="force-text-wrap">{item["branch"]}</td>
              <td className="force-text-wrap">{item["project"]}</td>
              <td>{format(new Date(item["time"]), "yyyy-MM-dd', 'hh:mm a")}</td>  
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalLogs header={"Commit ID: " + modalMessage.git_commit} size="lg" jsonMessage={modalMessage} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
    </>
  );
}

CommitSearchResult.propTypes = {
  searchResults: PropTypes.array
};


export default CommitSearchResult;