"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Cog, BarChart3, TrendingUp, Calendar, Link as LinkIcon, Truck } from "lucide-react"
import Image from 'next/image'
import { FaWarehouse } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { FaTools } from "react-icons/fa";


// Sidebar user and nav data
const data = {
  user: {
    name: "Himani",
    email: "hbhat@greywiz.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    // { title: "Tracker", url: "/tracker", icon: Car, colour: "#00a9ff" },
    { title: "Tracker2", url: "/tracker2", icon: Car, colour: "#00a9ff" },
    // { title: "Tracker3", url: "/tracker3", icon: Car, colour: "#00a9ff" },
    // { title: "Analytics", url: "/predict", icon: Cog, colour: "#00a9ff", },
    { title: "Vehicle 360", url: "/vehicle360", icon: FaTools, colour: "#A259FF", },
    { title: "Dealer Service Advisor", url: "/dealer-service-advisor", icon: Cog, colour: "#06D6A0", },
  ],
}

const analyticsTabs = [
  { title: "Vehicle Registration", path: "/configure/vehicle-registration" },
  { title: "Vehicle Update", path: "#" },
  { title: "Predict Results", path: "/predict" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const { setOpen } = useSidebar()

  React.useEffect(() => {
    const match = data.navMain.find((item) => pathname?.startsWith(item.url))
    if (match) setActiveItem(match)
  }, [pathname])

  return (
    <Sidebar collapsible="icon" className="overflow-hidden *:data-[sidebar=sidebar]:flex-row" {...props}>
      <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className=" text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-lg">
                    {/* <Command className="size-4" /> */}
                    <Image src="/tata-logo.png" alt="Tata Icon" width={30} height={20} />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Driver Analytics</span>
                    <span className="truncate text-xs">Greywiz</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/" className="w-full">
                    <SidebarMenuButton
                      tooltip={{ children: "Warehouses", hidden: false }}
                      isActive={pathname === "/"}
                      onClick={() => setActiveItem("/")}
                      className="flex items-center gap-2 px-2.5 md:px-2 w-full rounded-md"
                    >
                      <FaWarehouse color="#ff9900" size={20} strokeWidth={1.5} />
                      <span>Warehouses</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Link href="/dashboard" className="w-full">
                    <SidebarMenuButton
                      tooltip={{ children: "Dashboard", hidden: false }}
                      isActive={pathname === "/dashboard"}
                      onClick={() => setActiveItem("/dashboard")}
                      className="flex items-center gap-2 px-2.5 md:px-2 w-full rounded-md"
                    >
                      <BarChart3 color="#ff9900" size={20} strokeWidth={1.5} />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Link href="/forecast" className="w-full">
                    <SidebarMenuButton
                      tooltip={{ children: "Forecast", hidden: false }}
                      isActive={pathname === "/forecast"}
                      onClick={() => setActiveItem("forecast")}
                      className="flex items-center gap-2 px-2.5 md:px-2 w-full rounded-md"
                    >
                      <TrendingUp color="#ff9900" size={20} />
                      <span>Forecast</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Link href="/inventory" className="w-full">
                    <SidebarMenuButton
                      tooltip={{ children: "Inventory", hidden: false }}
                      isActive={pathname === "/inventory"}
                      onClick={() => setActiveItem("inventory")}
                      className="flex items-center gap-2 px-2.5 md:px-2 w-full rounded-md"
                    >
                      <LuPackage color="#ff9900" size={20} />
                      <span>Inventory</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <Link href="/planning" className="w-full">
                    <SidebarMenuButton
                      tooltip={{ children: "Planning", hidden: false }}
                      isActive={pathname === "/planning"}
                      onClick={() => setActiveItem("planning")}
                      className="flex items-center gap-2 px-2.5 md:px-2 w-full rounded-md"
                    >
                      <Calendar color="#ff9900" size={20} />
                      <span>Planning</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>


            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  )
}
