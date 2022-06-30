import React, { useContext } from "react";
import {useHistory} from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";

function OverviewLandingToolchainContentBlock() {
  const history = useHistory();
  const {
    userAccessRoles,
    isSassUser,
    isOpseraAdministrator,
    isPowerUser,
    isSiteAdministrator,
  } = useContext(AuthContext);

  const loadPlatforms = () => {
    history.push("/platform");
  };

  const isLinkAllowed = () =>  {
    if (
      userAccessRoles != null
      && (isSassUser() === true
        || isOpseraAdministrator() === true
        || isPowerUser === true
        || isSiteAdministrator === true
      )) {
      return true;
    }
  };

  const getDynamicWording = () => {
    if (isLinkAllowed() === true) {
      return (`
        You choose your tools, we take care of the rest. Put together the perfect CI/CD stack that fits your
          organization’s goals with zero vendor lock-in.
      `);
    }

    return (`
      Opsera allows teams to choose their tools, we take care of the rest. 
      Put together the perfect CI/CD stack that fits your organization’s goals with zero vendor lock-in.  
      Reach out to your site administrators for more details.
    `);
  };

  return (
    <div className={"landing-content-module"}>
      <div>
        <img
          alt="Toolchain Automation"
          src="/img/platform.png"
          width="195"
          height="225"
          className={isLinkAllowed() === true ? "d-inline-block align-top pointer" : "d-inline-block align-top"}
          onClick={isLinkAllowed() === true ? loadPlatforms : undefined}
        />
      </div>
      <div className="mt-4">
        <div className="h5 text-color">
          <div>Toolchain Automation</div>
        </div>
        <div className="text-muted pr-2">
          {getDynamicWording()}
        </div>
      </div>
    </div>
  );
}

export default OverviewLandingToolchainContentBlock;
