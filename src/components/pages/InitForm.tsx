import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Layout from "@/components/Layout";

function InitForm() {
  return (
    <Layout>
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
          <Link to="/">
            <Button>目標開始</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default InitForm;
