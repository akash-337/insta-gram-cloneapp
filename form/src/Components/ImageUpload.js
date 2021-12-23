import React, { useEffect, useState } from "react";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";

const ImageUpload = ({ passedfuncton ,bolean}) => {
  // const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      if (!image) {
        alert("image not selected");
      }
      data.append("file", image);
      data.append("upload_preset", "image-upload");
      data.append("cloud_name", "dykvwyvcr");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dykvwyvcr/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const getData = await res.json();
      setImageUrl(getData.url);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  //  upload image to DB
  // const progressBar = Math.round(
  //     (bytesTransferred/totalBytes)*100
  // )
  // setProgress(progressBar)

  const createPost = async () => {
    if (imageUrl) {
      try {
        const res = await fetch("/app/createpost", {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            caption,
            imageUrl,
          }),
        });
        const response = await res.json();
        if (!response) {
          alert("invalid image");
        } else {
          // alert("Post Created successfull");
          setCaption("");
          setImageUrl("");
          setImage("");
          passedfuncton();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    createPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div style={{position: "fixed",bottom: "10px"}}>
      <Button onClick={() => setIsOpen(true)}>UPLOAD POST</Button>
      <Modal onClose={close} isOpen={isOpen}>
        <ModalHeader>UPLOAD</ModalHeader>
        <ModalBody>
          <div style={{display: "grid", justifyContent: "center",gap:"15px"}}>
            <input
              style={{
                marginLeft: "90px",
                marginTop: "6px",
                marginBottom: "6px",
              }}
              type="file"
              disabled={bolean}
              onChange={handleChange}
            ></input>
            <textarea
              style={{height: "80px",    border: "1px solid lightgray",fontFamily: "'Raleway', sans-serif"}}
              type="text"
              disabled={bolean}
              placeholder="Enter a caption..."
              onChange={handleCaption}
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={close}>
            Cancel
          </ModalButton>
          <ModalButton disabled={bolean} onClick={handleUpload}>upload</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ImageUpload;
