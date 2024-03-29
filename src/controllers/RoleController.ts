import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import Role from "../db/models/Role";

const getRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
        const roles = (await Role?.sequelize?.query("SELECT * FROM roles where isActive = true", { type: QueryTypes.SELECT })) as Role[];
        return res.status(200).send({
            status: 200,
            message: "Success",
            data: roles
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message
            })
        }

        return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            error
        })
    }
}

export default { getRoles }