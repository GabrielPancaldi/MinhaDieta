const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../data/mysql")

const AlimentoModel = sequelize.define('Alimentos',
    {
        nome_alimento: DataTypes.STRING,
        medida_alimento: DataTypes.STRING,
        id_usuario: DataTypes.INTEGER,

    }
)

AlimentoModel.sync();

module.exports = {
    lista: async function () {
        const alimentos = await AlimentoModel.findAll()
        return alimentos;
    },


    cadastrar: async function (nome_alimento, medida_alimento, id_usuario) {
        const alimento = await AlimentoModel.create({
            nome_alimento: nome_alimento,
            medida_alimento: medida_alimento,
            id_usuario: id_usuario
        })
        return alimento;
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
        return await AlimentoModel.findByPk(id)
    }


}
