import { useState, useEffect } from 'react'
import cls from './Rooms.module.css'
import {  } from 'react';
import { RoomModal } from './content/RoomModal';
import { Spinner } from '../../../../components/Spinner';
import { useHalls } from '../../../../hooks/useHalls';
import { useHall } from '../../../../hooks/useHall';

export const Rooms = () =>{

    const [activeID, setActiveID] = useState(null);

    useEffect(()=>{},[activeID])


    const {halls, loading, reload, createHall, deleteItem, updateItem} = useHalls();
    const {hall, gallery, setGallery} = useHall(activeID);

    // const [halls, setHalls]= useState(null);

    // const[loading, setLoading] = useState(true)

    // const loadingHalls = async () =>{
    //   try{
    //     const res = await getHalls();
    //     setHalls(res.data)
    //     // console.log(res.data)
    //   } catch (err){
    //     setHalls(null)
    //   } finally{
    //     setLoading(false)
    //   }
    // }

    // useEffect(()=>{
    //     loadingHalls();
    // }, []);


    // const createHall = async (hallData) =>{
    //     try{
    //         console.log('HALLDATA-',hallData)
    //         const fd = new FormData();
    //         fd.append("name", hallData.name);
    //         fd.append("area_m2", String(Number(hallData.area_m2))); // строка
    //         fd.append("capacity", String(Number(hallData.capacity)));
    //         fd.append("price", String(Number(hallData.price)));

    //         const res = await addHall(fd); 
    //         const hallID = res.data?.id; // <-- важно
    //         console.log('АЙДИ КОМНАТЫ. = ',hallID);

    //         const gfd = new FormData();
    //         const localItems = gallery.filter(item => item.status === "local");


    //         const localFiles = localItems
    //             .map(item => item.file ?? item)   // если item = {file: File}, берём item.file, иначе item
    //             .filter(f => f instanceof File);  // страхуемся


    //         if (localFiles.length===0) {

    //             return
            
    //             } else {
    //                 localFiles.forEach((file) => {
    //                     gfd.append("gallery", file); 
    //                 });

    //                 console.log('gfd = ',gfd)
    //             await addGallery(hallID,gfd);
    //             setGallery([]);
    //         } 

    //         await loadingHalls();


    //     } catch (err){
    //         console.log(err)
    //     }
    // }

    // const handleDeleteItem = async (id) => {
    //     try {
    //         await deleteHall(id); // твой API вызов
    //         setHalls(halls => halls.filter(hall => hall.id !== id)); 
    //     } catch (err) {
    //         console.error("Ошибка удаления", err);
    //     }
    // };

    const [modalType, setModalType] = useState(null);

    const [showModal, setShowModal]= useState(false);

    const [hallData, setHallData]= useState({
        name: "",
        area_m2: "",
        capacity: "",
        price: "",
    });


    const handleGetHall =  (id) => {
        
        //   const res =  await getHall(id); // твой API вызов
        //   console.log(res.data);
            setActiveID(id);
            setShowModal(true);
            setModalType('edit');
            // const getGallery = await getHalsGallery(id);
            // console.log(getGallery.data)
            // setGallery(getGallery.data.items)
    }



    useEffect(()=>{
        if (!hall) return;
        setHallData({
                name: hall.name,
                area_m2: hall.area_m2,
                capacity: hall.capacity,
                price: hall.price,
        });
    }, [hall])


    // const updateHallItem= async (id, hallData) =>{
    //     try {
    //         const fd = new FormData();
    //         fd.append("name", hallData.name);
    //         fd.append("area_m2", hallData.area_m2);
    //         fd.append("capacity", hallData.capacity);
    //         fd.append("price", hallData.price);

    //         const hallID = id; // <-- важно
    //         console.log('АЙДИ КОМНАТЫ. = ',hallID);

    //         const gfd = new FormData();
    //         const localItems = gallery.filter(item => item.status === "local");


    //         const localFiles = localItems
    //             .map(item => item.file ?? item)   // если item = {file: File}, берём item.file, иначе item
    //             .filter(f => f instanceof File);  // страхуемся


    //         if (localFiles.length===0) {

    //             return
            
    //             } else {
    //                 localFiles.forEach((file) => {
    //                     gfd.append("gallery", file); 
    //                 });

    //                 console.log('gfd = ',gfd)
    //             await addGallery(hallID,gfd);

    //             setGallery([]);
    //         } 


    //         await updateHall(id, fd); 


    //         await loadingHalls();
    //     } catch (err) {
    //         console.error("Ошибка Добавления", err);
    //     }
    // }

    const handleAddHallItem = () =>{
        setShowModal(true);
        setModalType("add");
        setHallData({
            name: "",
            area_m2: "",
            capacity: "",
            price: ""
        })
        setGallery([])
    }
    
    // const [gallery, setGallery] = useState([]);
    const [galleryNewFiles, setGalleryNewFiles] = useState([]);


    return(
        <>
        <div className={cls.roomsContent}> 
        <button 
            className={cls.addBtn} 
            onClick={handleAddHallItem}
        >Добавить
        </button>
            <div className={cls.roomsContentTable}>
                <div className={cls.roomsContentTableTop}>
                    <p>Название зала</p>
                    <p>Вместимость, max</p>
                    <p>Цена</p>
                    <p>Дополнительно</p>
                </div>
                <div className={cls.roomsContentTableContent}>
                    {loading && <div className={cls.spinnerWrapper}>
                        <Spinner />
                    </div>}
                    {halls?.map((hall, index)=>{
                        return(
                            <div className={cls.hallItem} key={index}>
                                <div className={cls.hallItemName}>
                                    <p>{hall.name}</p>
                                </div>
                                <div className={cls.hallItemCapacity}>
                                    <p>{hall.capacity}</p>
                                </div>
                                <div className={cls.hallItemPrice}>
                                    <p>{hall.price}</p>
                                </div>
                                <div className={cls.hallItemMore}>
                                    <div className={cls.hallItemButtons}>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <p></p>
                                        </button>
                                        <button onClick={()=>handleGetHall(hall.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M4.5 19.5h4l10.5-10.5a2 2 0 0 0 0-2.8l-.7-.7a2 2 0 0 0-2.8 0L5.5 15.5v4Z" stroke="#1D1D1B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <button onClick={()=>deleteItem(hall.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M4 7h16" stroke="#E04B4B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>

                                            <path d="M9 4h6" stroke="#E04B4B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>

                                            <rect x="6" y="7" width="12" height="13" rx="2" stroke="#E04B4B" strokeWidth="1.25"/>

                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        {showModal && 
            <RoomModal            
                modalType={modalType}
                hallData={hallData} 
                closeModal={()=>setShowModal(false)}
                setHallData={setHallData}
                onAdd={()=>{createHall({hallData, gallery});}}
                onEdit={()=>{updateItem(activeID, hallData, gallery);}}
                setGallery={setGallery}
                setGalleryNewFiles={setGalleryNewFiles}
                galleryNewFiles={galleryNewFiles}
                gallery={gallery}
                reload={reload}
            />}
        </>
    )
}