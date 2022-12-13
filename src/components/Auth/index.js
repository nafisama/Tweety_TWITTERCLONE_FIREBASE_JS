import React, { useContext,useState,useMemo} from 'react';
import Lottie from 'react-lottie-player'
import AuthAnimation from "../../../public/assets/animations/auth-page-animation.json.json" 
import Button from '../Button';
import useForm from "../../hooks/useForm";
import {FcGoogle} from "react-icons/fc";
import { 
  GlobalContext, 
  GlobalDispatchContext 
} from '../../state/context/GlobalContext';
import {auth,db} from "../../lib/firebase";
import {
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword
} from "firebase/auth";
import {handlePromise} from "../../utils/handlePromise";
import {toast} from "react-hot-toast";
import LoadingOverlay from '../LoadingOverlay';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import useFetchCurrentUser from '../../utils/fetchCurrentUser';


const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const {isAuthenticated,isOnboarded,isLoading,user} =useContext(GlobalContext);
  
  const { fetchUser } = useFetchCurrentUser();

  const dispatch = useContext(GlobalDispatchContext);
  
  const {form, onChangeHandler,resetForm } = useForm({
    email:'', 
    password:'',
  });

  const {
    form:onboardingForm, 
    onChangeHandler:onboardingFormOnChangeHadler
  } = useForm({
    username:'',
    fullName:'',
   });
  
  
  const authenticate = async () => {
    if (isLoginForm){
      const [data,loginError] = await handlePromise(
        signInWithEmailAndPassword(auth,form.email,form.password)
      );
      return loginError;
    }else{
      const [data,signupError] =await  handlePromise(
        createUserWithEmailAndPassword(auth,form.email,form.password));
      return signupError;
    }
  };

  const setUserData = async () => {
    try {
      const userCollection = collection(db, 'users');

      const userQuery = query(
        userCollection,
        where('username', '==', onboardingForm.username)
      );

      const usersSnapshot = await getDocs(userQuery);

      if (usersSnapshot.docs.length > 0) {
        toast.error('username already exists');
        return;
      }

      await setDoc(doc(db, 'users', auth.currentUser.email), {
        fullName: onboardingForm.fullName,
        username: onboardingForm.username,
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      toast.success("Welcome! Let's start Tweeting! Click + to post ");

      dispatch({
        type: 'SET_IS_ONBOARDED',
        payload: {
          isOnboarded: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({
        type:"SET_LOADING",
        payload:{
          isLoading:true
        },
      });

    let error =null;
    error = await authenticate();
    const userData = await fetchUser();
    
    if (userData) {
      dispatch({
        type: 'SET_USER',
        payload: {
          user: userData,
        },
      });
      dispatch({
        type: 'SET_IS_ONBOARDED',
        payload: {
          isOnboarded: true,
        },
      });
    }

    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: false,
      },
    });
    if (error) toast.error(error.message);
    if (!error)
      toast.success(
        `you have successfully ${isLoginForm ? 'logged in' : 'signed up'}`
      );
    resetForm();
  };


  const isDisabled = useMemo(() =>{
    return !Object.values(form).every((val) => !!val);
  },[form]);
  

  const onboardingSubmitHandler = async (e) => {
    e.preventDefault()
    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: true,
      },
    });
    await setUserData();
    dispatch({
      type: 'SET_LOADING',
      payload: {
        isLoading: false,
      },
    });
  };
  
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
          {!isAuthenticated && (
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
              disabled={isDisabled}
            >
              {isLoginForm ? "Log In " :"Sign up"}
            </button>
          </form>
          )} 

          {isAuthenticated && !isOnboarded && (
          <form 
            onSubmit={onboardingSubmitHandler} 
            className="flex flex-col item-center space-y-5"
            >
            <div className='="tracking-wider text-5xl my-5'>Tweety</div>
            <input 
              type ="username" 
              name="username" 
              id="username" 
              onChange={onboardingFormOnChangeHadler} 
              value={onboardingForm.username}
              className ='bg-gray-100 hover:bg-transparent 
              focus:bg-transparent border placeholder:text-sm 
              py-1 px-2 outline-none w-full 
              rounded-sm focus:border-gray-400'
              placeholder="Username"
            /> 
            <input 
            type ="fullName" 
            name="fullName" 
            id="fullName" 
            onChange={onboardingFormOnChangeHadler} 
            value={onboardingForm.fullName}
            className ='bg-gray-100 hover:bg-transparent 
              focus:bg-transparent border placeholder:text-sm 
              py-1 px-2 outline-none w-full 
              rounded-sm focus:border-gray-400'
              placeholder="Full Name"
            /> 
            <button 
              type ='submit' 
              className="bg-blue-500 py-2 px-6 text-white active:scale-95 
              transform transistion w-full disabled:bg-opacity-50 disabled:scale-100 rounded py-1 text-sm font-semibold"
              disabled={
                !onboardingForm.username || !onboardingForm.fullName
              }
              >
                 Submit! 
            </button>
          </form>)}

          <div clasName= 'w-full flex items-center justify-center my-5 space-x-2 py-2 px-3'>
            <div className="h-[0.8px] w-full bg-slate-400"/>
            <div className="text-gray-600 font-semibold text-center text-sm py-2 px-2">
              --OR--
            </div>  
          </div>
          <div className='w-full h-full py-3 text-center text-indigo-900 px-2 '>
            {isLoginForm
                ? "Don't have an account?"
                : 'Already have an account?'}
            <button 
                onClick ={() => setIsLoginForm((prev) => !prev )}
                className ="ml-2 font-semibold text-yellow-400"
              > 
                {isLoginForm ? "Sign up" : "Login "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;