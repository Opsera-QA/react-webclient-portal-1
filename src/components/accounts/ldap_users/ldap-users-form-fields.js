// TODO: put metadata on node server and pull down that way?
const ldapUsersFormFields = {
  name: {
    label: "Full User Name",
    id: "name",
    rules: {
      // isRequired: true
    }
  },
  preferredName: {
    label: "Preferred Name",
    id: "preferredName",
    rules: {
      // isRequired: true
    }
  },
  firstName: {
    label: "First Name",
    id: "firstName",
    rules: {
      isRequired: true
    }
  },
  lastName: {
    label: "Last Name",
    id: "lastName",
    rules: {
      isRequired: true
    }
  },
  emailAddress: {
    label: "Email Address",
    id: "emailAddress",
    rules: {
      isRequired: true
    }
  },
  division: {
    label: "Division",
    id: "division",
    rules: {
      // isRequired: true
    }
  },
  teams: {
    label: "Teams",
    id: "teams",
    rules: {
      // isRequired: true
    }
  },
  departmentName: {
    label: "Department Name",
    id: "departmentName",
    rules: {
      // isRequired: true
    }
  },
  title: {
    label: "Title",
    id: "title",
    rules: {
      // isRequired: true
    }
  },
  site: {
    label: "Site",
    id: "site",
    rules: {
      // isRequired: true
    }
  },
  opseraId: {
    label: "Opsera Customer Record",
    id: "opseraId",
    rules: {
      // isRequired: true
    }
  },
  users: {
    label: "LDAP Users",
    id: "users",
    rules: {
      // isRequired: true
    }
  },
  region: {
    label: "Region",
    id: "region",
    rules: {
      // isRequired: true
    }
  },
};

export default ldapUsersFormFields;