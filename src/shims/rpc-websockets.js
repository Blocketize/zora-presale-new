// // src/shims/rpc-websockets.js
// // Use the browser's native WebSocket as the base
// const NativeWebSocket = globalThis.WebSocket;

// export class RpcWebSocketCommonClient extends NativeWebSocket {
//   constructor(address, options) {
//     super(address, options);
//     this.listeners = {};
//   }

//   on(event, callback) {
//     this.listeners[event] = callback;
//     super.addEventListener(event, callback);
//   }

//   off(event) {
//     if (this.listeners[event]) {
//       super.removeEventListener(event, this.listeners[event]);
//       delete this.listeners[event];
//     }
//   }

//   close() {
//     super.close();
//   }
// }

// // Export WebSocket as a named export to satisfy the import
// export const WebSocket = RpcWebSocketCommonClient;

// // Export as default for RpcWebSocketCommonClient import
// export default RpcWebSocketCommonClient;

// // Export createRpc for the websocket.browser import
// export const createRpc = (address, options) => {
//   return new RpcWebSocketCommonClient(address, options);
// };


// src/shims/rpc-websockets.js
// src/shims/rpc-websockets.js
class WebSocketClient {
  constructor(url) {
    this.ws = new window.WebSocket(url);
    console.log('WebSocketClient initialized with URL:', url);
  }
  on(event, callback) {
    this.ws.addEventListener(event, callback);
  }
  send(data) {
    this.ws.send(data);
  }
  close() {
    this.ws.close();
  }
}

const createRpc = (url) => {
  console.log('createRpc called with URL:', url);
  return new WebSocketClient(url);
};

// Export both to cover all bases
export default createRpc;
export { WebSocketClient };