import Blogs from "@/components/Blogs";
import DashboardTabs from "@/components/DashboardTabs";
import Users from "@/components/Users";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const page = () => {
  return (
    <Tabs
      defaultValue="Blogs"
      className="relative mx-auto grid h-full w-full max-w-6xl grid-cols-10 items-start gap-2"
    >
      <DashboardTabs
        menuitems={["Blogs", "Users", "Anayltics"]}
        heading="Admin"
      />
      
      <TabsContent value="Users" className="col-span-10 md:col-span-8">
        <Users />
      </TabsContent>
      <TabsContent value="Blogs" className="col-span-10 md:col-span-8">
        <Blogs />
      </TabsContent>
      <TabsContent value="Anayltics" className="col-span-10 md:col-span-8">
        <div className=" ">Anayltics</div>
      </TabsContent>
    </Tabs>
  );
};

export default page;
