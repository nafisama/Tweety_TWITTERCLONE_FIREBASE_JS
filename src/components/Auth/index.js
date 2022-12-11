import React, { useContext,useState,useMemo} from 'react';
import Lottie from 'react-lottie-player'
import AuthAnimation from "../../../public/assets/animations/auth-page-animation.json.json" 
import Button from '../Button';
import useForm from "../../hooks/useForm";
import {FcGoogle} from "react-icons/fc";
import {RiLoader4Line} from "react-icons/ri";
import { 
  GlobalContext, 
  GlobalDispatchContext 
} from '../../state/context/GlobalContext';
import {auth} from "../../lib/firebase";
import {
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword
} from "firebase/auth";
import {handlePromise} from "../../utils/handlePromise";
import {toast} from "react-hot-toast";
import LoadingOverlay from '../LoadingOverlay';

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const {isAuthenticated,isOnboarded,isLoading,user} =useContext(GlobalContext);
  
  const dispatch = useContext(GlobalDispatchContext);
  
  const {form, onChangeHandler } = useForm({
    email:'', 
    password:'',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      {
        type:"SET_LOADING",
        payload:{
          isLoading:true
        },
      }
    );
    let error =null;
    if (isLoginForm){
      const [data,loginError] = await handlePromise(
        signInWithEmailAndPassword(auth,form.email,form.password)
      );
      error = loginError
    }else{
      const [data,signupError] =await  handlePromise(createUserWithEmailAndPassword(auth,form.email,form.password));
      error = signupError;
    }
    dispatch(
      {
        type:"SET_LOADING",
        payload:{
          isLoading:false
        }
      });
      if(!error)toast.error(error.message)

  };

  const isDisabled = useMemo(() =>{
    return !Object.values(form).every((val) => !!val);
  },[form]);
  
  
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className='flex h-4/5 w-4/5'>
        <div className='w-full h-full'>
          <Lottie
            loop
            animationData={AuthAnimation}
            play
            className='w-full h-full'
          />
        </div>
        
        <div className=' relative w-full bg-white flex flex-col space y-5border  border-gray-300 p-10 '>
          {isLoading && <LoadingOverlay/>}
          <form 
            onSubmit={submitHandler} 
            className="flex flex-col item-center space-y-5"
            >
            <div className='="tracking-wider text-5xl my-5'>Tweety</div>
            <input 
              type ="email" 
              name="email" 
              id="email" 
              onChange={onChangeHandler} 
              value={form.email}
              className ='bg-gray-100 hover:bg-transparent 
              focus:bg-transparent border placeholder:text-sm 
              py-1 px-2 outline-none w-full 
              rounded-sm focus:border-gray-400'
              placeholder="Email"
            /> 
            <input 
            type ="password" 
            name="password" 
            id="password" 
            onChange={onChangeHandler} 
            value={form.password}
            className ='bg-gray-100 hover:bg-transparent 
              focus:bg-transparent border placeholder:text-sm 
              py-1 px-2 outline-none w-full 
              rounded-sm focus:border-gray-400'
              placeholder="Password"
            /> 
            <button 
              type ='submit' 
              className="bg-blue-500 py-2 px-6 text-white active:scale-95 
              transform transistion w-full disabled:bg-opacity-50 disabled:scale-100 rounded py-1 text-sm font-semibold"
              disabled={isDisabled}>
                {isLoginForm ? "Log In " :"Sign up"}
            </button>
          </form> 
          <div clasName= 'w-full flex items-center justify-center my-5 space-x-2 py-2 px-3'>
            <div className="h-[0.8px] w-full bg-slate-400"/>
            <div className="text-gray-600 font-semibold text-center text-sm py-2 px-2">
              --OR--
            </div>
            
          </div>
          <div className="w-full text-center space-x-2 text-yellow-500 flex items-center justify-center">
            <FcGoogle className="inline-block text-2xl mr-2"></FcGoogle>
          <span className='font-semibold text-m'> 
          
          {isLoginForm ? "Log In with Google " :"Sign up with Google"}</span>
          </div>
          <div className="text-gray-600 font-semibold text-center text-sm py-2 px-2">
              --OR--
          </div>
          <div className='w-full h-full py-3 text-center text-indigo-900 px-2 '>
             Create an Account </div>
            <button onClick ={() => setIsLoginForm((prev) => !prev )}
            className ="ml-2 font-semibold text-yellow-400"
            > {isLoginForm ? "Sign up" : "Login "}
               </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;