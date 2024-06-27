import DashboardTabs from "@/components/DashboardTabs";
import Settings from "@/components/Settings";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const page = () => {
  return (
    <Tabs
      defaultValue="Settings"
      className="relative mx-auto grid h-full w-full max-w-6xl grid-cols-8 items-start gap-2"
    >
      <DashboardTabs menuitems={["Settings", "Bookmarks"]} heading="Profile" />

      <TabsContent value="Settings" className="col-span-8 md:col-span-6">
        <Settings />
      </TabsContent>
      <TabsContent value="Bookmarks" className="col-span-8 md:col-span-6">
        <div className=" ">Bookmarks</div>
      </TabsContent>
    </Tabs>
  );
};

export default page;
