const db = require('../db');


exports.all = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};


exports.getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};


exports.create = async ({ name }) => {
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  const [result] = await db.execute(sql, [name]);
  return result;
};


exports.update = async (id, { name }) => {
  const sql = 'UPDATE categories SET name = ? WHERE id = ?';
  const [result] = await db.execute(sql, [name, id]);
  return result;
};


exports.delete = async (id) => {
  const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
  return result;
};
