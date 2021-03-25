import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheckCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import NewJenkinsJobModal from "./NewJenkinsJobModal";

function JenkinsJobsTable({ toolData, loadData, selectedRow, isLoading }) {
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  const createJenkinsJob = () => {
    setShowCreateJobModal(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: function formatCell(row) {
          return row.value[0];
        },
      },     
      {
        Header: "Active",
        accessor: "active",
        Cell: function formatCell(row) {
          return row.value ?  <FontAwesomeIcon icon={faCheckCircle} className="green ml-3" /> :  <FontAwesomeIcon icon={faTimesCircle} className="red ml-3" />;
        },
      },   
    ],
    []
  );

  return (
    <>
      <NewJenkinsJobModal toolData={toolData} loadData={loadData} setShowModal={setShowCreateJobModal} showModal={showCreateJobModal} />
      <div className="my-1 text-right">
        <Button variant="primary" size="sm"
                onClick={() => createJenkinsJob()}>
          <FontAwesomeIcon icon={faPlus} className="mr-1"/> Create Job
        </Button>
        <br/>
      </div>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={toolData.getData("jobs")}
          onRowSelect={selectedRow}
          isLoading={isLoading}
        >
        </CustomTable>
      </div>
    </>
  );
}

JenkinsJobsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  selectedRow: PropTypes.func,
  isLoading: PropTypes.bool
};

export default JenkinsJobsTable;