import { v2 as cloudinary } from 'cloudinary';

// Hardcode them just for this test to be 100% sure
cloudinary.config({
  cloud_name: 'e_doctor_dashboard',
  api_key: 'asdfghjkl',
  api_secret: 'asdfghjkl12345'
});

cloudinary.api.ping()
  .then(res => console.log("Success! Cloudinary is connected:", res))
  .catch(err => console.error("Still getting 403? Check these keys:", err));