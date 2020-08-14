import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle, faCheckCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import NewJenkinsJobModal from "./NewJenkinsJobModal";

function JenkinsJobsTable({ toolData, loadData, selectedRow }) {

  const handleCancelModal = () => {
    setShowCreateJobModal(false);
  }

  const createJenkinsJob = () => {
    setShowCreateJobModal(true);
  }

  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
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
        Cell: (props) => {
          return props.value[0];
        },
      },     
      {
        Header: "Active",
        accessor: "active",
        Cell: (props) => {
          return props.value ?  <FontAwesomeIcon icon={faCheckCircle} className="green ml-3" /> :  <FontAwesomeIcon icon={faTimesCircle} className="red ml-3" />;
        },
      },   
    ],
    []
  );

  return (
    <>
      <NewJenkinsJobModal toolData={toolData} loadData={loadData} onModalClose={handleCancelModal} showModal={showCreateJobModal} />
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
          initialState={initialState}
          onRowSelect={selectedRow}
          tableStyleName="custom-table-2"
        >
        </CustomTable>
      </div>
    </>
  );
}

JenkinsJobsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  selectedRow: PropTypes.func
};

export default JenkinsJobsTable;