export const baseUrl=import.meta.env.VITE_HOST_API;

// authentication routes:
export const signupRoute=`${baseUrl}/api/auth/signup`;
export const loginRoute=`${baseUrl}/api/auth/login`;

export const logoutRoute=`${baseUrl}/api/auth/logout`;
export const verifyRoute=`${baseUrl}/api/auth/verify`;

export const forgotPasswordRoute=`${baseUrl}/api/auth/reqForgotPassword`
export const resetPasswordRoute=`${baseUrl}/api/auth/resetPassword`

// set avatar routes:
export const setAvatar=`${baseUrl}/api/chatApp/setAvatar`;


// generate image using dalle route:
export const dalleRoute=`${baseUrl}/api/artGenerator/dalle`
export const replicateRoute=`${baseUrl}/api/artGenerator/scribble`

// imageUploadRoute:
export const imageUpload=`${baseUrl}/api/artGenerator/uploadImageToCloudinary`;


// save image to db:
export const storeImage=`${baseUrl}/api/artGenerator/saveImage`;
// get images from db:
export const getImages=`${baseUrl}/api/artGenerator/getImages`;
