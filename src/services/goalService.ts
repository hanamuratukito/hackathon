const MY_KEY = "my_key";

export type State = {
  username: string;
  avatarType: number;
  goal: string;
  count: number;
  lastUpdated: Date;
};

const getDiffDate = (diff: number) => {
  const date = new Date();
  date.setDate(diff);

  return date;
};

let me: State | null = JSON.parse(localStorage.getItem(MY_KEY) ?? "null");
const states: State[] = [
  {
    username: "花芽 すみれ",
    avatarType: 1,
    goal: "爽快感抜群のプレーを見せる",
    count: 12,
    lastUpdated: getDiffDate(0),
  },
  {
    username: "花芽 なずな",
    avatarType: 2,
    goal: "自称「ぶいすぽっ！」の姫。",
    count: 12,
    lastUpdated: getDiffDate(0),
  },
  {
    username: "小雀 とと",
    avatarType: 3,
    goal: "いつもまったりとした雰囲気に包まれている。",
    count: 10,
    lastUpdated: getDiffDate(-3),
  },
  {
    username: "胡桃 のあ",
    avatarType: 4,
    goal: "常に上達を目指し取り組んでいる。",
    count: 3,
    lastUpdated: getDiffDate(-6),
  },
];

export const register = async (state: State) => {
  localStorage.setItem(MY_KEY, JSON.stringify(state));
  me = state;
};

export const findMe = async () => {
  return me;
};

export const getState = async () => {
  return states;
};
