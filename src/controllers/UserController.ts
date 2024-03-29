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

export default { Register }