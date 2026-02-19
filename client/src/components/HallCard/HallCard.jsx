import cls from './HallCard.module.css'
import img1 from '../../pages/HomePage/images/conference/1.avif'

export const HallCard = ({hall}) =>{
    return(
        <div className={cls.conferenceHallItem}>
            <div className={cls.conferenceHallItemImg} >
                <img src={img1} alt='img'/>
            </div>
            <div className={cls.conferenceHallItemText}>
                <p className={cls.conferenceHallSquare}>
                    {hall.area_m2} м²
                </p>
                <ul className={cls.conferenceHallItemTextDescriptions}>
                                                <li className={cls.descriptionItem}>
                                                    <span>Название</span>
                                                    <span>{hall.name}</span>
                                                </li>
                                                <li className={cls.descriptionItem}>
                                                    <span>Вместимость</span>
                                                    <span>до {hall.capacity}</span>
                                                </li>
                                                <li className={cls.descriptionItem}>
                                                    <span>Наличие экрана</span>
                                                    <span>Да</span>
                                                </li>
                                                <li className={cls.descriptionItem}>
                                                    <span>Срок аренды</span>
                                                    <span>От 4 часов</span>
                                                </li>
                                                <li className={cls.descriptionItem}>
                                                    <span>Площадь</span>
                                                    <span>{hall.area_m2} м²</span>
                                                </li>
                </ul>
            </div>   
            <a href={`/halls/${hall.id}`} className={cls.conferenceHallItemLink}><p>Подробнее</p></a>
        </div>  
    )
}