Step 1: Create a new project folder

```
mkdir nodejs-express-ts
cd nodejs-express-ts
```

Step 2: Initialize a new Node.js project

```
npm init -y

```

Step 3: Make a Simple Server with Express 

```

npm i express

```


Step 4: Install TypeScript

```
npm i --save-dev typescript
npm install --save-dev @types/express @types/node
npx tsc --init

{ 
 "compilerOptions": {
    ... 
   "outDir": "build" ,    
   "rootDir": "src" ,  
}
}
mkdir src
mkdir build
```

Step 5: Create an Express server with a .ts extension
```
// src/app.ts

import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res)=>
{
     res.send('Hello World');
});
 app.listen(port, ()=>{
     console.log(
`Connected successfully on port ${port}`)
});
```

Step 6: Building or Transpiling the TypeScript files
npx tsc
Step 7: Run the Project

node build/app.js