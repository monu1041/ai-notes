import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { getLocalNotes, type LocalNote } from "@/lib/local-notes";
import SidebarGroupContent from "./SidebarGroupContent";

async function AppSidebar() {
  const notes: LocalNote[] = getLocalNotes();

  return (
    <Sidebar>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 mt-2 text-lg">
            Your Notes
          </SidebarGroupLabel>
          <SidebarGroupContent notes={notes} />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;