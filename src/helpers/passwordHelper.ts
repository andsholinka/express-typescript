import bcrypt from 'bcrypt';

const PasswordHash = async (password: string): Promise<string> => {

    const result = await bcrypt.hash(password, 10);

    return result;
}

const PasswordCompare = async (password: string, passwordHash: string): Promise<boolean> => {

    const result = await bcrypt.compare(password, passwordHash);

    return result;
}

export default { PasswordHash, PasswordCompare }