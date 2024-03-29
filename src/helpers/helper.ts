import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface userData {
    username: string,
    email: string,
    roleId: string,
    isVerified: boolean,
    isActive: boolean
}

const ResponseData = (status: number, message: string | null, error: any | null, data: any | null) => {
    if (error != null && error instanceof Error) {
        const response = {
            status: status,
            message: error.message,
            error: error,
            data: null
        }

        return response;
    }

    const response = {
        status,
        message,
        error,
        data
    }

    return response;
}

const GenerateToken = (data: any): string => {
    const token = jwt.sign(data, process.env.JWT_TOKEN as string, { expiresIn: '1m' });
    return token;
}

const GenerateRefreshToken = (data: any): string => {
    const token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: '1d' });
    return token;
}

const ExtractToken = (token: string): userData | null => {
    const secretKey: string = process.env.JWT_TOKEN as string;

    let responseData: any;

    const res = jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            responseData = null
        } else {
            responseData = decoded
        }
    })

    if (responseData) {
        const result: userData = <userData>(responseData);
        return result;
    }
    return null;
}

const ExtractRefreshToken = (token: string): userData | null => {
    const secretKey: string = process.env.JWT_REFRESH_TOKEN as string;

    let responseData: any;

    const res = jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            responseData = null
        } else {
            responseData = decoded
        }
    })

    if (responseData) {
        const result: userData = <userData>(responseData);
        return result;
    }
    return null;
}


export default { ResponseData, GenerateToken, GenerateRefreshToken, ExtractToken, ExtractRefreshToken }