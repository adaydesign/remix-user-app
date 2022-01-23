import { Flex, Heading, Table, TableCaption, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";
import { Users } from "@prisma/client";

type UserTableProps = {
    data: Array<Users>
}

const UsersTable = ({ data }: UserTableProps) => {
    return (
        <Flex backgroundColor='messenger.50' direction='column' justify='center' align='center' w='100%' paddingY={10}>
            <Heading size='md' mb={3}>List Users ({data?.length ?? 0})</Heading>
            <Table variant='simple'>
                <TableCaption>Enjoy with Remix :)</TableCaption>
                <Thead bgColor='blue.600'>
                    <Tr>
                        <Th  color='white'>ID</Th>
                        <Th display={{sm:'none', md:'flex'}}  color='white'>Username</Th>
                        <Th  color='white'>Full Name</Th>
                        <Th  color='white'>Position</Th>
                        <Th display={{sm:'none', md:'flex'}}  color='white'>Created At</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map(i => (
                            <Tr>
                                <Td>{i.id}</Td>
                                <Td display={{sm:'none',md:'flex'}}>{i.username}</Td>
                                <Td>{i.fullname}</Td>
                                <Td>{i.position}</Td>
                                <Td display={{sm:'none',md:'flex'}}>{i.createdAt}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </Flex>
    );
};

export default UsersTable;
