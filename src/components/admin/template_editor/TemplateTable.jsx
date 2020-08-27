import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomTable from "components/common/table/table";
import { format } from "date-fns";
import {faTimesCircle, faCheckCircle, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import NewTemplateModal from "./NewTemplateModal";

function TemplateTable({ data, loadData }) {
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const history = useHistory();

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
        Header: "Created",
        accessor: "createdAt",
        Cell: (props) => {
          return props.value ? format(new Date(props.value), "yyyy-MM-dd") : "";
        },
        class: "cell-center no-wrap-inline"
      },
      {
        Header: "Account",
        accessor: "account",
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

  const noDataMessage = "No templates are currently available";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData, type) => {
    history.push(`/admin/templates/details/${rowData.original._id}`);
  };

  const createTemplate = () => {
    setShowCreateTemplateModal(true);
  };

  return (
    <>
      {showCreateTemplateModal && <NewTemplateModal setShowModal={setShowCreateTemplateModal} loadData={loadData} showModal={showCreateTemplateModal}/>}
      <div className="justify-content-between mb-1 d-flex">
        <h5>Template Management</h5>
        <div className="text-right">
          <Button variant="primary" size="sm"
                  onClick={() => {
                    createTemplate();
                  }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Template
          </Button>
          <br/>
        </div>
      </div>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={data}
          onRowSelect={selectedRow}
          noDataMessage={noDataMessage}
          rowStyling={rowStyling}
          tableStyleName="custom-table-2"
        >
        </CustomTable>
      </div>
    </>
  );
}

TemplateTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func
};

export default TemplateTable;