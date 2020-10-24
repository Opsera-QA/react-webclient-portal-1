import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import ldapDepartmentMetaData from "./ldap-department-metadata";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";
import {getField} from "../../../../common/metadata/metadata-helpers";
import NewLdapDepartmentModal from "./NewLdapDepartmentModal";

function LdapDepartmentsTable({ departmentData, domain, loadData, isLoading }) {
  const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);
  const fields = ldapDepartmentMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "ownerEmail")),
      getTableTextColumn(getField(fields, "departmentGroupName")),
    ],
    [fields]
  );

  const onRowSelect = (rowData, type) => {
    console.log("rowData")
    history.push(`/admin/${domain}/departments/details/${rowData.original.name}`);
  };

  return (
    <div>
      <CustomTable onRowSelect={onRowSelect}
                   data={departmentData}
                   columns={columns}
                   isLoading={isLoading}
                   tableTitle={"Departments"}
                   loadData={loadData}
      />
      <NewLdapDepartmentModal showModal={showCreateDepartmentModal} loadData={loadData} setShowModal={setShowCreateDepartmentModal}/>
    </div>
  );
}

LdapDepartmentsTable.propTypes = {
  departmentData: PropTypes.array,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapDepartmentsTable;