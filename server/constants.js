const ROLES_LIST = {
  // Role1: 1,
  nutrionist: 2,
  user: 3,
};

const ROLE_GROUPS = {
  // Group1: [ROLES_LIST.Role1],
  Group1: [ROLES_LIST.Role2],
  Group2: [ROLES_LIST.Role2, ROLES_LIST.Role3],
};

module.exports = {
  ROLES_LIST,
  ROLE_GROUPS,
};
