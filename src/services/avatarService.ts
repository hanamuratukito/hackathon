import boy from "@/assets/boy.jpg";
import girl from "@/assets/girl.jpg";
import cat from "@/assets/cat.jpg";
import dog from "@/assets/dog.jpg";

const avatarTypes = [
  {
    id: 1,
    src: boy,
  },
  {
    id: 2,
    src: girl,
  },
  {
    id: 3,
    src: cat,
  },
  {
    id: 4,
    src: dog,
  },
];

export const getAvatarById = (id: number) =>
  avatarTypes.find((it) => it.id === id);
