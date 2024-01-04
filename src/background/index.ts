import { WSReactToContentScripts, ISocketMessage } from "../types/socketMessage";
import setAbortableTimeout from '../utility/setAbortableTimeout'

class SocketService {
  server = 'ws://localhost:3001'
  socket: WebSocket

  randomId() {
    return Math.floor(Math.random() * 90000000 + 10000000).toString();
  }

  sendMessageTab(message: ISocketMessage) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0 && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: message.type, data: message.data });
      }
    });
  }

  logToTab(message: string){
    console.log(typeof message)
    console.log(message)
    if(typeof message === 'object'){
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0 && tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, message);
          return
        }
      });
    } else {
      try {
        const json = JSON.parse(message)
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs.length > 0 && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'log', data: json});
          }
        });
        return
      } catch {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs.length > 0 && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, `Background: ${message}`);
          }
        });
        return
      }
    }
    
  }

  declareTabMessagesHandlerReceiver() {
    chrome.runtime.onMessage.addListener((message: ISocketMessage, sender, sendResponse) => {
      this.storeMessage({...message, used: false});
    });
  }

  async declareWebsockets(): Promise<void> {
    return new Promise(resolve => {
      const socket = new WebSocket(this.server);
    
      socket.onopen = () => {
        this.logToTab('Connected to the server');
        
        // Enviar un mensaje al servidor
        socket.send(JSON.stringify({type: 'connect_from_background', data: { hi: 'hi' }}));
        resolve()
      };
  
      socket.onmessage = (event) => {
        this.logToTab(`Received from server in background:`);
        this.logToTab(event.data)
        if(typeof event.data === "string") {
          this.sendMessageTab(JSON.parse(event.data))
        }
      };
  
      socket.onclose = () => {
        this.logToTab('Connection closed');
      };
  
      socket.onerror = (error) => {
          console.error(`WebSocket Error: ${error}`);
          this.logToTab(`${error}`)
      };
  
      this.socket = socket
    })
    
  }

  initSocket = async () => {
    
    await this.declareWebsockets()
    // Observar cambios en el almacenamiento y enviar mensajes cuando sea necesario
    this.monitorMessagesQueue();

    this.declareTabMessagesHandlerReceiver()
  }

  storeMessage = (message) => {
    chrome.storage.local.get(['messages'], (result) => {
      const messages = result.messages || []

       // Generar un ID único
      let uniqueId;
      do {
        uniqueId = this.randomId();
      } while (messages.some((msg) => msg.id === uniqueId));
      
      // Agregar el ID único al mensaje
      message.id = uniqueId;

      chrome.storage.local.set({messages: [...messages.filter(msg => !msg.used), message]}, () => {
        this.logToTab("Message stored");
        this.logToTab(message)
      });
    })
    
  }

  setMessageToUsedById = async (id: string) => {
    return new Promise(resolve => {
      chrome.storage.local.get(['messages'], async (result) => {
        const messages = result.messages || []
        const messageByIdQuery = messages.filter(msg => msg.id === id && !msg.used)

        if(messageByIdQuery && messageByIdQuery.length > 0) {
          const messageById = messageByIdQuery[0]
          messageById.used = true;
          const prevUnusedMessages = messages.filter(msg => !msg.used && msg.id !== id)
          chrome.storage.local.set({messages: [...prevUnusedMessages, messageById]}, () => {
            this.logToTab("Message stored");
            this.logToTab(messageById)
            resolve(messageById)
          });
        } else {
          resolve(null)
        }
      })
    })
  }

  getMessageById = async (id: string) => {
    return new Promise(resolve => {
      chrome.storage.local.get(['messages'], async (result) => {
        const messages = result.messages || []
        const messageIdQuery = messages.filter(msg => !msg.used && msg.id !== id)
        if(messageIdQuery && messageIdQuery.length > 0) {
            resolve(messageIdQuery[0])
        } else {
          resolve(null)
        }
      })
    })
  }

  getFirstUnusedMessage = async (): Promise<{[key: string]: unknown} | null> => {
    return new Promise(resolve => {
      chrome.storage.local.get(['messages'], async (result) => {
        const messages = result.messages || []
        const unusedMessages = messages.filter(msg => !msg.used)
        if(unusedMessages && unusedMessages.length > 0) {
          const firstUnusedMsg = unusedMessages[0]
          resolve(firstUnusedMsg)
        } else {
          resolve(null)
        }

      })
    }) 
  }

  // Función para monitorear el almacenamiento y enviar mensajes cuando sea necesario
  monitorMessagesQueue = () => {
    const { socket } = this
    setInterval(async () => {
      const message: {[key: string]: unknown} | null = await this.getFirstUnusedMessage()
        if (message && !message.used) {
          await new Promise<void>(async (resolve) => {
            let retries = 0;
            const maxRetries = 10
            await this.declareWebsockets(); // Intenta restablecer la conexión WebSocket
            while (retries < maxRetries) {
              const messageToSend = { ...message };
              this.logToTab("messageToSend");
              this.logToTab(JSON.stringify(messageToSend));

              const controller = new AbortController();
              const { signal } = controller;

              try {
                socket.send(JSON.stringify(messageToSend));
                await this.setMessageToUsedById(message.id as string)
                setAbortableTimeout(() => {
                  resolve()
                }, 5000, signal)
                return; // Éxito, salimos del bucle
              } catch (e) {
                console.error("Error al enviar el mensaje:", e);
                controller.abort()
                retries++;
                if (retries < maxRetries) {
                  this.logToTab(`Reintentando (intentos restantes: ${maxRetries - retries})...`);
                  await this.declareWebsockets(); // Intenta restablecer la conexión WebSocket
                } else {
                  console.error(`Se alcanzó el número máximo de intentos (${maxRetries}).`);
                  throw e; // Si se supera el número máximo de intentos, lanzar el error
                }
              }
            }
          })
        }
      
    }, 500); // Comprobar cada medio segundo
  }
}

const socketService = new SocketService()
chrome.storage.local.clear();
socketService.initSocket();

export {};
