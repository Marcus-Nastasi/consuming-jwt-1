import { StrictMode, useState } from "react";

export default function App() {
   const [ responses, setResponses ] = useState([]);

   async function handleSubmit(e: any): Promise<void> {
      e.preventDefault();
      
      const inputUser: any = document.getElementById('user');
      const inputPassword: any = document.getElementById('password');

      const url: string = "http://localhost:3001/api";
      // const config: object = {
      //    method: "post", 
      //    body: 
      // };

      try {
         const request: Response = await fetch(url)
         const response: any = await request.json();
         setResponses(response);
         console.log(response);
      } catch(e) {
         console.log("error: " + e)
      };
   };

   return (
      <>
         <section>

            <form method="post" action="http://localhost:3001/login">

               <label htmlFor="user">Login</label>
               <input type="text" name="user" id="user" />

               <label htmlFor="password">Password</label>
               <input type="password" name="password" id="password" />

               <button  type="submit">send</button>

            </form>

            <button onClick={handleSubmit}>API</button>

         </section>
      </>
  )
};


