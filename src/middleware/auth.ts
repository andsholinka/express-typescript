import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/helper";

const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (token === undefined) {
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
        }

        const userData = Helper.ExtractToken(token);
        if (!userData) {
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized", null, null));
        }

        res.locals.userEmail = userData?.email
        next()

    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "Internal Server Error", error, null));
    }
}

export default Auth