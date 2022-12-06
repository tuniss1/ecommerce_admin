import { useState } from "react";
import { Card, CardMedia, IconButton, Backdrop } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const ImageCard = ({ image, name, setZoomObj, id, deleteImage, deleteIcon, zoomIcon, index }) => {
  const [isHover, setIsHover] = useState(false);
  const onMouseOver = () => setIsHover(true);
  const onMouseOut = () => setIsHover(false);
  const setZoom = () => {
    setZoomObj(index);
  };
  const handleDeleteImage = () => {
    deleteImage(id);
  };
  return (
    <Card onMouseOver={onMouseOver} onMouseOut={onMouseOut} sx={{ position: "relative" }}>
      <Backdrop
        open={isHover}
        sx={{
          position: "absolute",
          zIndex: 10,
          color: "#fff",
          height: "fit-content",
          top: "100%",
          transform: "translateY(-100%)",
          py: deleteIcon ? "4px" : 0,
        }}
      >
        {deleteIcon && (
          <IconButton
            onClick={handleDeleteImage}
            size="large"
            sx={{ color: "white", "&:hover": { background: "#999999" } }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {zoomIcon && (
          <IconButton onClick={setZoom} size="large" sx={{ color: "white" }}>
            <ZoomOutMapIcon />
          </IconButton>
        )}
      </Backdrop>
      <CardMedia component="img" sx={{ maxHeight: 200, objectFit: "scale-down" }} image={image} />
    </Card>
  );
};
export default ImageCard;
