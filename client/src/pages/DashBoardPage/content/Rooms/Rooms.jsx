import { useState, useEffect } from 'react'
import cls from './Rooms.module.css'
import {  } from 'react';
import { RoomModal } from './content/RoomModal';
import { Spinner } from '../../../../components/Spinner';
import { useHalls } from '../../../../hooks/useHalls';
import { useHall } from '../../../../hooks/useHall';

export const Rooms = () =>{

    const [activeID, setActiveID] = useState(null);

    const {halls, loading, reload, createHall, deleteItem, updateItem} = useHalls();

    const {hall, gallery, setGallery} = useHall(activeID);

    const [modalType, setModalType] = useState(null);

    const [showModal, setShowModal]= useState(false);

    const [hallData, setHallData]= useState({
        name: "",
        area_m2: "",
        capacity: "",
        price: "",
    });

    const handleGetHall =  (id) => {
        setActiveID(id);
        setShowModal(true);
        setModalType('edit');
    }

    useEffect(()=>{
        if (modalType !== "edit" || !hall) return;
        setHallData({
            name: hall.name ?? "",
            area_m2: hall.area_m2 ?? "",
            capacity: hall.capacity ?? "",
            price: hall.price ?? "",
        });
    }, [hall, modalType])

    const handleAddHallItem = () =>{
        setActiveID(null)
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