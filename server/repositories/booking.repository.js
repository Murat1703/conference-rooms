import { pool } from "../db/db.js";

export const getBookings = async () =>{
    const {rows} = await pool.query(
        "SELECT * FROM bookings ORDER BY created_at ASC"
    );
    return rows
}

export const getBookingWithHallName = async (limit, offset) => {

  // 1. получаем сами брони
  const bookingsQuery = await pool.query(
    `SELECT
      b.id,
      b.hall_id,
      h.name AS hall_name,
      b.name,
      b.phone,
      b.start_date,
      b.seating_type,
      b.count,
      b.status
    FROM bookings b
    LEFT JOIN halls h ON h.id = b.hall_id
    ORDER BY b.start_date DESC
    LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  // 2. получаем общее количество
  const countQuery = await pool.query(
    `SELECT COUNT(*) FROM bookings`
  );

  return {
    items: bookingsQuery.rows,
    total: Number(countQuery.rows[0].count)
  };
};

export const getBookingById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM bookings WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const getBookingByDate = async (date) => {

  const { rows } = await pool.query(
    `SELECT
      h.name AS hall_name,
      b.name,
      b.phone,
      b.start_date,
      b.end_date,
      b.seating_type,
      b.count,
      b.status
    FROM bookings b
    JOIN halls h ON h.id = b.hall_id
    WHERE b.status <> 'cancelled'
      AND b.start_date >= $1::date
      AND b.start_date < ($1::date + INTERVAL '1 day')
    ORDER BY b.start_date`,
    [date]
  );
  console.log(rows)
  return rows;
};

export const addBooking = async (data = {} ) => {
  const {name, phone, start_date, seating_type, count, hall_id} = data;
  
  const { rows } = await pool.query(
    `INSERT INTO bookings (name, phone, start_date, seating_type, count, hall_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`, [name, phone, start_date, seating_type, count, hall_id]
  );
  return rows[0];
};

export const deleteBooking = async (id) =>{
  const { rows } = await pool.query(
    "DELETE FROM bookings WHERE id = $1",
    [id]
  );
  return rows[0];
}