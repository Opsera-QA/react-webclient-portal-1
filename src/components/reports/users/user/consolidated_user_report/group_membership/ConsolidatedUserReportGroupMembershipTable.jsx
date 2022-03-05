import React, {useEffect, useMemo, useState} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {faUserFriends, faSearch} from "@fortawesome/pro-light-svg-icons";
import {getTableTextColumn, getStaticInfoColumn} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import InformationDialog from "components/common/status_notifications/info";
import {findUserGroupsByDistinguishedName} from "components/settings/ldap_groups/group-helpers";
import VanityTable from "components/common/table/VanityTable";

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
      getStaticInfoColumn()
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
      <VanityTable
        columns={columns}
        data={relevantGroups}
        onRowSelect={onRowSelect}
        noDataMessage={"No groups are associated with the selected user."}
        isLoading={isLoading}
        loadData={loadData}
        tableHeight={"250px"}
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
    body={getGroupMembershipTable()}
    metaData={ldapGroupMetaData}
    titleIcon={faUserFriends}
    title={"Group Membership"}
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