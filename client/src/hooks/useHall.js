import { useEffect, useState, useCallback } from "react"
import { getHall } from "../api/halls.api"
import { getHalsGallery } from "../api/halls.gallery.api"


export const useHall = (id) => {

  const [hall, setHall] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);

      // Параллельно быстрее, чем по очереди
      const [hallRes, galleryRes] = await Promise.all([
        getHall(id),
        getHalsGallery(id),
      ]);

      setHall(hallRes?.data ?? null);
      setGallery(galleryRes?.data?.items ?? []);
    } catch (e) {
      console.error("Ошибка загрузки зала:", e);
      setError(e);
      setHall(null);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

    return{
        hall, gallery, loading, error, reload: load, setHall, setGallery   
    }
}