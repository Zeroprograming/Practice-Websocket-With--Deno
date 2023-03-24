import { Application, Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";

const app = new Application();
const router = new Router();


router.get("/websocket", (ctx)=> {

    if(!ctx.isUpgradable){
        ctx.throw(501);
    }

    const ws = ctx.upgrade(); 

    ws.onopen = () => {
        console.log("New Client conected!");
    }

    ws.onclose = () => {
        console.log("Client Disconect of this server");
    }


    ws.onmessage = (m) => {
        console.log("mensagge: ", m.data)
        ws.send(m.data as string);

        if(m.data === "exit") {
            ws.close();
        }
    }
});


app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on port: ", 8000)
await app.listen({ port: 8000 });
