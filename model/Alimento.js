const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../data/mysql")

const AlimentoModel = sequelize.define('Alimentos',
    {
        nome_alimento: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'O nome do alimento é obrigatório.',
              },
              notEmpty: {
                msg: 'O nome do alimento não pode estar vazio.',
              },
            },
          },
          medida_alimento: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A medida do alimento é obrigatória.',
              },
              notEmpty: {
                msg: 'A medida do alimento não pode estar vazia.',
              },
            },
          },
          informacao_nutricional: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'A informacao nutricional é obrigatória.',
              },
              notEmpty: {
                msg: 'A informacao nutricional não pode estar vazia.',
              },
            },
          },
          id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notNull: {
                msg: 'O ID do usuário é obrigatório.',
              },
              isInt: {
                msg: 'O ID do usuário deve ser um número inteiro.',
              },
            },
          },

    }
)

AlimentoModel.sync();

module.exports = {
    lista: async function () {
        const alimentos = await AlimentoModel.findAll()
        return alimentos;
    },

    buscaPorFK: async function (id_usuario) {
        return await AlimentoModel.findAll({ where: { id_usuario: id_usuario }, raw: true });
    },


    cadastrar: async function (nome_alimento, medida_alimento, informacao_nutricional, id_usuario) {
        const alimento = await AlimentoModel.create({
            nome_alimento: nome_alimento,
            medida_alimento: medida_alimento,
            informacao_nutricional: informacao_nutricional,
            id_usuario: id_usuario,
        })
        return alimento;
    },

    cadastra5: async function (obj){
      const alimentos = await AlimentoModel.bulkCreate(obj);

      return alimentos;
    },

    editar: async function (id, obj) {
        let alimento = await AlimentoModel.findByPk(id)
        if (!alimento) {
            return false;
        }

        Object.keys(obj).forEach(key => alimento[key] = obj[key])
        await alimento.save();
        return alimento
    },

    excluir: async function (id) {
        const alimento = await AlimentoModel.findByPk(id)
        return alimento.destroy();
    },

    buscaPorID: async function (id) {
        return await AlimentoModel.findOne({where: {id : id}, raw: true})
    }


}
