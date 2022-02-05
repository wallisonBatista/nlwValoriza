import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        //verificar se o e-mail está preenchido
        if (!email) {
            throw new Error("Email incorrect")
        }

        //verifica se o usuário já existe (e-mail)
        const userAlreadyExists = await usersRepository.findOne({
            email,
        })
        //se o e-mail já existir lança uma exceção
        if (userAlreadyExists) {
            throw new Error("User already exists")
        }

        const user = usersRepository.create({
            name,
            email,
            admin
        });
        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }