import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {getField} from "components/common/metadata/metadata-helpers";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import CreateLdapDepartmentOverlay from "components/settings/ldap_departments/CreateLdapDepartmentOverlay";
import FilterContainer from "components/common/table/FilterContainer";
import {faBuilding} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";

function LdapDepartmentsTable({ accessRoleData, isMounted, departmentMetadata, departments, domain, loadData, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(departmentMetadata);
  }, [JSON.stringify(departmentMetadata)]);

  const loadColumnMetadata = (metadata) => {
    if (isMounted?.current === true && metadata?.fields) {
      const fields = metadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields, "name")),
          getTableTextColumn(getField(fields, "ownerEmail")),
          getTableTextColumn(getField(fields, "memberCount")),
          getTableTextColumn(getField(fields, "departmentGroupName")),
        ]
      );
    }
  };

  const onRowSelect = (rowData) => {
    history.push(`/settings/${domain}/departments/details/${rowData.original.name}`);
  };

  const createNewDepartment = () => {
    toastContext.showOverlayPanel(
      <CreateLdapDepartmentOverlay
        showModal={showCreateDepartmentModal}
        loadData={loadData}
        setShowModal={setShowCreateDepartmentModal}
        orgDomain={domain}
        isMounted={isMounted}
      />
    );
    setShowCreateDepartmentModal(true);
  };

  const getDepartmentsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={departments}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={accessRoleData?.OpseraAdministrator === true ? createNewDepartment : null}
      isLoading={isLoading}
      body={getDepartmentsTable()}
      titleIcon={faBuilding}
      title={"Departments"}
      type={"Department"}
      className="px-2 pb-2"
    />
  );
}

LdapDepartmentsTable.propTypes = {
  departmentMetadata: PropTypes.object,
  accessRoleData: PropTypes.object,
  isMounted: PropTypes.object,
  departments: PropTypes.array,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapDepartmentsTable;