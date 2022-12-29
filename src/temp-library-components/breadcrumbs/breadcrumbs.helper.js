import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const breadcrumbsHelper = {};

breadcrumbsHelper.getPathLink = (breadcrumb, pathParameter) => {
  const parsedBreadcrumb = DataParsingHelper.parseObject(breadcrumb, {});

  if (parsedBreadcrumb?.pathFunction && pathParameter) {
    return parsedBreadcrumb.pathFunction(pathParameter);
  }

  return parsedBreadcrumb.path;
};
