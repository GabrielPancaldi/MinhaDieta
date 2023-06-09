const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../data/mysql")

const UsersModel = sequelize.define('Users',
    {
        nome_usuario: DataTypes.STRING,
        email_usuario: DataTypes.STRING,
        senha_usuario: DataTypes.STRING

    }
)

UsersModel.sync();

module.exports = {

    cadastrar: async function (nome_usuario, email_usuario, senha_usuario) {
        const usuario = await UsersModel.create({
            nome_usuario: nome_usuario,
            email_usuario: email_usuario,
            senha_usuario: senha_usuario
        })
        return usuario;
    },

    buscaPorEmail: async function (email_usuario) {
        return await UsersModel.findOne({ where: { email_usuario: email_usuario }, raw: true });
    },

    editar: async function (id, obj) {
        let usuario = await UsersModel.findByPk(id)
        if (!usuario) {
            return false;
        }

        Object.keys(obj).forEach(key => usuario[key] = obj[key])
        await usuario.save();
        return usuario
    },

    excluir: async function (id) {
        const usuario = await UsersModel.findByPk(id)
        return usuario.destroy();
    },

    buscaPorID: async function (id) {
        return await UsersModel.findByPk(id)
    }


}
