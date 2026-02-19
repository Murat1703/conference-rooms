import { useMemo } from "react";
import "./monthGrid.css";

// weekStartsOn: 1 = Monday, 0 = Sunday
function startOfMonthGrid(date, weekStartsOn = 1) {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  const day = d.getDay(); // 0..6 (Sun..Sat)
  const diff = (day - weekStartsOn + 7) % 7; // how many days back
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function ymdLocal(date) {
  // ключ дня в локальном времени
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * bookings: [{ id, title, start: ISO, end: ISO, status }]
 */
export const MonthGrid = ({
  value = new Date(),        // месяц который показываем
  bookings,
  weekStartsOn = 1, // Пн
  setChangeMonth,
  changeMonth         
}) => {
  const month = value.getMonth();
  const year = value.getFullYear();

  // генерим 42 дня (6 недель) как FullCalendar
  const days = useMemo(() => {
    const start = startOfMonthGrid(new Date(year, month, 1), weekStartsOn);
    return Array.from({ length: 35 }, (_, i) => addDays(start, i));
  }, [year, month, weekStartsOn]);

  // группируем брони по дню старта
  const bookingsByDay = useMemo(() => {
    const map = new Map();
    for (const b of bookings) {
      const d = new Date(b.start_date);
      const key = ymdLocal(d);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(b);
    }
    // сортировка внутри дня по времени старта (если оно есть)
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => new Date(a.start) - new Date(b.start));
      map.set(k, arr);
    }
    return map;
  }, [bookings]);

  const monthTitle = new Date(year, month, 1).toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  const weekDays = useMemo(() => {
    // Пн..Вс
    const base = new Date(2026, 1, 2); // любой понедельник
    return Array.from({ length: 7 }, (_, i) =>
      addDays(base, i).toLocaleDateString("ru-RU", { weekday: "short" })
    );
  }, []);

  const today = new Date ();
  console.log('today = ', today.getDate())
  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()



  return (
    <div className="mg">
      <div className="mgTop">
        <div className="mgTitle">{monthTitle}</div>
        <div className="mgButtons">
          <button onClick={()=>setChangeMonth(changeMonth + 1)}>
            След месяц
          </button>
          <button onClick={()=>setChangeMonth(today.getMonth())}>Сегодня</button>
          <button onClick={()=>setChangeMonth(changeMonth - 1)}>
            Предыдущий месяц
          </button>
        </div>

      </div>

      <div className="mgWeekHeader">
        {weekDays.map((w, i) => (
          <div key={i} className="mgWeekDay">{w}</div>
        ))}
      </div>

      <div className="mgGrid">
        {days.map((d, idx) => {
          const isCurrentMonth = d.getMonth() === month;
          const key = ymdLocal(d);
          const dayBookings = bookingsByDay.get(key) || [];
          // console.log(d)
          return (
            <div
              key={idx}
              className={`mgCell ${isCurrentMonth ? "" : "isOtherMonth"} ${isSameDay(today, d) ? `todayCell`: ``} `}
            >
              <div className={`mgCellTop `}>
                <span className="mgDayNum">{d.getDate()}</span>
              </div>

              <div className="mgEvents">
                {dayBookings.slice(0, 3).map((b) => (
                  <div key={b.id} className={`mgEvent st-${b.status || "booked"}`}>
                    {b.name} | 
                    <span> {b.hall_name}</span>
                  </div>
                ))}

                {dayBookings.length > 3 && (
                  <div className="mgMore">+{dayBookings.length - 3} ещё</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
