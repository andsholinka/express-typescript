import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helper from "../../helpers/helper";
import User from "../../db/models/User";

const RegisterValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        const data = {
            username,
            email,
            password,
            confirmPassword
        }

        const rules = {
            username: "required|string|max:50",
            email: "required|email",
            password: "required",
            confirmPassword: "required|same:password"
        }

        const validation = new Validator(data, rules);

        if (validation.fails()) {
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", validation.errors.all(), null));
        }

        const user = await User.findOne({ where: { email } });

        if (user) {
            const errorData = {
                email: [
                    "Email already exists"
                ]
            }
            return res.status(400).send(Helper.ResponseData(400, "Bad Request", errorData, null));
        }
        next();
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "Internal Server Error", error, null));
    }
}

export default RegisterValidation

