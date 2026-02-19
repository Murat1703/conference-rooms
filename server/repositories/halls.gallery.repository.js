import { pool } from "../db/db.js";

export const getAllGallery = async () =>{
    const {rows} = await pool.query(
        "SELECT * FROM hall_gallery ORDER BY created_at ASC"
    );
    return rows
}

export const addGallery = async (hallID, urls)=>{
    if (!urls?.length) return [];

    const values = [];
    const placeholders = urls.map((url, i) => {
      values.push(Number(hallID), url);
      const a = i * 2 + 1;
      const b = i * 2 + 2;
      return `($${a}, $${b})`;
    });

    const sql = `
      INSERT INTO hall_gallery (hall_id, image_url)
      VALUES ${placeholders.join(", ")}
      RETURNING id, hall_id, image_url, created_at
    `;

    const { rows } = await pool.query(sql, values);
    return rows;
}

export const getGalleryByHallId = async (hallID) =>{
    const { rows } = await pool.query(
      `
      SELECT id, hall_id, image_url, created_at
      FROM hall_gallery
      WHERE hall_id = $1
      ORDER BY id ASC
      `,
      [Number(hallID)]
    );
    return rows;
}

export const editGalleryItem = async (id, data)=>{
  const { url } = data || {};

  const fields = [];
  const values = [];
  let idx = 1;

  if (url !== undefined) {
    fields.push(`url = $${idx++}`);
    values.push(url);
  }


  if (!fields.length) return null;

  const { rows } = await pool.query(
    `
    UPDATE hall_gallery
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING id, hall_id, image_url, created_at
    `,
    [...values, Number(id)]
  );

  return rows[0] || null;

}

export const deleteImgById = async (id)=>{
    const { rows } = await pool.query(
      `
      DELETE FROM hall_gallery
      WHERE id = $1
      RETURNING id, hall_id, image_url
      `,
      [Number(id)]
    );
    return rows[0] || null;
}
