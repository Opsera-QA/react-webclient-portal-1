import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date/date.helpers";
import {getFormattedDate, getFormattedTimestamp} from "components/common/fields/date/DateFieldBase";

export default function CountdownUntilDateFieldBase(
  {
    date,
  }) {
  const [formattedDate, setFormattedDate] = useState(undefined);

  useEffect(() => {
    const parsedDate = DataParsingHelper.parseDate(date);

    const timer = setInterval(() => {
      setFormattedDate(convertFutureDateToDhmsFromNowString(parsedDate));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [date]);

  if (date == null) {
    return <span></span>;
  }

  if (formattedDate == null) {
    return <span>{getFormattedTimestamp(date)}</span>;
  }

  return (<span>{formattedDate}</span>);
}

CountdownUntilDateFieldBase.propTypes = {
  date: PropTypes.any,
};