const db = require('../db');

exports.all = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM books');
        return rows;
    } catch (err) {
        throw err;
    }
};


exports.create = async ({ title, author, date_publication, category_id }) => {
    const sql = 'INSERT INTO books (title, author, date_publication, category_id) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.execute(sql, [title, author, date_publication, category_id]);
        return result;
    } catch (err) {
        throw err;
    }
};

exports.getById = async (id) => {
    const sql = 'SELECT * FROM books WHERE id = ?';
    try {
        const [rows] = await db.query(sql, [id]);

        return rows[0];
    } catch (err) {
        throw err;
    }
};

exports.update = async (id, { title, author, date_publication, category_id }) => {
    const sql = `
      UPDATE books 
      SET title = ?, author = ?, date_publication = ?, category_id = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(sql, [title, author, date_publication, category_id, id]);
    return result;
};

exports.delete = async (id) => {
    const sql = 'DELETE FROM books WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result;
};