import { useLocation } from "@tanstack/react-router";
import { useMemo } from "react";
import type { BreadcrumbItem } from "@/components/layout/data/types";

export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation();
  
  return useMemo(() => {
    const pathname = location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    
    if (segments.length === 0) {
      return [
        {
          title: "Dashboard",
          href: "/",
          isCurrentPage: true,
        },
      ];
    }
    
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = "";
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to title (capitalize and replace dashes/underscores with spaces)
      const title = segment
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      breadcrumbs.push({
        title,
        href: index === segments.length - 1 ? undefined : currentPath,
        isCurrentPage: index === segments.length - 1,
      });
    });
    
    return breadcrumbs;
  }, [location.pathname]);
} 