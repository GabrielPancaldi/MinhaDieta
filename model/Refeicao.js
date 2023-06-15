const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../data/mysql")

const RefeicaoModel = sequelize.define('Refeicao', {
    nome_refeicao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O nome da refeição é obrigatório.',
        },
        notEmpty: {
          msg: 'O nome da refeição não pode estar vazio.',
        },
      },
    },
    nome_alimento_1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O nome do alimento 1 é obrigatório.',
        },
        notEmpty: {
          msg: 'O nome do alimento 1 não pode estar vazio.',
        },
      },
    },
    medida_alimento_1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A medida do alimento 1 é obrigatória.',
        },
        notEmpty: {
          msg: 'A medida do alimento 1 não pode estar vazia.',
        },
      },
    },
    quantidade_alimento_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A quantidade do alimento 1 é obrigatória.',
        },
        isInt: {
          msg: 'A quantidade do alimento 1 deve ser um número inteiro.',
        },
      },
    },
    nome_alimento_2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O nome do alimento 2 é obrigatório.',
        },
        notEmpty: {
          msg: 'O nome do alimento 2 não pode estar vazio.',
        },
      },
    },
    medida_alimento_2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A medida do alimento 2 é obrigatória.',
        },
        notEmpty: {
          msg: 'A medida do alimento 2 não pode estar vazia.',
        },
      },
    },
    quantidade_alimento_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A quantidade do alimento 2 é obrigatória.',
        },
        isInt: {
          msg: 'A quantidade do alimento 2 deve ser um número inteiro.',
        },
      },
    },
    nome_alimento_3: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'O nome do alimento 3 é obrigatório.',
        },
        notEmpty: {
          msg: 'O nome do alimento 3 não pode estar vazio.',
        },
      },
    },
    medida_alimento_3: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A medida do alimento 3 é obrigatória.',
        },
        notEmpty: {
          msg: 'A medida do alimento 3 não pode estar vazia.',
        },
      },
    },
    quantidade_alimento_3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A quantidade do alimento 3 é obrigatória.',
        },
        isInt: {
          msg: 'A quantidade do alimento 3 deve ser um número inteiro.',
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
  });
  

RefeicaoModel.sync();

module.exports = {
    lista: async function () {
        const refeicoes = await RefeicaoModel.findAll()
        return refeicoes;
    },

    buscaPorFK: async function (id_usuario) {
        return await RefeicaoModel.findAll({ where: { id_usuario: id_usuario }, raw: true });
    },


    cadastrar: async function (nome_refeicao, nome_alimento_1, medida_alimento_1, quantidade_alimento_1, nome_alimento_2, medida_alimento_2, quantidade_alimento_2, nome_alimento_3, medida_alimento_3, quantidade_alimento_3, id_usuario) {
        const refeicao = await RefeicaoModel.create({
            nome_refeicao: nome_refeicao,
            nome_alimento_1: nome_alimento_1,
            medida_alimento_1: medida_alimento_1,
            quantidade_alimento_1: quantidade_alimento_1,
            nome_alimento_2: nome_alimento_2,
            medida_alimento_2: medida_alimento_2,
            quantidade_alimento_2: quantidade_alimento_2,
            nome_alimento_3: nome_alimento_3,
            medida_alimento_3: medida_alimento_3,
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

