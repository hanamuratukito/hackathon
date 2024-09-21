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
  date.setDate(date.getDate() + diff);

  return date;
};

let me: State | null = JSON.parse(localStorage.getItem(MY_KEY) ?? "null");
const states: State[] = [
  {
    username: "たなか たろう",
    avatarType: 1,
    goal: "運動を1分する",
    count: 12,
    lastUpdated: getDiffDate(0),
  },
  {
    username: "さとう はな",
    avatarType: 2,
    goal: "資格の勉強を1分する",
    count: 12,
    lastUpdated: getDiffDate(-1),
  },
  {
    username: "すずき じろう",
    avatarType: 4,
    goal: "腹筋を1回する",
    count: 10,
    lastUpdated: getDiffDate(-3),
  },
  {
    username: "えんどう さくら",
    avatarType: 3,
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
