import React, {useEffect, useState} from 'react';
import {getBreadcrumb} from "components/common/navigation/trails";

export default function useBreadcrumb(breadcrumbName) {
  const [breadcrumb, setBreadcrumb] = useState(undefined);

  useEffect(() => {
    setBreadcrumb(undefined);

    const foundBreadcrumb = getBreadcrumb(breadcrumbName);

    if (foundBreadcrumb) {
      setBreadcrumb({...foundBreadcrumb});
    }
  }, [breadcrumbName]);

  return breadcrumb;
}
