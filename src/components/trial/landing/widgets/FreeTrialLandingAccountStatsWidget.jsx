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
import { widgetHelper } from "temp-library-components/helpers/widgets/widget.helper";

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

  const getItemCounts = () => {
    const pipelineCount = DataParsingHelper.parseInteger(accountMetrics?.pipelineMetrics?.totalCount, 0);
    const taskCount = DataParsingHelper.parseInteger(accountMetrics?.taskMetrics?.totalCount, 0);
    const totalCount = pipelineCount + taskCount;

    if (totalCount === 0) {
      return (
        <div>You have no configured offerings at this time.</div>
      );
    }
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
            Select a workflow below and hit run to get started.
          </div>
        </CenteredContentWrapper>
      );
    }

    const pipelineText = getSingularOrPluralString(pipelineCount, "pipeline", "pipelines");
    const taskText = getSingularOrPluralString(taskCount, "task", "tasks");
    const runText = getSingularOrPluralString(totalRunCount, "run", "runs");

    return (
      <div>
        <div>
          Your Opsera workflows are {getWorkflowHealthText()}
        </div>
        <div className={"mt-3"}>
          <div>
            You have completed <b>{totalRunCount}</b> {runText} across <b>{pipelineCount}</b> {pipelineText} and <b>{taskCount}</b> {taskText}
          </div>
        </div>
      </div>
    );
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
        <CenterLoadingIndicator
          type={"Account Overview"}
        />
      );
    }

    return (
      <div
        style={{
          minHeight: `calc(${widgetHelper.getWidgetPixelSize(6)} - 43px)`,
          height: `calc(${widgetHelper.getWidgetPixelSize(6)} - 43px)`,
        }}
      >
        <div
          className={"d-flex"}
          style={{
            minHeight: `calc(${widgetHelper.getWidgetPixelSize(6)} - 95px)`,
            height: `calc(${widgetHelper.getWidgetPixelSize(6)} - 95px)`,
          }}
        >
          <div className={"d-flex"}>
            <div className={"d-flex"}>
              <div className={"d-none d-sm-inline"}>
                <OpseraInfinityLogoLarge
                  scale={.29}
                  className={"mt-3"}
                />
              </div>
            </div>
            <CenteredContentWrapper>
              <div className={"marketingModulesTextLarger mx-2"}>
                {getItemCounts()}
              </div>
              <div className={"mt-3 marketingModulesTextLarger mx-2"}>
                {getWorkflowHealthStatus()}
              </div>
            </CenteredContentWrapper>
          </div>
        </div>
        <div className={"d-flex m-2"}>
          <div className={"ml-auto mt-auto"}>
            <div>
              {getExpirationDate()}
            </div>
            <div>
              {getEmailLink()}
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className={className}>
      <FreeTrialWidgetDataBlockBase
        title={getTitleText()}
        heightSize={6}
        isLoading={isLoading}
        className={"marketingModulesText"}
      >
        {getBody()}
      </FreeTrialWidgetDataBlockBase>
    </div>
  );
}

FreeTrialLandingAccountStatsWidget.propTypes = {
  className: PropTypes.string,
};

