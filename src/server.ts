import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // אפשר להגביל זאת לאתרים מסוימים אם רוצים
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // שליחת הודעה עם תוכן משתנה כל 5 שניות
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    console.log(`Sending message: Update #${counter}`);
    socket.emit('message', `Hello Ariel! Update #${counter}`);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    clearInterval(interval); // לעצור את ה-interval כאשר המשתמש מתנתק
  });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
