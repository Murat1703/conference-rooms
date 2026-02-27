import cls from './BookingModal.module.css'

export const BookingModal = ({close}) =>{
    return(
        <div className={cls.bookingModalWrapper} onClick={close}>
            <div className={cls.bookingModalInner} onClick={(e)=>e.stopPropagation()}>
                <p>Добавить бронь</p>
                <div className={cls.bookingModalValues}>
                    <div className={cls.bookingModalValue}>
                        <p>Имя</p>
                        <input type="text" />
                    </div>
                    <div className={cls.bookingModalValue}>
                        <p>Телефон</p>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    )
}