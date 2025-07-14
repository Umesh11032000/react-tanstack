import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet } from "@tanstack/react-router";
import { ModeToggle } from "../mode-toggle";
import type { BreadcrumbItem as BreadcrumbItemType } from "./data/types";
import React from "react";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

interface Props {
  children?: React.ReactNode;
  breadcrumbs?: BreadcrumbItemType[];
}

export default function AuthenticatedLayout({ children, breadcrumbs }: Props) {
  const defaultBreadcrumbs = useBreadcrumbs();
  const finalBreadcrumbs = breadcrumbs || defaultBreadcrumbs;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {finalBreadcrumbs.length > 0 &&
                  finalBreadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem className="hidden md:block">
                        {item.isCurrentPage ? (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href || "#"}>
                            {item.title}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < finalBreadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </React.Fragment>
                  ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center px-4">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children ? children : <Outlet />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
