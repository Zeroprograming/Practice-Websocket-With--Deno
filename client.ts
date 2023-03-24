import { input } from "https://deno.land/x/inquirer@v0.0.4/mod.ts";
const ws = new WebSocket("ws://localhost:8000/websocket");

ws.onopen = () => {
    console.log("Conected to server");

    ws.send(" I'm Conected ");


}

ws.onmessage = (m) => {
    console.log("Message of server: ", m.data);
}

let res = "";
while (res !== "exit"){
    res = await input({message: "What do you want?"});
    ws.send(res);
}
