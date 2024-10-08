import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function App() {
  return (
    <div className="container mx-auto p-4 max-w-[640px]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Input placeholder="ユーザー名" />
        </div>
        <div>
          <h2 className="text-xl font-bold">目標を入力しよう</h2>
          <Input placeholder="目標" />
        </div>
        <div>
          <Button>目標開始</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
