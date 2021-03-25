import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import ldapDepartmentMetaData from "./ldap-department-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import NewLdapDepartmentModal from "components/admin/accounts/ldap/ldap_departments/NewLdapDepartmentModal";
import FilterContainer from "components/common/table/FilterContainer";
import {faBuilding} from "@fortawesome/pro-light-svg-icons";

function LdapDepartmentsTable({ departmentData, authorizedActions, domain, loadData, isLoading }) {
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

  const onRowSelect = (rowData) => {
    history.push(`/admin/${domain}/departments/details/${rowData.original.name}`);
  };

  const createNewDepartment = () => {
    setShowCreateDepartmentModal(true);
  };

  const getDepartmentsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={departmentData}
        columns={columns}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        addRecordFunction={createNewDepartment}
        isLoading={isLoading}
        body={getDepartmentsTable()}
        titleIcon={faBuilding}
        title={"Departments"}
        type={"Department"}
      />
      <NewLdapDepartmentModal
        showModal={showCreateDepartmentModal}
        loadData={loadData}
        setShowModal={setShowCreateDepartmentModal}
        authorizedActions={authorizedActions}
        orgDomain={domain}
      />
    </div>
  );
}

LdapDepartmentsTable.propTypes = {
  departmentData: PropTypes.array,
  authorizedActions: PropTypes.array,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapDepartmentsTable;