interface User {
    id: number;
    name: string;
    phone: string;
    cpf: string;
    email: string;
    password: string;
    cep: string;
    city: string;
    bairro: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
}

export { User };