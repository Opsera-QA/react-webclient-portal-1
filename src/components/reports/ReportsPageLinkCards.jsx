import React, { useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import TagReportPageLinkCards from "components/reports/tags/TagReportPageLinkCards";
import ToolReportPageLinkCards from "components/reports/tools/ToolReportPageLinkCards";
import UserReportPageLinkCards from "components/reports/users/UserReportPageLinkCards";
import { AuthContext } from "contexts/AuthContext";

function ReportsPageLinkCards({accessRoleData}) {
  const { isSassUser } = useContext(AuthContext);

  const getUserReports = () => {
    if (isSassUser() === false) {
      return (
        <div className={"mt-3"}>
          <H5FieldSubHeader className={"ml-3"} subheaderText={"User Reports"} />
          <UserReportPageLinkCards accessRoleData={accessRoleData} />
        </div>
      );
    }
  };

  const getAllReports = () => {
    return (
      <div>
        <div>
          <H5FieldSubHeader className={"ml-3"} subheaderText={"Tag Reports"} />
          <TagReportPageLinkCards accessRoleData={accessRoleData} />
        </div>
        <div className={"mt-3"}>
          <H5FieldSubHeader className={"ml-3"} subheaderText={"Tool Reports"} />
          <ToolReportPageLinkCards accessRoleData={accessRoleData} />
        </div>
        {getUserReports()}
        {/*TODO: Uncomment when Pipeline Report is added*/}
        {/*<PipelineReports />*/}
      </div>
    );
  };

  if (accessRoleData == null) {
    return (<LoadingDialog size={"sm"} />);
  }

  return (
    <div>
      {getAllReports()}
    </div>
  );
}

ReportsPageLinkCards.propTypes = {
  accessRoleData: PropTypes.object,
};

export default ReportsPageLinkCards;
