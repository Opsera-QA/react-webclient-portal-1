import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faFileDownload } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import ButtonTooltip from "components/common/tooltip/ButtonTooltip";
import { parseError } from "components/common/helpers/error-helpers";
import pipelineActions from "../../../../../../../pipeline-actions";

function ProvarReportDownloadButton({
  pipelineId,
  stepId,
  runCount,
  expiryDate,
  visible,
  size,
  className,
  disabled,
  icon,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [downloading, setDownloading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const downloadReport = async () => {
    try {
      setDownloading(true);
      let url = undefined;
      const response =
        await pipelineActions.downloadReport(
          getAccessToken,
          cancelTokenSource,
          pipelineId,
          stepId,
          runCount,
          expiryDate,
        );
      if (response && response.status === 200) {
        url = response?.data?.message;
      }
      if (isMounted?.current === true && url != null) {
        window.open(url);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        toastContext.showSystemErrorToast(
          parsedError,
          "Could not download report for this task : ",
        );
      }
    } finally {
      if (isMounted?.current === true) {
        setDownloading(false);
      }
    }
  };

  if (!visible) {
    return null;
  }

  const getLabel = () => {
    if (downloading) {
      return "Downloading";
    }

    return `Download Report`;
  };

  const calculateTimeDiff = (date) => {
    const expiryDate = new Date(date);
    const currentDate = new Date();
    const timeDiffMinutes = Math.round(
      (expiryDate - currentDate) / (1000 * 60),
    );
    const hours = Math.floor(timeDiffMinutes / 60);
    const minutes = timeDiffMinutes % 60;

    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    let outputString = `Expires in `;
    if (days > 0) {
      outputString += `${days} day${days > 1 ? "s" : ""}`;
    }
    if (remainingHours > 0) {
      outputString += `${days > 0 ? ", " : ""}${remainingHours} hour${
        remainingHours > 1 ? "s" : ""
      }`;
    }
    if (minutes > 0) {
      outputString += `${
        days > 0 || remainingHours > 0 ? ", and " : ""
      }${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
    return outputString;
  };

  return (
    <ButtonTooltip
      trigger={["hover", "focus"]}
      innerText={calculateTimeDiff(expiryDate)}
    >
      <div className={className}>
        <Button
          size={size}
          variant={"primary"}
          disabled={downloading === true || disabled === true}
          onClick={downloadReport}
        >
          <span>
            <IconBase
              icon={icon}
              className={"mr-2"}
              isLoading={downloading}
            />
            {getLabel()}
          </span>
        </Button>
      </div>
    </ButtonTooltip>
  );
}

ProvarReportDownloadButton.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  runCount: PropTypes.number,
  expiryDate: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  visible: PropTypes.bool,
};

ProvarReportDownloadButton.defaultProps = {
  size: "sm",
  icon: faFileDownload,
};

export default ProvarReportDownloadButton;
