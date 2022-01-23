import {  Flex, Heading, VStack, Text } from '@chakra-ui/react';
import { Users } from '@prisma/client';

type CurrentUsersLabelProps = {
  data : Array<Users>
}

const CurrentUsersLabel = ({data}:CurrentUsersLabelProps) => {
  return (
  <Flex backgroundColor='red.400' direction='column' justify='center' align='center' w='100%' paddingY={10}>
      <Heading size='md'>current users</Heading>
      <Heading size='4xl'>{data.length}</Heading>
      {
        data.length > 0 && (
          <VStack spacing={0} mt={3}>
            <Text fontSize='md' color='white'>Welcome new member!!!</Text>
            <Text color='blue' fontSize='xl' fontWeight='bold'>{data[data.length-1]?.fullname}</Text>
          </VStack>
        )
      }
  </Flex>
  );
};

export default CurrentUsersLabel;
