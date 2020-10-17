import Images from "../models/Images";

export default {
  render(image: Images) {
    return {
      id: image.id,
      path: `${process.env.SERVER_URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Images[]) {
    return images.map((image) => this.render(image));
  },
};
