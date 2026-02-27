import cls from "./BookingModal.module.css";
import { Button } from "../Button";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { useMask } from "@react-input/mask";

export const BookingModal = ({ hall, onClose, booking, isBooked }) => {
  const phoneMask = useMask({
    mask: "+7-___-___-__-__",
    replacement: { _: /\d/ },
  });

  console.log('booking ', booking)


  return (
    <div className={cls.bookingModal} onClick={onClose}>
      <div className={cls.hallsPagePrice} onClick={(e) => e.stopPropagation()}>
        <button className={cls.btnCloseModal} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 7l10 10" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 7l-10 10" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={`${cls.hallsPageDate} ${cls.hallsPageValuesItem}`}>
          <DatePicker
            selected={booking.dateObj}
            onChange={booking.setDate}
            minDate={new Date()}
            placeholderText="Выберите дату"
            dateFormat="dd.MM.yyyy"
            className="dateInput"
            popperPlacement="top-start"
            locale={ru}
          />
          <span>Дата</span>
          {isBooked == true && <span className={cls.errText}>Зал занят в этот день</span>}
          {/* {booking.errors.start_date && <span className={cls.errText}>{booking.errors.start_date}</span>} */}
        </div>

        <div className={cls.hallsPageValuesItem}>
          <span>Имя</span>
          <input
            type="text"
            value={booking.bookingData.name}
            onChange={(e) => booking.setField("name", e.target.value)}
          />
          {booking.errors.name && <span className={cls.errText}>{booking.errors.name}</span>}
        </div>

        <div className={cls.hallsPageValuesItem}>
          <span>Контактный номер</span>
          <input
            type="text"
            ref={phoneMask}
            value={booking.bookingData.phone}
            onChange={(e) => booking.setField("phone", e.target.value)}
          />
          {booking.errors.phone && <span className={cls.errText}>{booking.errors.phone}</span>}
        </div>

        <div className={`${cls.hallsPagePriceDuration} ${cls.hallsPageValuesItem}`}>
          <span>Продолжительность</span>

          <div className={cls.durationItem} onClick={() => booking.setDuration(0.5)}>
            <div>{booking.duration === 0.5 && <span />}</div>
            <p>Пол дня</p>
          </div>

          <div className={cls.durationItem} onClick={() => booking.setDuration(1)}>
            <div>{booking.duration === 1 && <span />}</div>
            <p>Целый день</p>
          </div>
        </div>

        <div className={cls.hallsPageValuesItem}>
          <span>Количество гостей</span>
          <input
            type="number"
            value={booking.bookingData.count}
            onChange={(e) => booking.setField("count", e.target.value)}
          />
          {booking.errors.count && <span className={cls.errText}>{booking.errors.count}</span>}
        </div>

        <div className={cls.hallsPageValuesItem}>
          <span>Тип рассадки</span>

          <div
            className={cls.hallsSitType}
            onClick={() => booking.setShowArrangementTypes(!booking.showArrangementTypes)}
          >
            <div className={cls.hallsSeatingArrangement}>
              <p>{!booking.type ? "Выберите тип рассадки" : booking.type}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ rotate: booking.showArrangementTypes ? "180deg" : undefined }}
              >
                <path d="M6 9l6 6 6-6" stroke="#1D1D1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {booking.showArrangementTypes && (
              <ul className={cls.arrangementTypesList}>
                <li onClick={() => booking.setSeating("Театральная")}>Театральная</li>
                <li onClick={() => booking.setSeating("С Партами")}>С Партами</li>
                <li onClick={() => booking.setSeating("Островками")}>Островками</li>
                <li onClick={() => booking.setSeating("П-образная")}>П-образная</li>
              </ul>
            )}
          </div>

          {booking.errors.seating_type && <span className={cls.errText}>{booking.errors.seating_type}</span>}
        </div>

        <div className={cls.priceInfo}>
          <p>Стоимость аренды</p>
          <p>{hall?.price} тг</p>
        </div>

        {booking.submitError && <div className={cls.errText}>{booking.submitError}</div>}
        {booking.loading && <div>....Loading ...</div>}
        {booking.sent && <div>Спасибо, бронь поставлена</div>}

        {!booking.sent && (
          <Button action={() => booking.submit({ preventIfBooked: true, isBooked })}>
            <p>Отправить заявку</p>
          </Button>
        )}
      </div>
    </div>
  );
};