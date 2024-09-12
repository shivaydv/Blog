import DashboardTabs from "@/components/DashboardTabs";
import Settings from "@/components/Settings";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const page = () => {
  return (
    <Tabs defaultValue="Settings" className="h-full w-full max-w-6xl gap-2">
      <DashboardTabs menuitems={["Settings", "Bookmarks"]} heading="Profile" />
      <TabsContent value="Settings">
        <Settings />
      </TabsContent>
      <TabsContent value="Bookmarks">
        <div className="flex justify-center py-20">Comming Soon</div>
      </TabsContent>
    </Tabs>
  );
};

export default page;
