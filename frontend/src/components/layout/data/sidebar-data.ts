import {
  LayoutDashboard,
  Users,
  Shield
} from "lucide-react"
import type { SidebarData } from "./types"

// This is sample data.
export const sidebarData: SidebarData = {
  user: {
    name: "Admin OK",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/users",
        },
        {
          title: "Create User",
          url: "/users/create",
        },
      ],
    },
    {
      title: "Roles and Permissions",
      url: "/roles",
      icon: Shield,
      items: [],
    },
  ]
}
