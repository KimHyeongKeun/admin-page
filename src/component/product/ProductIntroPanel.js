import ImageInput from "./ProductIntroImageInput";
import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  addProductIntroduction,
  modifyProductIntroduction,
} from "../../axios/Product";

export default function ProductIntroPanel({ introductionImageUrl }) {
  const { productId } = useParams();
  const [imgFile, setImgFile] = useState(introductionImageUrl);
  const [previousImg, setPreviousImg] = useState(introductionImageUrl);

  async function upload(productId, imgFile) {
    if (previousImg) {
      // 기존 이미지 파일이 존재하는 경우
      const response = await modifyProductIntroduction(productId, imgFile);
      if (response.status === 204) {
        alert("이미지 수정 성공!");
      } else {
        alert(`[${response.status} ERROR] 이미지 수정 실패.`);
      }
    } else {
      // 기존 이미지 파일이 존재하지 않는 경우
      const response = await addProductIntroduction(productId, imgFile);
      if (response.status === 201) {
        alert("이미지 추가 성공!");
      } else {
        alert(`[${response.status} ERROR] 이미지 추가 실패.`);
      }
    }
  }


  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const imgFile = event.target.file.files[0];
        upload(productId, imgFile);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          type="button"
          sx={{ marginRight: 1, color: "black", borderColor: "black" }}
          variant="outlined"
          disabled={imgFile === null}
          onClick={() => {
            // [TODO] 상품 소개 미리보기
            window.alert("구현되지 않은 기능입니다.");
            // window.open(
            //   "https://liberty52.com/order",
            //   "_blank",
            //   "noopener, noreferrer"
            // );
          }}
        >
          미리보기
        </Button>
        <Button
          type="submit"
          sx={{ fontWeight: "bold" }}
          variant="outlined"
          disabled={imgFile === previousImg}
        >
          업로드
        </Button>
      </div>
      <ImageInput imgFile={imgFile} setImgFile={setImgFile} />
    </form>
  );
}
