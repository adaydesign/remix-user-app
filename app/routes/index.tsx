import { Flex, VStack } from '@chakra-ui/react';
import { Users } from '@prisma/client';
import { LoaderFunction, redirect, useLoaderData } from 'remix';
import CurrentUsersLabel from '~/components/CurrentUsersLabel';
import LoginForm from '~/components/LoginForm';
import { db } from '~/utils/db.server';
import { getUser } from '~/utils/session.server';

type IndexLoaderData = {
  users: Array<Users>
}

export const loader : LoaderFunction = async ({request})=>{
  const user = await getUser(request)
 
  if(user){
    return redirect('/dashboard')
  }

  const data: IndexLoaderData = {
    users: await db.users.findMany({
      orderBy:{
        'id':"asc"
      }
    })
  }

  return data
}

const Index = () => {
  const data = useLoaderData<IndexLoaderData>();
  return (
    <VStack spacing={4} w='100%'>
      <CurrentUsersLabel data={data.users}/>
      <LoginForm />
    </VStack>
  );
};

export default Index;

