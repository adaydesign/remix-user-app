import { Flex } from '@chakra-ui/react';
import { ActionFunction, json, redirect, useActionData } from 'remix';
import RegisterForm from '~/components/RegisterForm';
import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";

export type RegisterError = {
  formError?: string
  fieldErrors?:{
    username: string
    password: string
    fullname: string
    position: string
  }
}

const badRequest = (data : RegisterError) => json(data, {status: 400})

const validateInput = (text: string,limit?: number) => {
  if(text==='null'){
    return `Please fill this form`
  }
  if(limit!== undefined){
    if(text.length < limit){
      return `Username must be at least ${limit} characters long`
    }
  }

}

export const action: ActionFunction = async ({ request })=>{
  const form = await request.formData();
  const username = String(form.get("username"))
  const passwordOri = String(form.get("password"))
  const fullname = String(form.get("fullname"))
  const position = String(form.get("position"))

  const fieldErrors = {
    username : validateInput(username,3),
    password : validateInput(passwordOri,4),
    fullname : validateInput(fullname),
    position : validateInput(position)
  }
  
  const hasError = Object.values(fieldErrors).find(i=>i!==undefined)
  if(hasError){
    return badRequest({fieldErrors})
  }

  const password = await bcrypt.hash(passwordOri,10)
  const fields = {username,password,fullname,position}
  await db.users.create({ data: fields });
  return redirect(`/`);
}

const Register = () => {
  const actionError = useActionData<RegisterError>()
  return (
    <Flex w='100%'>
      <RegisterForm error={actionError}/>
    </Flex>
  )
};

export default Register;
