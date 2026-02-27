import { useEffect, useState, useCallback } from "react";
import { getHalls, addHall, deleteHall, updateHall } from "../api/halls.api.js"
import { addGallery } from "../api/halls.gallery.api.js";

export const useHalls = () =>{
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadHalls = useCallback(async () =>{
        try{
            setLoading(true)
            const res = await getHalls();
            setHalls(res.data);
        }
        catch(err){
            console.error("Ошибка загрузки событий", err);
        }
        finally {
            setLoading(false)
        }
    }, [])

    useEffect(()=>{
        loadHalls();
    }, [loadHalls])


    const createHall = useCallback(async ({hallData, gallery}) =>{
        try{
            const fd = new FormData();
            fd.append("name", hallData.name);
            fd.append("area_m2", String(Number(hallData.area_m2))); // строка
            fd.append("capacity", String(Number(hallData.capacity)));
            fd.append("price", String(Number(hallData.price)));

            const res = await addHall(fd); 
            const hallID = res.data?.id; // <-- важно
            console.log('АЙДИ КОМНАТЫ. = ',hallID);

            const gfd = new FormData();
            const localItems = gallery.filter(item => item.status === "local");


            const localFiles = localItems
                .map(item => item.file ?? item)   // если item = {file: File}, берём item.file, иначе item
                .filter(f => f instanceof File);  // страхуемся


            if (localFiles.length===0) {

                await loadHalls();
                return;
            
                } else {
                    localFiles.forEach((file) => {
                        gfd.append("gallery", file); 
                    });
                await addGallery(hallID,gfd);
                // setGallery([]);
            } 

            await loadHalls();


        } catch (err){
            console.log(err)
        }
    },[loadHalls]) 

    const deleteItem = useCallback(async (id) => {
        try {
            await deleteHall(id); // твой API вызов
            setHalls(halls => halls.filter(hall => hall.id !== id)); 
        } catch (err) {
            console.error("Ошибка удаления", err);
        }
    }, []);

    const updateItem = useCallback(async (id, hallData, gallery) =>{
        try {
            const fd = new FormData();
            fd.append("name", hallData.name);
            fd.append("area_m2", hallData.area_m2);
            fd.append("capacity", hallData.capacity);
            fd.append("price", hallData.price);

            const hallID = id; // <-- важно
            console.log('АЙДИ КОМНАТЫ. = ',hallID);

            const gfd = new FormData();
            const localItems = gallery.filter(item => item.status === "local");


            const localFiles = localItems
                .map(item => item.file ?? item)   // если item = {file: File}, берём item.file, иначе item
                .filter(f => f instanceof File);  // страхуемся

            await updateHall(id, fd); 


    if (localFiles.length > 0) {
      const gfd = new FormData();
      localFiles.forEach((file) => gfd.append("gallery", file));
      await addGallery(id, gfd);
    }


            await loadHalls();
        } catch (err) {
            console.error("Ошибка Добавления", err);
        }
    }, [loadHalls]) 



    return({halls, loading, reload: loadHalls, createHall, deleteItem, updateItem})
}