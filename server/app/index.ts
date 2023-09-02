import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import { IClientToServerEvents, IInterServerEvents, IServerToClientEvents, ISocketData } from './interfaces/global.interface';

const app: Express = express();
const PORT: number = 8080;

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:3000',
};

app.use(cors(options));


const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    }
});

app.get('/socket.io', (req: Request, res: Response) => {
    res.send("Hello world");
    console.log('hi')
});


io.on('connection', (client) => {
    console.log('user connected')

    client.on('send-message', function (message) {
        console.log(message)
        io.sockets.emit('new-message', {
            ...message, 
            create_at: new Date()
        });
    })
  
    // เมื่อ Client ตัดการเชื่อมต่อ
    client.on('disconnect', () => {
        console.log('user disconnected')
    })


});

const server = app.listen(PORT || process.env.PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});

io.listen(server);