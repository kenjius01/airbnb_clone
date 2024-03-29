import _ from 'lodash';
import { getServerSession } from 'next-auth/next';

import prisma from '@/app/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email
      }
    });

    if (!currentUser) {
      return null;
    }
    return _.omit(currentUser, 'hashedPassword');
  } catch (err: unknown) {
    console.log({ err });
    return null;
  }
};

export default getCurrentUser;
