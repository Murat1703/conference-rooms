import cls from './RoomModal.module.css'
import { useState } from 'react'
import { deleteGalleryItem } from '../../../../../../api/halls.gallery.api.js'

export const RoomModal = ({modalType, hallData, closeModal ,setHallData, onAdd, onEdit, setGallery,setGalleryNewFiles, galleryNewFiles, gallery
}) =>{
    
    const handleSubmit = () =>{
        modalType == 'add' ? onAdd(): modalType == 'edit'? onEdit(): null
    }


    const [inputKey, setInputKey] = useState(0);
    const [preview, setPreview] = useState([]);

    const onPickGallery = (e) => {
        // const files = Array.from(e.target.files || []);
        // setGallery(prev => [...prev, ...files]);
        // setGalleryNewFiles(prev=> [...prev, ...files]);
        // console.log(galleryNewFiles)
        // сброс input (иначе повторный выбор тех же файлов не сработает)
        setInputKey(k => k + 1);
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const localItems = files.map((file) => ({
            tempId: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            status: "local",
        }));

        // console.log('localItems',localItems)

        setGallery((prev) => [...prev, ...localItems]);
        // console.log('gallery = ', gallery)

    };

    const handleDeleteGalleryItem = async (itemId) =>{
        try{
           await deleteGalleryItem(itemId);
           setGallery(prev => prev.filter(e => e.id !== itemId)); 
        } catch(err){
            console.log(err)
        }        
    }


    return(
        <div className={cls.roomModalWrapper} onClick={closeModal}>
            <div className={cls.roomModalContent} onClick={(e)=>e.stopPropagation()}>
                <div className={cls.roomModalContentTop}>
                    <p>{modalType == 'add'?`Добавление зала`: `Редактирование зала`}</p>
                    <button onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7 7l10 10" stroke="rgba(235, 233, 225, 1)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 7l-10 10" stroke="rgba(235, 233, 225, 1)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className={cls.roomModalGallery}>
                    <div className={cls.roomModalGalleryTop}>
                        <p>Галерея</p>
                        <button className={cls.attachementBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g transform="rotate(-30 12 12)">
                                <path d="M7 12.5l6.5-6.5a3 3 0 1 1 4.2 4.2L9.8 18.1a5 5 0 1 1-7.1-7.1l8.3-8.3" stroke="rgba(235, 233, 225, 1)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            </svg>
                            <p>Прикрепить фото </p>
                        <input 
                            key={inputKey}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={onPickGallery}
                        />

                        </button>
                    </div>
                    <div className={cls.roomModalGalleryItems}>
                        {gallery?.map((imgItem, index)=>{
                            return(
                                <div key={imgItem.status === "local"? imgItem.tempId : imgItem.id} className={cls.imgWrapper} >
                                    <img  src={imgItem.status==="local"?imgItem.previewUrl:imgItem.image_url} alt='galleryItemPreview'/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={()=>handleDeleteGalleryItem(imgItem.id)}>
                                    <path d="M4.5 7h15" stroke="rgba(235, 233, 225, 1)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9 5h6" stroke="rgba(235, 233, 225, 1)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                    <rect x="7" y="7" width="10" height="13" rx="2" stroke="rgba(235, 233, 225, 1)" strokeWidth="1.25"/>
                                    <path d="M10 11v6M14 11v6" stroke="rgba(235, 233, 225, 1)" strokeWidth="1.25" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            )
                        })} 

                    </div>
                </div>
                <div className={cls.roomModalContentItem}>
                    <p>Название зала</p>
                    <input 
                        type="text" 
                        value={hallData.name}
                        onChange={(e)=>setHallData({...hallData, name: e.target.value})}
                    />
                </div>
                <div className={cls.roomModalContentItem}>
                    <p>Площадь</p>
                    <input 
                        type="number" 
                        value={hallData.area_m2}
                        onChange={(e)=>setHallData({...hallData, area_m2: e.target.value})}
                    />
                </div>
                <div className={cls.roomModalContentItem}>
                    <p>Максимальное количество</p>
                    <input 
                        type="number" 
                        value={hallData.capacity}
                        onChange={(e)=>setHallData({...hallData, capacity: e.target.value})}
                    />
                </div>
                <div className={cls.roomModalContentItem}>
                    <p>Цена за день</p>
                    <input 
                        type="number" 
                        value={hallData.price}
                        onChange={(e)=>setHallData({...hallData, price: e.target.value})}    
                    />
                </div>
                <button 
                    className={cls.actionBtn} 
                    onClick={()=>{handleSubmit(); closeModal();}}
                >
                    <p>{modalType == "add"? `Добавить`:modalType=="edit"?`Редактировать`: null}</p>
                </button>

            </div>
        </div>
    )
}