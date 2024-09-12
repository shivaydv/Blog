import Blogs from "@/components/Blogs";
import DashboardTabs from "@/components/DashboardTabs";
import Users from "@/components/Users";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const page = () => {
  return (
    <Tabs defaultValue="Blogs" className="h-full w-full max-w-6xl gap-2">
      <DashboardTabs
        menuitems={["Blogs", "Users", "Anayltics"]}
        heading="Admin Panel"
      />
      <TabsContent value="Users">
        <Users />
      </TabsContent>
      <TabsContent value="Blogs">
        <Blogs />
      </TabsContent>
      <TabsContent value="Anayltics">
        <div className="flex justify-center py-20">Comming Soon</div>
      </TabsContent>
    </Tabs>
  );
};

export default page;
