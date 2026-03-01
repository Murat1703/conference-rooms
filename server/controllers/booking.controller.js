import * as bookingServices from '../services/booking.services.js'

export const getBooking = async (req, res, next) => {
  try {
    const bookings = await bookingServices.getBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

// export const getBookingWithHallName = async(req, res, next) =>{
//   try {
//     const bookings = await bookingServices.getBookingsWithHallName();
//     res.json(bookings);
//   } catch (err) {
//     next(err);
//   }
// }

export const getBookingsWithHallName = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const data = await bookingServices.getBookingsWithHallName({ page, limit });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingServices.getBookingsById(id);
    if (!booking) {
      return res.status(404).json({ message: "Не найдена бронь" });
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

export const getBookingByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    const booking = await bookingServices.getBookingsByDate(date);
    if (!booking) {
      return res.status(400).json({ message: "date query required (YYYY-MM-DD)"  });
    }
    res.json(booking || []);
    console.log(booking)
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    console.log("CReAte booking Body:", req.body);

    const booking = await bookingServices.createBookings({...req.body});

    res.status(201).json(booking);
  } catch (booking) {
    next(booking);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const bookingItem = await bookingServices.deleteBookings(id);
    if (bookingItem===0) {
      return res.status(404).json({ message: "Бронь не найдена" });
    }
    res.json(
      {
        message: "Бронь удалена",
        bookingItem: bookingItem
      }
    );


 
  } catch (err) {
    next(err);
  }
};