import * as hallsServices from "../services/halls.services.js";

export const getHalls = async (req, res, next) => {
  try {
    const halls = await hallsServices.getAll();
    res.json(halls);
  } catch (err) {
    next(err);
  }
};

export const getHallById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hall = await hallsServices.getHallItem(id);
    if (!hall) {
      return res.status(404).json({ message: "Не найден зал" });
    }
    res.json(hall);
  } catch (err) {
    next(err);
  }
};

export const createHallItem = async (req, res, next) => {
  try {
    // let posterUrl = null;
    // if (req.file) {
    //   const outDir = path.resolve("uploads/news");
    //   const filename = await saveImageWebp(req.file.buffer, outDir, 1600);
    //   posterUrl = `/uploads/news/${filename}`;
    // }
    // console.log(req.body);
    console.log("BODY:", req.body);


    const hall = await hallsServices.createHallItem({...req.body});

    res.status(201).json(hall);
  } catch (err) {
    next(err);
  }
};

export const deleteHall = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const hall = await hallsServices.deleteHallItem(id);
    if (!hall) {
      return res.status(404).json({ message: "Зал не найден" });
    }
    res.json(
      {
        message: "Зал удален",
        hall: hall
      }
    );


 
  } catch (err) {
    next(err);
  }
};

export const editHall = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldHallItem = await hallsServices.getHallItem(id);
    if (!oldHallItem) {
      return res.status(404).json({ message: "Зал не найден" });
    }


    // let posterUrl = oldEvent.poster; // по умолчанию старый

    // 2️⃣ если пришёл новый файл
    // if (req.file) {
    //   const outDir = path.resolve("uploads/events");
    //   const filename = await saveImageWebp(req.file.buffer, outDir, 1600);
    //   posterUrl = `/uploads/events/${filename}`;

    //   // 3️⃣ удаляем старый файл
    //   if (oldEvent.poster) {
    //     const oldPath = path.resolve(oldEvent.poster.replace(/^\//, ""));
    //     fs.promises.unlink(oldPath).catch(() => {});
    //   }
    // }

    // 4️⃣ обновляем в БД
    const updatedHall = await hallsServices.editHallItem(id, {
      ...req.body,
    });

    res.json(updatedHall);



    // const event = await eventsService.update(id, req.body);
    // res.json(event);
  } catch (err) {
    next(err);
  }
};