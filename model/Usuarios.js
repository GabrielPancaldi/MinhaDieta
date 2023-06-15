const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../data/mysql")

const UsersModel = sequelize.define('Users',
    {
        nome_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'O nome do usuário é obrigatório.',
              },
              notEmpty: {
                msg: 'O nome do usuário não pode estar vazio.',
              },
            },
          },
          email_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
              msg: 'O e-mail já está em uso.',
            },
            validate: {
              notNull: {
                msg: 'O e-mail do usuário é obrigatório.',
              },
              notEmpty: {
                msg: 'O e-mail do usuário não pode estar vazio.',
              },
              isEmail: {
                msg: 'O e-mail do usuário deve ser válido.',
              },
            },
          },
          senha_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A senha do usuário é obrigatória.',
              },
              notEmpty: {
                msg: 'A senha do usuário não pode estar vazia.',
              },
              len: {
                args: [6, 20],
                msg: 'A senha do usuário deve ter entre 6 e 20 caracteres.',
              },
            },
          },
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
