export type State = {
  username: string;
  avatarType: number;
  goal: string;
  count: number;
  lastUpdated: Date;
};

const data: State[] = [];

export const storeState = async (state: State) => {
  data.push(state);
};

export const findMe = async () => {
  return data[0];
};

export const getState = async () => {
  return data.slice(1);
};
