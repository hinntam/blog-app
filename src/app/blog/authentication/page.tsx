"use client"
import Link from "next/link";
import { useUserAuth } from "../../_utils/auth-context";

export default function SignInPage(){
    const{user, gitHubSignIn, firebaseSignOut}= useUserAuth();
    async function handleSignIn(){
        try{
            await gitHubSignIn();
        }
        catch(error){
            console.log(error);

        }
    }
    async function handleSignOut() {
        try{
            await firebaseSignOut();
        }
        catch(error){
            console.log(error);
        }
    }

    console.dir(user);



    return(
        <main>
           <h1>AskCalgary Control Panel</h1>
            <div>
            {user ? (
                <div>
                    <p>Signed in as {user.displayName} {user.email} !</p>
                    <button
                    type="button"
                    className="text-lg text-white bg-blue-500 rounded px-2 py-1 mt-4"
                    onClick={handleSignOut}
                    >Sign out</button>
                    <div className="mt-4 rounded bg-gray-100 p-4">
                        <Link href="/blog/posts">Continue to your app</Link>
                    </div>
                    
                </div>
            ):(
                <div>
                    <button
                    type="button"
                    className="text-lg text-white bg-blue-500 rounded px-2 py-1 "
                    onClick={handleSignIn}
                    >Sign in with Github</button>

                </div>
            )}    
            
            </div>
        </main>
    )
}