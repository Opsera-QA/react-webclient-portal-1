import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getTableBooleanIconColumn,
  getTableLeaderColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faSitemap} from "@fortawesome/pro-light-svg-icons";
import {organizationMetadata} from "components/settings/organizations/organization.metadata";
import NewOrganizationOverlay from "components/settings/organizations/NewOrganizationOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import {organizationHelper} from "components/settings/organizations/organization.helper";
import OrganizationRoleHelper from "@opsera/know-your-role/roles/settings/organizations/organizationRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function OrganizationsTable({ organizations, isLoading, loadData, isMounted, organizationFilterModel, setOrganizationFilterModel }) {
  const toastContext = useContext(DialogToastContext);
  const fields = organizationMetadata.fields;
  const history = useHistory();
  const { userData } = useComponentStateReference();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "owner_name")),
      getTableLeaderColumn(getField(fields, "leader")),
      getTableBooleanIconColumn(getField(fields, "active"))
    ],
    []
  );


  const createOrganization = () => {
    toastContext.showOverlayPanel(<NewOrganizationOverlay loadData={loadData} isMounted={isMounted} />);
  };
  
  const onRowSelect = (rowData) => {
    history.push(organizationHelper.getDetailViewLink(rowData?.original?._id));
  };

  const getOrganizationsTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={organizations}
        columns={columns}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={OrganizationRoleHelper.canCreateOrganization(userData) === true ? createOrganization : undefined}
      supportSearch={true}
      isLoading={isLoading}
      body={getOrganizationsTable()}
      metadata={organizationMetadata}
      titleIcon={faSitemap}
      filterDto={organizationFilterModel}
      setFilterDto={setOrganizationFilterModel}
      title={"Organizations"}
      type={"Organization"}
      className={"px-2 pb-2"}
    />
  );
}

OrganizationsTable.propTypes = {
  organizations: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  organizationFilterModel: PropTypes.object,
  setOrganizationFilterModel: PropTypes.func
};

export default OrganizationsTable;