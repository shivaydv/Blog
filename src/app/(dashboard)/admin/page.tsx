import DashboardTabs from "@/components/DashboardTabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const page = () => {
  return (
    <Tabs
      defaultValue="Blogs"
      className="relative mx-auto grid h-full w-full max-w-6xl grid-cols-8 items-start gap-2"
    >
      <DashboardTabs menuitems={[ "Blogs","Users", "Anayltics",]} />

      <TabsContent value="Users" className="col-span-8 md:col-span-6">
        <div className=" ">Users</div>
      </TabsContent>
      <TabsContent value="Blogs" className="col-span-8 md:col-span-6">
        <div className=" ">Blogs</div>
      </TabsContent>
      <TabsContent value="Anayltics" className="col-span-8 md:col-span-6">
        <div className=" ">Anayltics</div>
      </TabsContent>
    </Tabs>
  );
};



export default page;
