import { Request, Response } from "express";
import User from "../db/models/User";
import Helper from "../helpers/helper";
import passwordHelper from "../helpers/passwordHelper";

const Register = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { username, email, password } = req.body;

        const hashed = await passwordHelper.PasswordHash(password);

        const user = await User.create({
            username,
            email,
            password: hashed,
            isActive: true,
            isVerified: true,
            roleId: 1
        });

        return res.status(201).send(Helper.ResponseData(201, "Created", null, user));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const Login = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send(Helper.ResponseData(401, "unauthorized", null, null));
        }

        const match = await passwordHelper.PasswordCompare(password, user.password);

        if (!match) {
            return res.status(401).send(Helper.ResponseData(401, "unauthorized", null, null));
        }

        const dataUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            roleId: user.roleId,
            isVerified: user.isVerified,
            isActive: user.isActive
        }

        const token = Helper.GenerateToken(dataUser);
        const refreshToken = Helper.GenerateRefreshToken(dataUser);

        user.accessToken = refreshToken;
        await user.save();

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        const responseUser = {
            username: user.username,
            email: user.email,
            roleId: user.roleId,
            isVerified: user.isVerified,
            isActive: user.isActive,
            accessToken: token
        }

        return res.status(200).send(Helper.ResponseData(200, "OK", null, responseUser));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const RefreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(401).send(Helper.ResponseData(401, "unauthorized", null, null));
        }

        const decodedUser = Helper.ExtractToken(refreshToken);


        if (!decodedUser) {
            return res.status(401).send(Helper.ResponseData(401, "unauthorized", null, null));
        }

        const token = Helper.GenerateToken({
            username: decodedUser.username,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            isVerified: decodedUser.isVerified,
            isActive: decodedUser.isActive,
        });

        const resultUser = {
            username: decodedUser.username,
            email: decodedUser.email,
            roleId: decodedUser.roleId,
            isVerified: decodedUser.isVerified,
            isActive: decodedUser.isActive,
            accessToken: token
        }

        return res.status(200).send(Helper.ResponseData(200, "OK", null, resultUser));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

const UserDetail = async (req: Request, res: Response): Promise<Response> => {
    try {
        const email = res.locals.userEmail;
        console.log({ email });

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send(Helper.ResponseData(404, "User Not Found", null, null));
        }

        return res.status(200).send(Helper.ResponseData(200, "OK", null, user));
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
}

export default { Register, Login, RefreshToken, UserDetail }