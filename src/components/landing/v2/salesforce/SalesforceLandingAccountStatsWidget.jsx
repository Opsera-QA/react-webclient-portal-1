import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import accountsActions from "components/admin/accounts/accounts-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { getSingularOrPluralString } from "components/common/helpers/string-helpers";
import { widgetHelper } from "temp-library-components/helpers/widgets/widget.helper";
import {EXTERNAL_LINKS} from "assets/links/externalLinks";
import { ExternalLink } from "temp-library-components/link/ExternalLink";
import WidgetDataBlockBase from "temp-library-components/widgets/data_blocks/WidgetDataBlockBase";
import {ImageBase} from "@opsera/react-vanity-set";
import {platformImageConstants} from "temp-library-components/image/platformImage.constants";

// TODO: This needs to be rewritten to be standardized and cleaned up
export default function SalesforceLandingAccountStatsWidget({ className }) {
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

    if (totalCount > 0 && totalCount <= 5) {
      return (
        <b className={"yellow"}>
          slightly unhealthy
        </b>
      );
    }

    if (totalCount > 5) {
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
          <div className={"my-4"}>
            Get started below to create your first Workflow.
          </div>
        </CenteredContentWrapper>
      );
    }

    if (totalRunCount === 0) {
      return (
        <CenteredContentWrapper>
          <div className={"my-4"}>
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
          Your Opsera workflows are {getWorkflowHealthText()}. You have completed <b>{totalRunCount}</b> {runText} across <b>{pipelineCount}</b> {pipelineText} and <b>{taskCount}</b> {taskText}.
      </div>
    );
  };

  const getEmailLink = () => {
    return (
      <div className={"d-flex"}>
        <div
          className={"ml-auto d-flex"}
          style={{
            fontSize: "smaller",
          }}
        >
          <span>For assistance, email</span>
          <ExternalLink
            link={EXTERNAL_LINKS.SUPPORT_EMAIL}
            label={"support@opsera.io"}
            className={"my-auto ml-1"}
          />
          <div className={"ml-1"}>or</div>
          <ExternalLink
            link={EXTERNAL_LINKS.FREE_TRIAL_REQUEST_HELP}
            label={"click here"}
            className={"ml-1 my-auto"}
          />.
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
        className={"marketingModulesText"}
        style={{
          minHeight: `calc(${widgetHelper.getWidgetPixelSize(6)} - 43px)`,
          height: `calc(${widgetHelper.getWidgetPixelSize(6)} - 43px)`,
        }}
      >
        <div
          style={{
            minHeight: `calc(${widgetHelper.getWidgetPixelSize(6)} - 75px)`,
            height: `calc(${widgetHelper.getWidgetPixelSize(6)} - 75px)`,
          }}
        >
          <div className={"d-flex"}>
            <CenteredContentWrapper>
              <div className={"mx-3"}>
                {getItemCounts()} {getWorkflowHealthStatus()}
              </div>
            </CenteredContentWrapper>
            <CenteredContentWrapper>
              <ImageBase
                imageSource={platformImageConstants.PLATFORM_IMAGE_LINKS.COLLABORATION_ALT}
                height={150}
              />
            </CenteredContentWrapper>
          </div>
        </div>
        <div className={"d-flex m-2"}>
          <div className={"ml-auto mt-auto"}>
            {getEmailLink()}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className={className}>
      <WidgetDataBlockBase
        title={getTitleText()}
        heightSize={6}
        isLoading={isLoading}
      >
        {getBody()}
      </WidgetDataBlockBase>
    </div>
  );
}

SalesforceLandingAccountStatsWidget.propTypes = {
  className: PropTypes.string,
};

