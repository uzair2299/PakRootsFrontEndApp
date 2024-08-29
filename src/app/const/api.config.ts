export const API_BASE_URL = 'http://localhost:8081'; // Your base API URL
export const API_VERSIONS = {
    v1: 'v1',
    v2: 'v2',
  };
  export const API_ENDPOINTS = {

    categories_getAllActiveCategoriesV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/categories/getActiveCategoryHierarchy`,
    categories_getAllCategoriesV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/categories/getAllCategories`,
    categories_createCategoryV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/categories/createCategory`,


    permissionV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/permission/getAllActive`,
    permissionV2: `/api/${API_VERSIONS.v2}/permission`,
    
    resources_getAllResourcesV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/getAllResources`,
    resources_getAllResourcesWithPermissions: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/getAllResourcesWithPermissions`,
    resources_getResourceById: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/getResourceById`,
    assign_resource_permisson: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/assignResourcePermission`,


    resources_getAllRolesV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/roles/getAllRoles`,
    roles_getRoleByIdV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/roles/getRoleById`,
    roles_createRoleV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/roles/createRole`,
    roles_updateRoleV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/roles/updateRole`,
    roles_assignUserRoles: `${API_BASE_URL}/api/${API_VERSIONS.v1}/roles/assignUserRoles`,
    roles_assignRolesPermission: `${API_BASE_URL}/api/${API_VERSIONS.v1}/roles/assignRolesPermission`,
    roles_getRoleAssignResourcesPermission: `${API_BASE_URL}/api/${API_VERSIONS.v1}/roles/getRoleAssignResourcesPermission`,
    // Add more endpoints as needed


    users_getAllUsersV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/users/getAllUsers`,
    users_resetPasswordV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/users/resetUserPassword`,
    users_getUserDetailWithRolesByIdV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/users/getUserRoles`,
    

  };