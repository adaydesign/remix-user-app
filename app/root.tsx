import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData
} from "remix";
import type { MetaFunction } from "remix";
import {ReactNode} from 'react'
import { Box, ChakraProvider, Heading } from '@chakra-ui/react'
import Layout from "./components/Layout";
import { Users } from "@prisma/client";
import { getUser } from "./utils/session.server";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const Document = ({title = `User App Demo`, children}:
  {title?:string,children: ReactNode})=>{
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  )
}

type LoaderData = {
  user: Users | undefined;
}

export const loader : LoaderFunction = async ({request})=>{
  const user = await getUser(request)

  if(user){
    const data: LoaderData = {
      user: user
    }
    return data
  }else{
    return null
  }
}

export default function App() {
  const data = useLoaderData<LoaderData>();

  return (
    <Document>
      <ChakraProvider>
        <Layout data={data?.user}>
          <Outlet />
        </Layout>
      </ChakraProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title='Error!'>
      <ChakraProvider>
        <Layout>
          <Box>
            <Heading as='h1'>There was an error</Heading>
          </Box>
        </Layout>
      </ChakraProvider>
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <Layout>
          <Box>
            <Heading as='h1'>
              {caught.status} {caught.statusText}
            </Heading>
          </Box>
        </Layout>
      </ChakraProvider>
    </Document>
  )
}
