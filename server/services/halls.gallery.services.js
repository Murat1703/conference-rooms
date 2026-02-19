import * as hallGalleryRepo from "../repositories/halls.gallery.repository.js";


export const getGalleryByHallId = async (hallID)=>{
    return hallGalleryRepo.getGalleryByHallId(hallID)
}

export const addGallery = async (hallID, urls) =>{
    return hallGalleryRepo.addGallery(hallID, urls)
}

export const editGalleryItem = async (id, data) => {
  return hallGalleryRepo.editGalleryItem(id, data);
};

export const deleteGalleryItem = async(galleryID)=>{
    return hallGalleryRepo.deleteImgById(galleryID)
}