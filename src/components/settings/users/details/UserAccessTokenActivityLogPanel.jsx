import React, {useEffect} from "react";
import PropTypes from "prop-types";
import AccessTokenLogTable from "components/user/user_settings/access_tokens/details/logs/AccessTokenLogTable";
import useGetUserAccessTokenActivityLogs from "hooks/access_tokens/useGetUserAccessTokenActivityLogs";

export default function UserAccessTokenActivityLogPanel({ userId, className }) {
  const {
    userAccessTokenActivityLogs,
    accessTokenLogFilterModel,
    setAccessTokenLogFilterModel,
    isLoading,
    error,
    loadData,
  } = useGetUserAccessTokenActivityLogs(userId);

  useEffect(() => {}, []);

  return (
    <AccessTokenLogTable
      error={error}
      loadData={loadData}
      isLoading={isLoading}
      activityLogs={userAccessTokenActivityLogs}
      filterModel={accessTokenLogFilterModel}
      setFilterModel={setAccessTokenLogFilterModel}
      className={className}
    />
  );
}

UserAccessTokenActivityLogPanel.propTypes = {
  userId: PropTypes.string,
  className: PropTypes.string,
};
