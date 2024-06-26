const connection = require('../database/connection')

module.exports = {

  async index(req, res) {
    //para usar paginacao para exibir aos poucos:
    const { page = 1 } = req.query

    const [count] = await connection('incidents').count()
    const incidents = await connection('incidents')
      //a linha abaixo e utilizada quando queremos relacionar dados de duas tabelas:
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(20)
      .offset((page - 1) * 5)
      //selecionando todos os campos da tabela incidents + alguns da tabela
      //ongs para que nao haja campos repetidos em um formato de lista.
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])

    //A quantidade de itens e retornada pelo cabecalho:
    res.header('X-Total-Count', count['count(*)'])
    return res.json(incidents)
  },

  async create(req, res) {
    const { title, description, value } = req.body
    const ong_id = req.headers.authorization
    const [id] = await connection('incidents').insert({
      //na linha acima, estou pegando apenas o id.
      title,
      description,
      value,
      ong_id
    })
    return res.json({ id })
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted.' })
    }
    await connection('incidents').where('id', id).delete()
    return res.status(204).send()
  }
}