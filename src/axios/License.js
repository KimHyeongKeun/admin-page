import { CREATE_LICENSE, DELETE_LICENSE, LICENSE_LIST, MODIFY_LICENSE } from "../constants/api";
import { CONTENT_TYPE } from "../constants/content-type";
import { ACCESS_TOKEN } from "../constants/token";
import request from "./axios";

export const getLicenseList = async () => {
  return request.get(LICENSE_LIST(), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

export const createLicense = (dto, image) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson })
  );
  return request.post(CREATE_LICENSE(), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": CONTENT_TYPE.MultipartFormData,
    },
  });
};



export const modifyLicense = (dto, licenseImageId, image, ) => {
  const formData = new FormData();
  formData.append("images", image);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson })
  );
  return request.put(MODIFY_LICENSE(licenseImageId), formData, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": "multipart/form-data",
    },
  });
}



export const deleteLicense = (id) => {
  return request({
    url: DELETE_LICENSE(id),
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": "application/json",
    },
  });
};
