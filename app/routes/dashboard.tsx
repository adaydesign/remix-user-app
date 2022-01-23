import { Flex, Heading } from "@chakra-ui/react";
import type { Users } from "@prisma/client";
import { LoaderFunction, redirect, useLoaderData } from "remix";
import CurrentUsersLabel from "~/components/CurrentUsersLabel";
import UsersTable from "~/components/UsersTable";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

type LoaderData = {
  user: Users | undefined
  users: Array<Users>
}

export const loader : LoaderFunction = async ({request})=>{
  const user = await getUser(request)
  
  if(user){
    const data: LoaderData = {
      user: user,
      users: await db.users.findMany({
        orderBy:{
          'id':"asc"
        }
      })
    }
    return data
  }else{
    return redirect('/')
  }
}

const Dashboard = () => {
  const data = useLoaderData<LoaderData>();
  return (
  <Flex direction='column' width='100%'>
    <Heading size='3xl' mb={3}>Dashboard</Heading>
    <CurrentUsersLabel data={data?.users}/>
    <UsersTable data={data?.users} />
  </Flex>
  )
};

export default Dashboard;
