import axios from "axios";

export default async function webSocket(){
    
    try {
        const userName = 'root'; // Substitua pelo seu nome de usuário
        const password = 'Big4dev2024'; // Substitua pela sua senha
        const ipAddress = 'localhost'; // Substitua pelo IP do servidor
        const port = '80'; // Substitua pela porta configurada
        // const prefix = 'ws'; // Substitua pelo prefixo se necessário
    
        const wsUrl = `ws://${userName}:${password}@${ipAddress}:${port}/events`;
    
        const ws = new WebSocket(wsUrl);
    
        ws.onopen = () => {
          console.log('Conectado ao WebSocket do Axxon One');
    
          // Comando para subscrever-se aos eventos das câmeras
          const subscribeMessage = {
            include: [
              "hosts/Server1/DeviceIpint.1/SourceEndpoint.video:0:0", 
              "hosts/Server1/DeviceIpint.6/SourceEndpoint.video:0:0"
            ],
            exclude: []
          };
    
          ws.send(JSON.stringify(subscribeMessage));
        };
    
        ws.onmessage = (event) => {
          const eventData = JSON.parse(event.data);
          console.log('Evento recebido:', eventData);
    
        };
    
        ws.onerror = (error) => {
          console.error('Erro no WebSocket:', error);
        };
    
        ws.onclose = () => {
          console.log('Conexão WebSocket fechada');
        };
    
        return () => {
          ws.close();
        };
      }
     catch (error) {
      console.log(error);
      alert("Erro!");
    }

   
}