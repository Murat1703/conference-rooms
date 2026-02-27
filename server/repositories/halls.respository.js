import { pool } from "../db/db.js";

export const getHalls = async () =>{
    const {rows} = await pool.query(
        "SELECT * FROM halls ORDER BY name ASC"
    );
    return rows
}


export const getById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM halls WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const createHall = async (data = {} ) => {

  const {name, area_m2, capacity, price} = data;
  
  const { rows } = await pool.query(
    `INSERT INTO halls (name, area_m2, capacity, price)
      VALUES ($1, $2, $3, $4)
    RETURNING *`, [name, area_m2 , capacity, price]
  );
  return rows[0];
};

export const deleteHall = async (id ) => {
  const result = await pool.query(
    "DELETE FROM halls WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rowCount;
};

export const updateHall = async (id, data) =>{

  const hallID = Number(id);
  const {name, area_m2, capacity, price} = data;

  const { rows } = await pool.query(
    `UPDATE halls 
        SET 
        name = $1, 
        area_m2 = $2, 
        capacity = $3, 
        price= $4
        WHERE id = $5 RETURNING *    
    `,
    [name, area_m2, capacity, price, hallID]
  );
  return rows[0]
}
