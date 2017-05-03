import feathers from 'feathers/client';
import io from 'steal-socket.io';
import socketio from 'feathers-socketio/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';

const socket = io('<%= feathersUrl %>', {
  transports: ['websocket']
});
const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth({
    storage: window.localStorage
  }));

export default feathersClient;
