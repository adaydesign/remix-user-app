import { FormControl, FormLabel, Heading, VStack, Input, Button, Link, FormErrorMessage, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Form, Link as RemixLink } from 'remix';
import { LoginError } from '~/routes/login';

type LoginFormProps = {
    error? : LoginError
}

const FormErrorLabel = ({children}:{children:React.ReactNode}) => {
    return (
        <Flex w='100%' backgroundColor='red.500' color='white' p={2} rounded='lg'>
            <Text fontSize='md'>{children}</Text>
        </Flex>
    )
}

const LoginForm = ({error}:LoginFormProps) => {
    return (
        <VStack w='100%' backgroundColor='blue.100' spacing={3} padding={5}>
            <Heading size='lg'>Welcome & Log in</Heading>
            <Form method='post' action='/login' style={{width:'100%'}}>
                <VStack spacing={3} backgroundColor='yellow.50' padding={2}>
                    {
                        error?.formError && <FormErrorLabel>{error?.formError}</FormErrorLabel>
                    }
                    <FormControl isInvalid={error?.fieldErrors?.username !== undefined} >
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <Input id='username' name='username' type='text' />
                        <FormErrorMessage>{error?.fieldErrors?.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={error?.fieldErrors?.password !== undefined}>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input id='password' name='password' type='password' />
                        <FormErrorMessage>{error?.fieldErrors?.password}</FormErrorMessage>
                    </FormControl>
                    <Button w='100%' colorScheme='green' type='submit'>Login</Button>
                    <Link to='/register' as={RemixLink} w='100%'>
                        <Button  w='100%' colorScheme='blue'>Register</Button>
                    </Link>
                </VStack>
            </Form>
        </VStack>
    )
};

export default LoginForm;
