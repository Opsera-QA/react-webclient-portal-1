import {Link} from "react-router-dom";
import React from "react";

export const breadcrumbItem = (breadcrumb) => {
  return (
      <li key={breadcrumb.name} className="breadcrumb-item">
        <Link to={"/" + breadcrumb.path}>{breadcrumb.label}</Link>
      </li>
  );
}
