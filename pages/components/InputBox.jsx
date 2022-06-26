import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { TextField, Grid, Box, Typography, ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SendIcon from '@mui/icons-material/Send';

export default function InputBox() {
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const [postLength, setPostLength] = useState(0);
  const [images, setImages] = useState([]);
  const fileRef = useRef();
  const postRef = useRef();

  const onPostChange = (e) => {
    e.preventDefault();
    setPostLength(postRef.current.value.length);
  };

  const addImageToPost = (e) => {
    if (images.length === 5) {
      alert('Cannot upload more than 5 photos per post.');
      return;
    }
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setImages([...images, event.target.result]);
    };
  };

  const postRequest = async () => {
    await fetch('/api/posts/createPost', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userID: sessionObj.id,
        name: sessionObj.name,
        email: sessionObj.email,
        profPic: sessionObj.image,
        message: postRef.current.value,
        photos: images,
      }),
    });
  };

  const sendPost = (e) => {
    e.preventDefault();
    if (!postRef.current.value) {
      return;
    }
    postRequest();
    postRef.current.value = null;
    setImages([]);
    setPostLength(0);
  };

  const removeImage = (toRemove) => {
    const newArray = images.filter(
      (image) => image !== toRemove,
    );
    setImages(newArray);
  };

  return (
    <div>
      <h1 align="center">
        Share your thoughts.
      </h1>
      <ImageList sx={{ display: 'flex', justifyContent: 'center' }}>
        {images.length > 0 && (
          images.map((image, number) => (
            <ImageListItem key={number}>
              <Image src={image} alt="N/A" width={50} height={50} objectFit="contain" onClick={() => { removeImage(image); }} />
            </ImageListItem>
          ))
        )}
      </ImageList>
      <Box sx={[{ mx: 3, mb: 2 }, postLength === 300 && { color: 'red' }]}>
        <Box sx={{ pb: 1 }}>
          <div align="right">
            {postLength}
            /300
          </div>
        </Box>
        <TextField fullWidth multiline label="Post" variant="outlined" inputRef={postRef} onChange={(e) => { onPostChange(e); }} inputProps={{ maxLength: 300 }} />
      </Box>
      <Grid container justifyContent="space-evenly" sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', px: 2, py: 1, boxShadow: 2, borderRadius: 5 }} onClick={() => fileRef.current.click()}>
          <AddAPhotoIcon />
          <Typography sx={{ ml: 1 }}>
            photo
          </Typography>
          <input type="file" accept="image/*" ref={fileRef} onChange={(e) => { addImageToPost(e); }} hidden />
        </Box>
        <Box sx={{ display: 'flex', px: 2, py: 1, boxShadow: 2, borderRadius: 5 }} onClick={(e) => { sendPost(e); }}>
          <SendIcon />
          <Typography sx={{ ml: 1 }}>
            post
          </Typography>
        </Box>
      </Grid>
    </div>
  );
}
