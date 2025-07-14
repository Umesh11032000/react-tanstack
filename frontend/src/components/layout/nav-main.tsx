"use client"

import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "@tanstack/react-router"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import type { NavMainItem } from "./data/types"

export function NavMain({
  items,
}: {
  items: NavMainItem[]
}) {
  const location = useLocation()
  const currentPath = location.pathname
  
  // Debug logging
  if (import.meta.env.DEV) {
    console.log('Current path:', currentPath)
  }

  const isActive = (url: string) => {
    if (url === '/') {
      return currentPath === '/'
    }
    return currentPath === url
  }

  const isParentActive = (url: string) => {
    if (url === '/') {
      return currentPath === '/'
    }
    // Check if current path starts with the URL (for parent routes)
    return currentPath.startsWith(url)
  }

  const hasActiveChild = (item: NavMainItem) => {
    return item.items?.some(subItem => isActive(subItem.url)) || false
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0
          const itemIsActive = hasChildren ? isParentActive(item.url) : isActive(item.url)
          const itemHasActiveChild = hasActiveChild(item)
          
          // Debug logging
          if (import.meta.env.DEV) {
            console.log(`Item "${item.title}":`, {
              url: item.url,
              isActive: itemIsActive,
              hasActiveChild: itemHasActiveChild,
              currentPath
            })
          }
          
          if (!hasChildren) {
            // Render as a simple link without collapsible
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  data-active={itemIsActive}
                >
                  <Link to={item.url} activeProps={{ className: "active" }}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }
          
          // Render as collapsible with children
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={itemIsActive || itemHasActiveChild}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    data-active={itemIsActive}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const subItemIsActive = isActive(subItem.url)
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild
                            data-active={subItemIsActive}
                          >
                            <Link to={subItem.url} activeProps={{ className: "active" }}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
