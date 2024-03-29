import { Request, Response } from "express";
import User from "../db/models/User";
import Helper from "../helpers/helper";
import passwordHelper from "../helpers/passwordHelper";

const Register = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send(Helper.ResponseData(400, "Password and confirm password does not match", null, null));
        }

        const emailExist = await User.findOne({ where: { email }, attributes: ['id'] });

        if (emailExist) {
            return res.status(400).send(Helper.ResponseData(400, "Email already exists", null, null));
        }

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