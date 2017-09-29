//socket factory
app.factory('socket', function (socketFactory) {
    const myIoSocket = io.connect('http://localhost');
      mySocket = socketFactory({
        ioSocket: myIoSocket
      });
    return mySocket;
  });