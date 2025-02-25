import * as bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação do usuário administrador
  const adminPassword = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@domain.com',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // Criação do usuário comum
  const userPassword = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@domain.com',
      password: userPassword,
      role: Role.USER,
    },
  });

  console.log('Usuários criados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
