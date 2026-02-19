import * as hallsRepository from "../repositories/halls.respository.js";

export const getAll = () => {
  return hallsRepository.getHalls();
};


export const getHallItem = (id) => {
  return hallsRepository.getById(id);
};

export const createHallItem = (data) =>{
  return hallsRepository.createHall(data);
}

export const deleteHallItem = (id) =>{
  return hallsRepository.deleteHall(id);
}

export const editHallItem = (id, data)=>{
  return hallsRepository.updateHall(id, data)
}