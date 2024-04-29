import { useState } from "react";
import Task from "./interfaces/Tasks/Tasks";
import Login from "./interfaces/Login/Login";

export default function App() {
   const [ token, setToken ] = useState<string>('');
   const [ resp, setResp ] = useState<Array<Task>>([]);
   const [ fetchError, setFetchError ] = useState<boolean>(false);
   const [ errorMessage, setErrorMessage ] = useState<string>('');

   async function handleTokenSubmit(e: any): Promise<void> {
      e.preventDefault();

      const [ user, pass ]: any = [ document.getElementById('user'), document.getElementById('password') ];
      const url: string = 'http://localhost:3001/login';
      const options: object = {
         method: 'post',
         body: JSON.stringify({ user: user.value, password: pass.value }),
         headers: new Headers({ 'content-type': 'application/json' })
      };

      try {
         const req: Response = await fetch(url, options);
         const res: Login = await req.json();
         setToken(res.token);
      } catch(e: any) {
         handleError(e.message);
      }
   };

   async function handleGetApi(e: any): Promise<void> {
      e.preventDefault();
      
      try {
         const options: object = { headers: new Headers({ 'x-access-token': token }) };
         const req: Response = await fetch('http://localhost:3001/api', options);
         const res: Array<Task> = await req.json();
   
         setResp(res);
      } catch(e: any) {
         handleError(e.message);
      }
   };

   const handleError = (e: any) => {
      if(e) {
         setErrorMessage(e);
         setFetchError(true);
         setTimeout(() => setFetchError(false), 1800);
      };
   };

   return (
      <>
         <section id="topSec" style={topSectionStyle}>
            <section style={middleSectionStyle}>
               <form style={formStyle}>

                  <label style={labelStyle} htmlFor="user">Login</label>
                  <input style={inputStyle} type="text" name="user" id="user" />

                  <label style={labelStyle} htmlFor="password">Password</label>
                  <input style={inputStyle} type="password" name="password" id="password" />

                  <button style={formButton} onClick={handleTokenSubmit} type="submit">send</button>

               </form>

               <button style={formButton} onClick={handleGetApi}>API</button>

               {resp.map((r: Task) => <p key={String(r.id)}> {r.description} </p>)}
            </section>

            {fetchError ?
               <div style={errorBox}>
                  <p> {errorMessage} </p>
               </div> : ''
            }
            
         </section>
      </>
  )
};

const topSectionStyle: object = {
   display: 'flex',
   flexDirection: 'column-reverse',
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#0093E9',
   backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
   height: '100vh',
   fontFamily: 'sans-serif'
};

const middleSectionStyle: object = {
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: '#8EC5FC',
   backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
   padding: '2rem',
   height: '50vh',
   width: '40%',
   borderRadius: '2rem'
};

const formStyle: object = {
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-evenly',
   height: '80%',
   fontSize: '2.2rem'
};

const labelStyle: object = {
   color: 'black',
   fontFamily: 'sans-serif'
};

const inputStyle: object = {
   padding: '0.5rem',
   borderRadius: '2rem'
};

const formButton: object = {
   width: '20rem',
   padding: '0.3rem',
   marginTop: '1rem',
   fontSize: '1rem',
   cursor: 'pointer',
   alignSelf: 'center',
   borderRadius: '0.5rem'
};

const errorBox: object = {
   width: '30%',
   padding: '2rem',
   position: 'fixed',
   top: '2.3rem',
   backgroundColor: '#ff5576',
   backgroundImage: 'linear-gradient(90deg, #ff5576 0%, #ff1655 55%, #ff5576 100%)',     
   color: 'white',
   textAlign: 'center',
   fontSize: '2rem',
   fontWeight: 'bold',
   fontFamily: 'sans-serif',
   borderRadius: '0.8rem'
};

