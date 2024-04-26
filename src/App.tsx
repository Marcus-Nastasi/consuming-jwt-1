import { useState } from "react";

export default function App() {
   const [ responses, setResponses ] = useState([]);

   async function handleSubmit(e: any): Promise<void> {
      e.preventDefault();
      
      const inputUser: any = document.getElementById('user');
      const inputPassword: any = document.getElementById('password');

      const url: string = "http://localhost:3001/login";
      const config: object = {
         method: "post", 
         body: JSON.stringify({ user: inputUser.value, password: inputPassword.value })
      };

      try {
         const request = await fetch(url, config);
         const response = await request.json();
         console.log(response);
      } catch(e) {
         console.log("error: " + e)
      };
   };

   return (
      <>
         <section>

            <form onSubmit={handleSubmit} method="post">

               <label htmlFor="user">Login</label>
               <input type="text" name="user" id="user" />

               <label htmlFor="password">Password</label>
               <input type="password" name="password" id="password" />

               <button type="submit">send</button>

            </form>

         </section>
      </>
  )
};


