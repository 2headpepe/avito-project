import imagesSlice from "./imagesSlice";

export const { setImagesPage } = imagesSlice.actions;
export { fetchImagesPage } from "./imagesActions";
export default imagesSlice.reducer;
