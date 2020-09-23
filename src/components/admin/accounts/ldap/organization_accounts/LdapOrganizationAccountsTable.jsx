import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../../common/table/CustomTable";
import {
  ldapOrganizationAccountMetaData
} from "./ldap-organization-account-form-fields";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";
import {useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import NewLdapOrganizationAccountModal from "./NewLdapOrganizationAccountModal";
import DropdownList from "react-widgets/lib/DropdownList";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, ldapOrganizationData, organizations, handleOrganizationChange, currentOrganizationName, authorizedActions, isLoading, loadData }) {
  const [showCreateOrganizationAccountModal, setShowCreateOrganizationAccountModal] = useState(false);
  let fields = ldapOrganizationAccountMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgOwner"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgOwnerEmail"})),
      getTableTextColumn(fields.find(field => { return field.id === "accountName"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgDomain"})),
    ],
    []
  );

  const onRowSelect = (selectedRow) => {
    history.push(`/admin/organization-accounts/${selectedRow.original.orgDomain}/details/`);
  };


  return (
    <>
      <div className="d-flex flex-row-reverse">
        <div className="my-1 text-right">
          {authorizedActions && authorizedActions.includes("create_organization_account") && <Button variant="primary" size="sm"
                                                                                                     onClick={() => {
                                                                                                       setShowCreateOrganizationAccountModal(true);
                                                                                                     }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/>New Organization Account
          </Button>}
        </div>
        <div className="tableDropdown mr-2">
          {organizations && <DropdownList
            data={organizations}
            value={currentOrganizationName}
            filter="contains"
            valueField='id'
            textField='text'
            placeholder="Select an Organization Account"
            groupBy={org => org["groupId"]}
            onChange={handleOrganizationChange}
          />}
        </div>
      </div>
    <CustomTable
      columns={columns}
      isLoading={isLoading}
      data={ldapOrganizationAccounts}
      onRowSelect={onRowSelect}
      tableTitle={"Organization Accounts"}
    />
  <NewLdapOrganizationAccountModal ldapOrganizationData={ldapOrganizationData} authorizedActions={authorizedActions} showModal={showCreateOrganizationAccountModal} loadData={loadData} setShowModal={setShowCreateOrganizationAccountModal}/>
</>
  );
}

LdapOrganizationAccountsTable.propTypes = {
  ldapOrganizationAccounts: PropTypes.array,
  ldapOrganizationData: PropTypes.object,
  authorizedActions: PropTypes.array,
  currentOrganizationName: PropTypes.string,
  organizations: PropTypes.array,
  handleOrganizationChange: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapOrganizationAccountsTable;
