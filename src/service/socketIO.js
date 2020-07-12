import io from 'socket.io-client';
export const socketService = function socketService(userId, token) {
  //console.log('~~~~~~~~~socket Service', userId);
  let socket;
  if (!socket) {
    socket = io.connect('http://192.168.0.13:4001', {
      transports: ['websocket'],
      query: {
        userId: userId,
        //token: token,
      },
    });
  }
  return socket;
};
// export const startSocketIO = store => {
//   socket.connect();

//   socket.on('connect', () => {
//     console.log('~~~~socket service connected');
//     //const {userId} = store.getState().user;
//   });
//   socket.on('disconnect', () => {
//     console.log('~~~~connection to server lost.');
//   });

//   socket.on('newMessage', message => {
//     console.log('~~~new message to server lost.');
//     //store.dispatch(storePublicMessages([message]));
//   });
// };
