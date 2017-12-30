import EventEmitter from 'eventemitter3'
let ws;
class TemperaturesEmitter extends EventEmitter {
    connect() {
        ws = new window.WebSocket('ws://127.0.0.1:8080');
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);    

            if (!data.type) {
                return;
            }
            this.emit(data.type, data.data);
        }
    }   
}

export default TemperaturesEmitter;