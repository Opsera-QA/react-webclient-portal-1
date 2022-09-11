// import React from "react";
// import PropTypes from "prop-types";
// import { HalfPieChart } from "half-pie-chart";
// import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
// import { fontThemeConstants } from "temp-library-components/theme/font.theme.constants";
// import { generateUUID } from "components/common/helpers/string-helpers";
// import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
//
// export function HalfPieChartBase(
//   {
//     leftConfiguration,
//     rightConfiguration,
//     className,
//     title,
//     subtitle,
//     useDarkMode,
//     chartName,
//   }) {
//   const parsedLeftConfiguration = DataParsingHelper.parseObject(leftConfiguration);
//   const parsedRightConfiguration = DataParsingHelper.parseObject(rightConfiguration);
//
//   if (parsedLeftConfiguration == null || parsedRightConfiguration == null) {
//     return null;
//   }
//
//   return (
//     <div className={className}>
//       <CenteredContentWrapper>{title}</CenteredContentWrapper>
//       <HalfPieChart
//         name={chartName}
//         right={[parsedRightConfiguration]}
//         left={[parsedLeftConfiguration]}
//         fontStyle={fontThemeConstants.FONT_FAMILIES.INTER}
//         dark={useDarkMode}
//         centerText={subtitle}
//         cardBackColor={"white"}
//       />
//     </div>
//   );
// }
//
// HalfPieChartBase.propTypes = {
//   leftConfiguration: PropTypes.object,
//   rightConfiguration: PropTypes.object,
//   className: PropTypes.string,
//   title: PropTypes.string,
//   subtitle: PropTypes.string,
//   useDarkMode: PropTypes.bool,
//   chartName: PropTypes.string,
// };
//
// HalfPieChartBase.defaultProps = {
//   chartName: generateUUID(),
// };