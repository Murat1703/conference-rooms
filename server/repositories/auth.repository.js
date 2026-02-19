import { pool } from "../db/db.js";

export const findByLogin = async (login) => {
  const { rows } = await pool.query(
    "SELECT id, login, email, password_hash, role FROM users WHERE login = $1",
    [login]
  );
  return rows[0] || null;
};

export const findPublicById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, login, email, role FROM users WHERE id = $1",
    [Number(id)]
  );
  return rows[0] || null;
};

export const createUser = async ({login, email, password_hash, role }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (login, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, role`,
    [login, email, password_hash, role]
  );
  return rows[0];
};

export const getUsers = async () =>{
    const {rows} = await pool.query(
        "SELECT id, login, email, created_at, role FROM users"
    );
    return rows
}