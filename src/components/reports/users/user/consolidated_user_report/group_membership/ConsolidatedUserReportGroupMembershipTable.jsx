import React, {useEffect, useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldap-groups-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserFriends, faSearch} from "@fortawesome/pro-light-svg-icons";
import {getTableTextColumn, getStaticIconColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import InformationDialog from "components/common/status_notifications/info";
import {findUserGroupsByDistinguishedName} from "components/settings/ldap_groups/group-helpers";
import CustomTable from "components/common/table/CustomTable";

function UserGroupMembershipReportTable({ groups, isLoading, loadData, userDistinguishedName, domain }) {
  const history = useHistory();
  const fields = ldapGroupMetaData.fields;
  const [relevantGroups, setRelevantGroups] = useState([]);

  useEffect(() => {
    setRelevantGroups([]);

    if (userDistinguishedName && Array.isArray(groups)) {
      const userGroups = findUserGroupsByDistinguishedName(groups, userDistinguishedName);
      setRelevantGroups([...userGroups]);
    }
  }, [groups, userDistinguishedName]);

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "groupType")),
      getTableTextColumn(getField(fields, "memberCount")),
      getStaticIconColumn(faSearch)
    ],
    []
  );

  const onRowSelect = (grid, rowData) => {
    history.push(`/settings/${domain}/groups/details/${rowData?.name}`);
  };

  const getGroupMembershipTable = () => {
    if (!groups && !isLoading) {
      return (
        <div className="px-2 max-content-width">
          <InformationDialog message="Could not load groups." />
        </div>
      );
    }
  
    return (
      <CustomTable 
        className="table-no-border"
        columns={columns}
        data={relevantGroups}
        onRowSelect={onRowSelect}
        noDataMessage={"No groups are associated with the selected user."}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  if (!Array.isArray(groups) || userDistinguishedName === "") {
    return null;
  }

  return (
    <FilterContainer
    loadData={loadData}
    isLoading={isLoading}
    showBorder={false}
    body={getGroupMembershipTable()}
    metaData={ldapGroupMetaData}
    titleIcon={faUserFriends}
    title={"Group Membership"}
    className={"px-2 pb-2"}
  />
  );
}

UserGroupMembershipReportTable.propTypes = {
  groups: PropTypes.array,
  groupList: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  userDistinguishedName: PropTypes.string,
  domain: PropTypes.string,
};

export default UserGroupMembershipReportTable;