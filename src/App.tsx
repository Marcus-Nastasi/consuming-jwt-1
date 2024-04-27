import { useState } from "react";

export default function App() {
   const [ token, setToken ] = useState('');
   const [ resp, setResp ] = useState([]);

   async function handleSubmit(e: any): Promise<void> {
      e.preventDefault();
      
      const response = await fetch('http://localhost:3001/api', {
         headers: new Headers({ 'x-access-token': token })
      });
      const converted = await response.json();

      setResp(converted);
   };

   async function postToToken(e: any): Promise<void> {
      e.preventDefault();

      const user: any = document.getElementById('user');
      const pass: any = document.getElementById('password');

      const url: string = 'http://localhost:3001/login';
      const options: object = {
         method: 'post',
         body: JSON.stringify({ user: user.value, password: pass.value }),
         headers: new Headers({'content-type': 'application/json', })
      };

      const req = await fetch(url, options);
      const res = await req.json();

      setToken(res.token);
   }

   return (
      <>
         <section>

            <form method="post" action="http://localhost:3001/login">

               <label htmlFor="user">Login</label>
               <input type="text" name="user" id="user" />

               <label htmlFor="password">Password</label>
               <input type="password" name="password" id="password" />

               <button onClick={postToToken} type="submit">send</button>

            </form>

            <button onClick={handleSubmit}>API</button>

            {resp.map((r: any) => <p key={r.id}> {r.description} </p>)}

         </section>
      </>
  )
};


