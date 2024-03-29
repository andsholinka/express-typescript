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

const createRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { roleName, isActive } = req.body;
        const create = await Role.create({
            roleName,
            isActive
        })

        return res.status(201).send({
            status: 201,
            message: "Success",
            data: create
        })
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

const updateRole = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { id } = req.params;
        const { roleName, isActive } = req.body;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Role not found",
                data: null
            })
        }

        role.roleName = roleName;
        role.isActive = isActive;

        await role.save();

        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: role
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

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Role not found",
                data: null
            })
        }

        await Role?.sequelize?.query(`DELETE FROM roles WHERE id = '${id}'`, { type: QueryTypes.DELETE });
        return res.status(200).send({
            status: 200,
            message: "Success",
            data: null
        })

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

const getRoleById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Role not found",
                data: null
            })
        }

        await Role?.sequelize?.query(`SELECT * FROM roles WHERE id = '${id}'`, { type: QueryTypes.SELECT });
        return res.status(200).send({
            status: 200,
            message: "Success",
            data: role
        })

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

export default { getRoles, createRoles, updateRole, deleteRole, getRoleById }