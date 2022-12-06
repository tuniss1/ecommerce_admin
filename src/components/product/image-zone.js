import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageCard from "./image-card";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";

const ImageZone = ({ images, setFieldValue, mode }) => {
  const [imageLst, setImageLst] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setFieldValue("images", Object.values(imageLst));
  }, [imageLst]);

  useEffect(() => {
    const fetchImg = async () => {
      const initImageLst = {};
      for (const ele of images) {
        const ind = images.indexOf(ele);
        if (typeof ele === "string") {
          initImageLst[ind] = {
            id: String(ind),
            url: ele,
            isDeleted: false,
            isNew: false,
          };
        } else {
          initImageLst[ele.id] = {
            id: ele.id,
            url: ele.url,
            ref: ele.ref,
            isDeleted: false,
            isNew: false,
          };
        }
      }
      setImageLst(initImageLst);
    };

    fetchImg();
  }, []);

  const handleAddImage = (e) => {
    e.preventDefault();
    let files = e.target.files;

    Object.entries(files).map(async ([key, value]) => {
      let fileReader = new FileReader();
      const file = files[key];

      if (!file || !["image/png", "image/jpg", "image/jpeg", "image/bmp"].includes(file.type)) {
        enqueueSnackbar("Wrong file format!", { variant: "warning" });
        return;
      }

      fileReader.onloadend = () => {
        setImageLst((cur) => {
          const id = uuidv4();
          return {
            ...cur,
            [id]: {
              id: id,
              url: fileReader.result,
              file: file,
              format: file.name.slice(file.name.indexOf(".")),
              isDeleted: false,
              isNew: true,
            },
          };
        });
      };

      fileReader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (id) => {
    setImageLst((cur) => ({
      ...cur,
      [id]: {
        ...cur[id],
        isDeleted: true,
      },
    }));
  };

  return (
    <Card style={{ marginTop: "24px" }}>
      <CardHeader
        title="Image"
        action={
          <IconButton
            size="large"
            color="primary"
            sx={{ position: "relative" }}
            disabled={mode === 2}
          >
            <AddPhotoAlternateIcon />
            <input
              type="file"
              value=""
              style={{
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 1,
                top: 0,
                left: 0,
                borderRadius: "50%",
                cursor: "pointer",
              }}
              accept="image/png, image/jpg, image/jpeg, image/bmp"
              onChange={(e) => handleAddImage(e)}
              multiple
            />
          </IconButton>
        }
      />

      <Divider />
      <CardContent>
        <ImageList
          cols={4}
          sx={{
            flexWrap: "nowrap",
            transform: "translateZ(0)",
          }}
        >
          {Object.keys(imageLst).map(
            (ele, ind) =>
              !imageLst[ele].isDeleted && (
                <ImageListItem key={ind}>
                  <ImageCard
                    id={ele}
                    index={ind}
                    image={imageLst[ele].url}
                    name={imageLst[ele].name}
                    deleteImage={handleDeleteImage}
                    deleteIcon={mode !== 2}
                  />
                </ImageListItem>
              )
          )}
        </ImageList>
      </CardContent>
    </Card>
  );
};

export default ImageZone;
