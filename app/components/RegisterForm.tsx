import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, VStack } from '@chakra-ui/react';
import { Form,Link as RemixLink } from 'remix';
import { RegisterError } from '~/routes/register';

type LoginFormProps = {
    error? : RegisterError
}

const RegisterForm = ({error}:LoginFormProps) => {
  return (
    <VStack w='100%' backgroundColor='green.100' spacing={3} padding={5}>
    <Heading size='lg'>Register Form</Heading>
    <Form method='post' action='/register' style={{width:'100%'}}>
        <VStack spacing={3} backgroundColor='yellow.50' padding={2}>
            <FormControl isInvalid={error?.fieldErrors?.username !== undefined}>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input id='username' name='username' type='text' />
                <FormErrorMessage>{error?.fieldErrors?.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={error?.fieldErrors?.password !== undefined}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' name='password' type='password' />
                <FormErrorMessage>{error?.fieldErrors?.password}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={error?.fieldErrors?.fullname !== undefined}>
                <FormLabel htmlFor='fullname'>Full Name</FormLabel>
                <Input id='fullname' name='fullname' type='text' />
                <FormErrorMessage>{error?.fieldErrors?.fullname}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={error?.fieldErrors?.position !== undefined}>
                <FormLabel htmlFor='position'>Position</FormLabel>
                <Input id='position' name='position' type='text' />
                <FormErrorMessage>{error?.fieldErrors?.position}</FormErrorMessage>
            </FormControl>
            <Button w='100%' colorScheme='green' type='submit'>Submit</Button>
            <Link to='/' as={RemixLink} w='100%'>
                <Button  w='100%' colorScheme='yellow'>Back</Button>
            </Link>
        </VStack>
    </Form>
</VStack>
  );
};

export default RegisterForm;
