const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../data/mysql")

const RefeicaoModel = sequelize.define('Refeicao',
    {
        nome_refeicao: DataTypes.STRING,
        nome_alimento_1: DataTypes.STRING,
        quantidade_alimento_1: DataTypes.INTEGER,
        nome_alimento_2: DataTypes.STRING,
        quantidade_alimento_2: DataTypes.INTEGER,
        nome_alimento_3: DataTypes.STRING,
        quantidade_alimento_3: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER,

    }
)

RefeicaoModel.sync();

module.exports = {
    lista: async function () {
        const refeicoes = await RefeicaoModel.findAll()
        return refeicoes;
    },

    buscaPorFK: async function (id_usuario) {
        return await RefeicaoModel.findAll({ where: { id_usuario: id_usuario }, raw: true });
    },


    cadastrar: async function (nome_refeicao, nome_alimento_1, quantidade_alimento_1, nome_alimento_2, quantidade_alimento_2, nome_alimento_3, quantidade_alimento_3, id_usuario) {
        const refeicao = await RefeicaoModel.create({
            nome_refeicao: nome_refeicao,
            nome_alimento_1: nome_alimento_1,
            quantidade_alimento_1: quantidade_alimento_1,
            nome_alimento_2: nome_alimento_2,
            quantidade_alimento_2: quantidade_alimento_2,
            nome_alimento_3: nome_alimento_3,
            quantidade_alimento_3: quantidade_alimento_3,
            id_usuario: id_usuario
        })
        return refeicao;
    },


    editar: async function (id, obj) {
        let refeicao = await RefeicaoModel.findByPk(id)
        if (!refeicao) {
            return false;
        }

        Object.keys(obj).forEach(key => refeicao[key] = obj[key])
        await refeicao.save();
        return refeicao
    },

    excluir: async function (id) {
        const refeicao = await RefeicaoModel.findByPk(id)
        return refeicao.destroy();
    },

    buscaPorID: async function (id) {
        return await RefeicaoModel.findOne({where: {id : id}, raw: true})
    }


}

