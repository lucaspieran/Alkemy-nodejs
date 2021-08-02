const db = require('../models')


const getAllRoles = async () => {
        return await db.Role.findAll();
}

const getRoleById = async (id) => {
    return await db.Role.findByPk(id);
}

const createRole = async (role) => {
    return await db.Role.create(role);
}

const updateRole = async (id, role) => {
    return await db.Role.update(role, {
            where: {
              id
            }
          });

}

const deleteRole = async (id) => {
    return await db.Role.destroy({
            where: {
              id
            }
          });
}


module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}