import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import accountsActions from "components/admin/accounts/accounts-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

// TODO: Standardize
export default function AccountStatusWidget({ className }) {
  const [isLoading, setIsLoading] = useState(undefined);
  const [accountMetrics, setAccountMetrics] = useState(undefined);
  const {
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
      await getAccountMetrics();
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

  const getAccountMetrics = async () => {
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
      <div>
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
    const failedPipelines = DataParsingHelper.parseArray(accountMetrics?.pipelineMetrics?.failed, []);
    const failedTasks = DataParsingHelper.parseArray(accountMetrics?.taskMetrics?.failed, []);
    const totalCount = failedPipelines.length + failedTasks.length;

    if (totalCount === 0) {
      return (
        <span className={"green marketingModulesValueText"}>
          healthy
        </span>
      );
    }

    if (totalCount === 1) {
      return (
        <span className={"yellow marketingModulesValueText"}>
          warning
        </span>
      );
    }

    if (totalCount > 1) {
      return (
        <span className={"red marketingModulesValueText"}>
          un-healthy
        </span>
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
    const pipelineCount = accountMetrics?.pipelineMetrics?.totalCount;
    const taskCount = accountMetrics?.taskMetrics?.totalCount;
    const summaryCount = pipelineCount + taskCount;

    if (summaryCount > 1) {
      return (
        <span>You have {summaryCount} configured offerings</span>
      );
    }

    if (pipelineCount === 1) {
      return (
        <span>You have {summaryCount} configured pipeline</span>
      );
    }

    if (taskCount === 1) {
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
   * @returns {JSX.Element}
   */
  const getTotalRunCount = () => {
    const pipelineRuns = accountMetrics?.pipelineMetrics?.totalRunCount;
    const taskRuns = accountMetrics?.taskMetrics?.totalRunCount;
    const summaryRunCount = pipelineRuns + taskRuns;

    return (
      <div>Completed Runs:&nbsp;
        <span className={"marketingModulesValueText"}>{summaryRunCount}</span></div>
    );

  };

  const getExpirationDate = () => {
    const expiration = DataParsingHelper.parseDate(accountMetrics?.expiration);

    if (!expiration) {
      return (
        <div className="d-flex justify-content-end position-absolute w-100 fixed-bottom">
          <div className="marketingModulesText p-3 mx-3"
               style={{fontSize:"smaller"}}>
            Your free trial does not expire.
          </div>
        </div>
      );
    }

    const parsedDate = expiration.toISOString().substring(0, 10);

    return (
      <div className="d-flex justify-content-end position-absolute w-100 fixed-bottom">
        <div className="marketingModulesText p-3 mx-3"
             style={{fontSize:"smaller"}}>
          Your free trial will expire on {parsedDate}.  For assistance, email
          <a href="mailto:support@opsera.io" style={{paddingLeft:"5px"}} className={"marketingModulesTextLink"}>support@opsera.io</a>
        </div>
      </div>
    );
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator type={"Account Overview"} />
      );
    }

    return (
      <>
        <div className="d-flex justify-content-center h-100 mt-4 mb-2">
          <div className="d-flex align-items-left marketingModulesText">
            <div className={"my-2 marketingModulesTextLarger"}>{getItemCounts()}</div>
          </div>
        </div>
        <div className="d-flex justify-content-center h-100">
          <div className="d-flex align-items-center marketingModulesText">
            <div className={"my-2 p-4 marketingModulesTextLarger"}>
              {`Pipelines are `}{getPipelineHealth()}
            </div>
            <div className={"my-2 p-4 marketingModulesTextLarger"}>
              {getTotalRunCount()}
            </div>
          </div>
        </div>
        {getExpirationDate()}
      </>
    );
  };


  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        title={getTitleText()}
        heightSize={6}
        isLoading={isLoading}
      >
        {getBody()}
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

AccountStatusWidget.propTypes = {
  className: PropTypes.string,
};

