import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import TagReportPageLinkCards from "components/reports/tags/TagReportPageLinkCards";
import ToolReportPageLinkCards from "components/reports/tools/ToolReportPageLinkCards";
import UserReportPageLinkCards from "components/reports/users/UserReportPageLinkCards";
import useComponentStateReference from "hooks/useComponentStateReference";

function ReportsPageLinkCards() {
  const {
    isSaasUser,
    accessRoleData,
  } = useComponentStateReference();

  const getUserReports = () => {
    if (isSaasUser === false) {
      return (
        <div className={"mt-3"}>
          <H5FieldSubHeader className={"ml-3"} subheaderText={"User Reports"} />
          <UserReportPageLinkCards />
        </div>
      );
    }
  };

  const getAllReports = () => {
    return (
      <div>
        <div>
          <H5FieldSubHeader className={"ml-3"} subheaderText={"Tag Reports"} />
          <TagReportPageLinkCards />
        </div>
        <div className={"mt-3"}>
          <H5FieldSubHeader className={"ml-3"} subheaderText={"Tool Reports"} />
          <ToolReportPageLinkCards />
        </div>
        {getUserReports()}

        {/*TODO: Uncomment when Pipeline Report is added*/}
        {/*<div className={"mt-3"}>*/}
          {/*<H5FieldSubHeader className={"ml-3"} subheaderText={"Pipeline Reports"} />*/}
        {/*<PipelineReports />*/}
        {/*</div>*/}


          {/*<div className={"mt-3"}>*/}
          {/*  <H5FieldSubHeader className={"ml-3"} subheaderText={"Audit Reports"} />*/}
        {/*<AuditReportPageLinkCards />*/}
        {/*  </div>*/}
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
