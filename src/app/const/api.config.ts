export const API_BASE_URL = 'http://localhost:8081'; // Your base API URL
export const API_VERSIONS = {
    v1: 'v1',
    v2: 'v2',
  };
  export const API_ENDPOINTS = {
    permissionV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/permission/getAllActive`,
    permissionV2: `/api/${API_VERSIONS.v2}/permission`,
    resources_getAllResourcesV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/getAllResources`,
    resources_getAllResourcesWithPermissions: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/getAllResourcesWithPermissions`,
    resources_getResourceById: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/getResourceById`,
    assign_resource_permisson: `${API_BASE_URL}/api/${API_VERSIONS.v1}/resources/assignResourcePermission`,
    // Add more endpoints as needed
  };