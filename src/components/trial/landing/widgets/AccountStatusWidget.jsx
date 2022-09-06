import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import { platformSystemParameterActions } from "components/admin/system_parameters/platformSystemParameter.actions";
import modelHelpers from "components/common/model/modelHelpers";
import { platformSystemParametersMetadata } from "components/admin/system_parameters/platformSystemParameters.metadata";
import accountsActions from "components/admin/accounts/accounts-actions";

// TODO: Standardize
export default function AccountStatusWidget({ className }) {
  const [isLoading, setIsLoading] = useState(undefined);
  const [accountMetrics, setAccountMetrics] = useState(undefined);
  const {
    themeConstants,
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getSystemParameter();
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getSystemParameter = async () => {
    const response = await accountsActions.getFreeTrialAccountMetrics(
      getAccessToken,
      cancelTokenSource,
    );

    const metrics = response?.data?.data;
    if (isMounted?.current === true && metrics) {
      setAccountMetrics(metrics);
    }
  };

  const getTitleText = () => {
    return (
      <div
        style={{
          // fontWeight: 700,
          // fontSize: "22px",
        }}
      >
        My Account
      </div>
    );
  };


  /***
   * successful: All pipelines and tasks last run were successful
   * warning: if only 1 pipeline or task has failed and others are successful
   * failed: if more than 1 pipeline or task is in a failed state
   * @param status
   * @returns {JSX.Element}
   */
  const getPipelineHealth = (status = "successful") => {
    //const status = "successful"; //failed

    if (status === "successful") {
      return (
        <span className={"green marketingModulesValueText"}>healthy</span>
      );
    }

    if (status === "warning") {
      return (
        <span className={"yellow marketingModulesValueText"}>warning</span>
      );
    }

    if (status == "failed") {
      return (
        <span className={"red marketingModulesValueText"}>un-healthy</span>
      );
    }

    return (
      <span>unknown</span>
    );

  };


  /***
   * get the total count of pipelines & tasks as a single "workflow"
   * @param status
   * @returns {JSX.Element}
   */
  const getItemCounts = () => {
    const pipelineCount = 1; //assuming these have to get wired up to API calls
    const taskCount = 0;
    const summaryCount = pipelineCount + taskCount;

    if (summaryCount > 1) {
      return (
        <span>You have {summaryCount} configured offerings</span>
      );
    }

    if (pipelineCount == 1) {
      return (
        <span>You have {summaryCount} configured pipeline</span>
      );
    }

    if (taskCount == 1) {
      return (
        <span>You have {summaryCount} configured task</span>
      );
    }

    return (
      <span>You have no configured offerings at this time</span>
    );

  };


  /***
   * get the total runs of all pipelines & tasks
   * @param status
   * @returns {JSX.Element}
   */
  const getTotalRunCount = () => {
    const pipelineRuns = 12; //assuming these have to get wired up to API calls
    const taskRuns = 0;
    const summaryRunCount = pipelineRuns + taskRuns;

    return (
      <div>Completed Runs:&nbsp;
        <span className={"marketingModulesValueText"}>{summaryRunCount}</span></div>
    );

  };


  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        title={getTitleText()}
        fontColor={themeConstants.COLOR_PALETTE.DEEP_PURPLE}
        heightSize={6}
      >
        <div className="d-flex justify-content-center h-100 mt-4 mb-2">

          <div className="d-flex align-items-left marketingModulesText">
            <div className={"my-2 marketingModulesTextLarger"}>{getItemCounts()}</div>
          </div>

        </div>
        <div className="d-flex justify-content-center h-100">

          <div className="d-flex align-items-center marketingModulesText">

            <div className={"my-2 p-4 marketingModulesTextLarger"}>
              Pipelines are&nbsp;
              {getPipelineHealth()}
            </div>
            <div className={"my-2 p-4 marketingModulesTextLarger"}>
              {getTotalRunCount()}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end position-absolute w-100 fixed-bottom">
          <div className="marketingModulesText p-3 mx-3"
                style={{fontSize:"smaller"}}>
            Your free trial will expire on 8/1/2000.  For assistance, email
            <a href="mailto:support@opsera.io" style={{paddingLeft:"5px"}} className={"marketingModulesTextLink"}>support@opsera.io</a>
          </div>
        </div>
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

AccountStatusWidget.propTypes = {
  className: PropTypes.string,
};

