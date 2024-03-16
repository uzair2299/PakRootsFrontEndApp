export const API_BASE_URL = 'http://localhost:8081'; // Your base API URL
export const API_VERSIONS = {
    v1: 'v1',
    v2: 'v2',
  };
  export const API_ENDPOINTS = {
    permissionV1: `${API_BASE_URL}/api/${API_VERSIONS.v1}/permission`,
    permissionV2: `/api/${API_VERSIONS.v2}/permission`,
    // Add more endpoints as needed
  };