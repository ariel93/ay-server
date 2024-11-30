"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
//# sourceMappingURL=server.js.map