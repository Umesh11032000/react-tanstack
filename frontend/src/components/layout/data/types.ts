import { type LucideIcon } from "lucide-react"

export interface User {
  name: string
  email: string
  avatar: string
}

export interface Team {
  name: string
  logo: LucideIcon
  plan: string
}

export interface NavItem {
  title: string
  url: string
}

export interface NavMainItem {
  title: string
  url: string
  icon?: LucideIcon
  items: NavItem[]
}

export interface Project {
  name: string
  url: string
  icon: LucideIcon
}

export interface BreadcrumbItem {
  title: string
  href?: string
  isCurrentPage?: boolean
}

export interface SidebarData {
  user: User
  navMain: NavMainItem[]
} 