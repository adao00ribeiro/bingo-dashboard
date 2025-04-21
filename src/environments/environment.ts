const newLocal = '${api}';
const newLocal_1 = '${API_WS}';
export const environment = {
  production: false,
  api: newLocal || 'http://srv695438.hstgr.cloud',
  API_WS: newLocal_1 || 'ws://srv695438.hstgr.cloud/ws'
};
