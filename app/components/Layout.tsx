import { Avatar, Button, Flex, Heading, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { Users } from '@prisma/client';
import { ReactNode } from 'react';
import { BsPersonBadge, BsBoxArrowInRight } from "react-icons/bs";
import { Form, Link } from 'remix';

const UserAvatar = ({ data }: { data: Users }) => {
    return (
        <HStack>
            <Avatar name={data.fullname!} size='sm' />
            <Text>{data.fullname}</Text>
            <Form method='post' action='/logout'>
                <Button colorScheme='red' leftIcon={<BsBoxArrowInRight />} size='sm' type='submit'>Log out</Button>
            </Form>
        </HStack>
    )
}


const AppBar = ({ userData }: { userData?: Users }) => {
    return (
        <Flex backgroundColor='blue.400' w='100%' padding={2} align="center" position='fixed' top='0'>
            <Heading size='xl' color='white' mr={2}><Icon as={BsPersonBadge} /></Heading>
            <Link to='/'>
                <Heading size='xl' color='white'>Users App</Heading>
            </Link>
            <Spacer />
            {userData && <UserAvatar data={userData} />}
        </Flex>
    )
}

type LayoutProps = {
    children: ReactNode
    data?: Users | undefined
}

const Layout = ({ children, data }: LayoutProps) => {
    return (
        <Flex direction={'column'} w='100%'>
            <AppBar userData={data} />
            <Flex  mt='80px' w='100%' paddingX={6}>
                {children}
            </Flex>
        </Flex>
    );
};

export default Layout;
