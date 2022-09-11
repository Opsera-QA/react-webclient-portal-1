import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import FreeTrialWidgetDataBlockBase from "components/trial/FreeTrialWidgetDataBlockBase";
import accountsActions from "components/admin/accounts/accounts-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { getSingularOrPluralString } from "components/common/helpers/string-helpers";
import OpseraInfinityLogoLarge from "components/logo/OpseraInfinityLogoLarge";

// TODO: This needs to be rewritten to be standardized and cleaned up
export default function FreeTrialLandingAccountStatsWidget({ className }) {
  const [isLoading, setIsLoading] = useState(undefined);
  const [accountMetrics, setAccountMetrics] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
    themeConstants,
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

  const getWorkflowHealthText = () => {
    const failedPipelines = DataParsingHelper.parseArray(accountMetrics?.pipelineMetrics?.failed, []);
    const failedTasks = DataParsingHelper.parseArray(accountMetrics?.taskMetrics?.failed, []);
    const totalCount = failedPipelines.length + failedTasks.length;

    if (totalCount === 0) {
      return (
        <b className={"green"}>
          healthy
        </b>
      );
    }

    if (totalCount === 1) {
      return (
        <b className={"yellow"}>
          slightly unhealthy
        </b>
      );
    }

    if (totalCount > 1) {
      return (
        <b className={"red"}>
          unhealthy
        </b>
      );
    }
  };

  const getPipelineHealth = (status = "successful") => {
    const pipelineRunCount = DataParsingHelper.parseInteger(accountMetrics?.pipelineMetrics?.totalRunCount, 0);
    const taskRunCount = DataParsingHelper.parseInteger(accountMetrics?.taskMetrics?.totalRunCount, 0);
    const totalRunCount = pipelineRunCount + taskRunCount;

    if (totalRunCount === 0) {
      return null;
    }

    const failedPipelines = DataParsingHelper.parseArray(accountMetrics?.pipelineMetrics?.failed, []);
    const failedTasks = DataParsingHelper.parseArray(accountMetrics?.taskMetrics?.failed, []);
    const totalFailureCount = failedPipelines.length + failedTasks.length;

    const pipelineCount = DataParsingHelper.parseInteger(accountMetrics?.pipelineMetrics?.totalCount, 0);
    const taskCount = DataParsingHelper.parseInteger(accountMetrics?.taskMetrics?.totalCount, 0);
    const totalWorkflowCount = pipelineCount + taskCount;

    const successCount = totalWorkflowCount - totalFailureCount;
    const successPercentage = successCount / totalWorkflowCount * 100;
    // const successColor =
    //   successPercentage > 66
    //     ? "green"
    //     : successPercentage > 33
    //       ? "yellow"
    //       : "red";
    //
    // const successfulPipelineMetrics = {
    //   value: successCount,
    //   displayValue: `${successCount}`,
    //   text: "Healthy",
    //   color: successColor,
    // };
    //
    // const failedPipelineMetrics = {
    //   value: totalFailureCount,
    //   displayValue: `${totalFailureCount}`,
    //   text: "Unhealthy",
    //   color: themeConstants.COLOR_PALETTE.DANGER_SECONDARY,
    // };
    //
    // if (totalFailureCount) {
    //   return (
    //     <HalfPieChartBase
    //       title={"Workflow Health"}
    //       leftConfiguration={failedPipelineMetrics}
    //       rightConfiguration={successfulPipelineMetrics}
    //     />
    //   );
    // }

    return (
      <>
      </>
    );
  };


  const getItemCounts = () => {
    const pipelineCount = DataParsingHelper.parseInteger(accountMetrics?.pipelineMetrics?.totalCount, 0);
    const taskCount = DataParsingHelper.parseInteger(accountMetrics?.taskMetrics?.totalCount, 0);
    const totalCount = pipelineCount + taskCount;

    if (totalCount === 0) {
      return (
        <span>You have no configured offerings at this time.</span>
      );
    }

    const pipelineText = getSingularOrPluralString(pipelineCount, "Pipeline", "Pipelines");
    const taskText = getSingularOrPluralString(taskCount, "Task", "Tasks");


    const pipelineRunCount = DataParsingHelper.parseInteger(accountMetrics?.pipelineMetrics?.totalRunCount, 0);
    const taskRunCount = DataParsingHelper.parseInteger(accountMetrics?.taskMetrics?.totalRunCount, 0);
    const totalRunCount = pipelineRunCount + taskRunCount;
    const runText = getSingularOrPluralString(totalRunCount, "Run", "Runs");

    return (
      <div>
        <div style={{fontSize: "smaller"}}>
          You have
        </div>
        <div className={"mt-1 mb-1"}>
          <div><b>{totalCount}</b> Total Workflows</div>
          <div><b>{pipelineCount}</b> {pipelineText}</div>
          <div><b>{taskCount}</b> {taskText}</div>
          <div>with <b>{totalRunCount}</b> Completed {runText}</div>
        </div>
        <div style={{fontSize: "smaller"}}>
          Workflows are {getWorkflowHealthText()}
        </div>
      </div>
    );
  };

  const getWorkflowHealthStatus = () => {
    const pipelineCount = accountMetrics?.pipelineMetrics?.totalCount;
    const taskCount = accountMetrics?.taskMetrics?.totalCount;
    const totalCount = pipelineCount + taskCount;

    const pipelineRunCount = DataParsingHelper.parseInteger(accountMetrics?.pipelineMetrics?.totalRunCount, 0);
    const taskRunCount = DataParsingHelper.parseInteger(accountMetrics?.taskMetrics?.totalRunCount, 0);
    const totalRunCount = pipelineRunCount + taskRunCount;

    if (totalCount === 0) {
      return (
        <CenteredContentWrapper>
          <div className={"my-4 marketingModulesTextLarger"}>
            Get started below to create your first Salesforce Workflow.
          </div>
        </CenteredContentWrapper>
      );
    }

    if (totalRunCount === 0) {
      return (
        <CenteredContentWrapper>
          <div className={"my-4 marketingModulesTextLarger"}>
            Select a Workflow below and hit Run to get started.
          </div>
        </CenteredContentWrapper>
      );
    }

    return (
      <div className={"d-flex"}>
        <div className={"d-flex"}>
          <div className={"marketingModulesTextLarger"}>
            {getPipelineHealth()}
          </div>
        </div>
      </div>
    );
  };


  const getTotalRunCount = () => {
    const pipelineRunCount = DataParsingHelper.parseInteger(accountMetrics?.pipelineMetrics?.totalRunCount, 0);
    const taskRunCount = DataParsingHelper.parseInteger(accountMetrics?.taskMetrics?.totalRunCount, 0);
    const totalRunCount = pipelineRunCount + taskRunCount;

    if (totalRunCount === 1) {
      return (
        <div className={"marketingModulesTextLarger mr-3 ml-auto"}>
          <span>
            There has been
            <span className={"marketingModulesValueText"}>
              {` 1 `}
            </span>
            Completed Run
          </span>
        </div>
      );
    }

    if (totalRunCount > 0) {
      return (
        <div className={"marketingModulesTextLarger mr-3 ml-auto"}>
          <span>
            There have been
            <span className={"marketingModulesValueText"}>
              {` ${totalRunCount} `}
            </span>
            Completed Runs
          </span>
        </div>
      );
    }
  };

  const getEmailLink = () => {
    return (
      <div className={"d-flex"}>
        <div
          className={"ml-auto"}
          style={{
            fontSize: "smaller",
          }}
        >
          For assistance, email
          <a
            href={"mailto:support@opsera.io"}
            className={"marketingModulesTextLink ml-2"}
          >
            support@opsera.io
          </a>
        </div>
      </div>
    );
  };

  const getExpirationDate = () => {
    const expiration = DataParsingHelper.parseDate(accountMetrics?.expiration);

    if (!expiration) {
      return (
        <div className={"d-flex"}>
          <div className={"ml-auto mt-auto"}>
            <div
              style={{
                fontSize: "smaller",
              }}
            >
              Your free trial does not expire.
            </div>
          </div>
        </div>
      );
    }

    const parsedDate = expiration.toISOString().substring(0, 10);

    return (
      <div className={"d-flex"}>
        <div className={"ml-auto mt-auto"}>
          <div
            style={{
              fontSize: "smaller",
            }}
          >
            Your free trial will expire on {parsedDate}.
          </div>
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
        <div className={"d-flex"}>
          <div>
            <div className={"d-flex"}>
              <div className={" ml-auto"}>
                <OpseraInfinityLogoLarge
                  scale={.29}
                  className={"mt-3"}
                  flipHorizontally={true}
                />
              </div>
            </div>
            <div className={"mx-3 mt-3"}>
              {getExpirationDate()}
              {getEmailLink()}
            </div>
          </div>
          <div className={"m-3"}>
            <div className={"marketingModulesTextLarger"}>
              {getItemCounts()}
            </div>
            <div className={"my-2"}>
              {getWorkflowHealthStatus()}
            </div>
          </div>
        </div>
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
        <div className={"marketingModulesText"}>
          {getBody()}
        </div>
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

FreeTrialLandingAccountStatsWidget.propTypes = {
  className: PropTypes.string,
};

