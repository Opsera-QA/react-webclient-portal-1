import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date/date.helpers";

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

  const getDate = () => {
    if (date == null) {
      return "";
    }

    return formattedDate;
  };

  return (
    <div style={{
      minWidth: "275px",
      width: "275px",
      maxWidth: "275px",
    }}>
      {getDate()}
    </div>
  );
}

CountdownUntilDateFieldBase.propTypes = {
  date: PropTypes.any,
};