import { appDataSource } from './data-source';
import { User } from './entity/user';

appDataSource
  .initialize()
  .then(async () => {
    console.log('Inserindo novo User no banco de dados...');

    const user = new User();
    user.firstName = 'João';
    user.lastName = 'Neto';
    user.isActive = false;

    await appDataSource.manager.save(user);
    console.log('O User foi salvo no banco com o Id: ' + user.id);

    console.log('Buscando todos os Users do banco...');
    const users = await appDataSource.manager.find(User);
    console.log('Users Encontrados: ', users);

    console.log('Here you can setup and run express / fastify / any other framework.');
  })
  .catch((error) => console.log(error));
