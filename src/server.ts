import app from "./app";

const bootstrap  = () =>{
  try{
    app.listen(process.env.PORT, ()=>{
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    })
  }catch(error){
    console.error('Failed to start server: ', error)
  }
}

import { envVars } from "./app/config/env";

// Then use it like this throughout server.ts:
// console.log(envVars.PORT);

// Typing 'env.' will give you full autocomplete for your secrets!
console.log(`✅ App running environment: ${envVars.NODE_ENV}`);

bootstrap()