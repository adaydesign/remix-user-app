import { Flex } from '@chakra-ui/react';
import { ActionFunction, json, LoaderFunction, redirect, useActionData } from 'remix';
import LoginForm from '~/components/LoginForm';
import {login, createUserSession, getUser} from '~/utils/session.server'

export type LoginError = {
  formError?: string
  fieldErrors?:{
    username: string | undefined
    password: string | undefined
  }
}

const badRequest = (data : LoginError) => json(data, {status: 400})

const validateUsername = (text: string) => {
  if(text==='null'){
    return `Please fill username form`
  }else if(text.length < 3){
    return `Username must be at least 3 characters long`
  }

}

const validatePassword = (text: string) => {
  if(text==='null'){
    return `Please fill password form`
  }else if(text.length < 4){
    return `Password must be at least 4 characters long`
  }
}

export const action : ActionFunction = async ({request})=>{
  const form = await request.formData();
  const username = String(form.get("username"))
  const password = String(form.get("password"))

  const fieldErrors = {
    username : validateUsername(username),
    password : validatePassword(password)
  }
  
  const hasError = Object.values(fieldErrors).find(i=>i!==undefined)
  if(hasError){
    return badRequest({fieldErrors})
  }

  const user = await login({username,password})
  
  if(user){
    return createUserSession(user.id+'', '/dashboard');
  }else{
    return badRequest({
      formError: "Invalid Username or Password"
    })
  }

}

export const loader : LoaderFunction = async ({request})=>{
  const user = await getUser(request)
 
  if(user){
    return redirect('/dashboard')
  }

  return {}
}

const Login = () => {
  const actionError = useActionData<LoginError>()

  return (
    <Flex w='100%'>
      <LoginForm error={actionError} />
    </Flex>
  );
};

export default Login;
