import React  from "react";
import PropTypes from "prop-types";
import {formatDate, hasDateValue} from "components/common/helpers/date/date.helpers";
import {addDays, isSameDay} from "date-fns";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";
import {faCalendar} from "@fortawesome/pro-light-svg-icons";

function MetricDateRangeBadge(
  {
    startDate,
    endDate,
    className,
  }) {
  const getDateBadgeText = () => {
    if (hasDateValue(startDate) !== true || hasDateValue(endDate) !== true) {
      const formattedStartDate = formatDate(addDays(new Date(), -90));
      const formattedEndDate = formatDate(new Date());
      return (`${formattedStartDate} to ${formattedEndDate}`);
    }

    if (isSameDay(new Date(startDate), new Date(endDate))) {
      return (formatDate(startDate));
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    return (`${formattedStartDate} to ${formattedEndDate}`);
  };

  return (
    <MetricBadgeBase
      badgeText={getDateBadgeText()}
      icon={faCalendar}
      className={className}
    />
  );
}

MetricDateRangeBadge.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  className: PropTypes.string,
};

export default React.memo(MetricDateRangeBadge);