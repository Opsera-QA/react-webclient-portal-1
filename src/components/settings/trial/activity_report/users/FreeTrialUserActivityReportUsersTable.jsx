import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {
  getSsoUserNameField, getTableDateColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer, {
} from "components/common/table/FilterContainer";
import { faUsers } from "@fortawesome/pro-light-svg-icons";
import {
  freeTrialUserActivityReportUserMetadata
} from "components/settings/trial/activity_report/users/freeTrialUserActivityReportUser.metadata";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

export const getUserExpirationColumnDefinition = () => {
  return {
    Header: "Status",
    accessor: "expired",
    Cell: function getRoleAccessLevel(row) {
      const dataObject = DataParsingHelper.parseObject(row?.data[row?.row?.index], {});
      const expired = dataObject.expired;
      const active = dataObject.active;

      if (expired === true || active === false) {
        return "Expired";
      }

      return "Active";
    },
  };
};

export default function FreeTrialUserActivityReportUsersTable(
  {
    freeTrialUsers,
    loadData,
    isLoading,
  }) {
  const fields = freeTrialUserActivityReportUserMetadata.fields;
  const history = useHistory();
  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "createdAt",
        desc: true
      }
    ]
  };

  const columns = useMemo(
    () => [
      getUserExpirationColumnDefinition(),
      getSsoUserNameField(),
      getTableTextColumn(getField(fields, "email")),
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "toolCount")),
      getTableTextColumn(getField(fields, "workflowCount")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableDateTimeColumn(getField(fields, "updatedAt")),
    ],
    [fields]
  );

  const onRowSelect = (row) => {
    const userId = row?.original?._id;

    if (isMongoDbId(userId) === true) {
      history.push(`/settings/trial/user/activity-report/users/${userId}`);
    }
  };

  const getTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        initialState={initialState}
        isLoading={isLoading}
        data={freeTrialUsers}
        columns={columns}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getTable()}
      titleIcon={faUsers}
      title={"Free Trial Users"}
      className={"px-2 pb-2"}
      hideXOverflow={false}
    />
  );
}

FreeTrialUserActivityReportUsersTable.propTypes = {
  freeTrialUsers: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
};
