import { useCallback, useMemo, useState } from "react";
import { addBooking } from "../api/booking.api.js";

// Date -> "YYYY-MM-DD"
const toYmd = (d) => {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export const useBookingForm = ({ hallId, initialDateStr = "", onSuccess } = {}) =>{
  const [dateObj, setDateObj] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    start_date: initialDateStr,
    count: "",
    seating_type: "",
    hall_id: hallId,
  });

  const [duration, setDuration] = useState(1);
  const [showArrangementTypes, setShowArrangementTypes] = useState(false);
  const [type, setType] = useState(null);

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const effectiveHallId = useMemo(() => hallId, [hallId]);

  const setField = useCallback((key, value) => {
    setBookingData((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
    setSubmitError("");
  }, []);

  const setDate = useCallback(
    (d) => {
      setDateObj(d);
      const ymd = toYmd(d);
      setField("start_date", ymd);
      if (!d) setErrors((p) => ({ ...p, start_date: "Ошибка даты" }));
    },
    [setField]
  );

  const setSeating = useCallback(
    (label) => {
      setType(label);
      setField("seating_type", label);
      setShowArrangementTypes(false);
    },
    [setField]
  );

  const validate = useCallback(() => {
    const e = {};
    const required = ["name", "phone", "start_date", "count", "seating_type"];

    for (const k of required) {
      if (!bookingData[k]) e[k] = "Заполните поле";
    }

    if (bookingData.phone && bookingData.phone.includes(" ")) {
      e.phone = "Введите номер полностью";
    }

    if (bookingData.count && Number(bookingData.count) <= 0) {
      e.count = "Количество должно быть больше 0";
    }

    setErrors(e);
    return Object.keys(e).length > 0; // true = есть ошибки
  }, [bookingData]);

  const submit = useCallback(
    async ({ preventIfBooked = false, isBooked = false } = {}) => {
      if (preventIfBooked && isBooked) {
        setSubmitError("Зал уже занят на выбранную дату");
        return false;
      }

      if (validate()) return false;

      try {
        setLoading(true);
        setSubmitError("");

        const fd = new FormData();
        fd.append("name", bookingData.name);
        fd.append("phone", bookingData.phone);
        fd.append("start_date", String(bookingData.start_date));
        fd.append("count", String(Number(bookingData.count)));
        fd.append("seating_type", bookingData.seating_type);
        fd.append("hall_id", String(effectiveHallId ?? bookingData.hall_id));

        await addBooking(fd);

        setSent(true);
        onSuccess?.();
        return true;
      } catch (err) {
        console.error(err);
        setSubmitError("Ошибка отправки. Попробуйте ещё раз");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [bookingData, effectiveHallId, onSuccess, validate]
  );

  const reset = useCallback(() => {
    setBookingData({
      name: "",
      phone: "",
      start_date: initialDateStr,
      count: "",
      seating_type: "",
      hall_id: hallId,
    });
    setDateObj(null);
    setDuration(1);
    setShowArrangementTypes(false);
    setType(null);
    setErrors({});
    setSubmitError("");
    setSent(false);
  }, [hallId, initialDateStr]);

  return {
    bookingData,
    dateObj,

    duration,
    showArrangementTypes,
    type,

    errors,
    submitError,
    loading,
    sent,

    setField,
    setDate,
    setDuration,
    setShowArrangementTypes,
    setSeating,

    submit,
    reset,
    setSent,
  };
}