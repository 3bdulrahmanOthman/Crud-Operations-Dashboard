import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoardIcon,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  LayoutDashboardIcon,
  Loader2,
  LogIn,
  LucideIcon,
  LucideProps,
  LucideShoppingBag,
  Moon,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  UserCircle2Icon,
  UserPen,
  UserX2Icon,
  X,
  Boxes,
  Shapes,
  House,
  BadgeCheck,
  LogOut,
  ChevronsUpDown,
  Search,
  Bell,
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  CirclePlus,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Ellipsis,
  TriangleAlert,
  LoaderCircle,
  MailPlus,
  Send,
  UserPlus,
  Shield,
  UsersRound,
  Banknote,
  UserRound,
  Upload,
  Settings2,
  Download,
  ListOrdered,
  Tag,
  Save,
  TrendingUp,
  TrendingDown,
  Truck,
  Menu,
  ChevronDown,
  CornerDownRight,
  LaptopMinimal,
  Link,
  SortAsc,
  SortDesc,
  Clipboard,
  Lock,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  search: Search,
  dashboard: LayoutDashboardIcon,
  badge: BadgeCheck,
  boxes: Boxes,
  shapes: Shapes,
  sortAsc: SortAsc,
  sortDesc: SortDesc,
  shield: Shield,   
  tag: Tag,
  command: Command,
  login: LogIn,
  save: Save,
  logout: LogOut,
  close: X,
  link: Link,
  cornerDownRight: CornerDownRight,
  mailPlus: MailPlus,
  send: Send,
  system: LaptopMinimal, 
  product: LucideShoppingBag,
  spinner: Loader2,
  download: Download,
  kanban: CircuitBoardIcon,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chevronDown: ChevronDown,
  chevronsUpDown: ChevronsUpDown,
  trendingDown: TrendingDown,
  trendingUp: TrendingUp,
  trash: Trash,
  edit: Edit,
  ellipsis: Ellipsis,
  employee: UserX2Icon,
  post: FileText,
  page: File,
  user: UserRound,
  userPen: UserPen,
  user2: UserCircle2Icon,
  userPlus: UserPlus,
  userGroup: UsersRound,
  cash: Banknote,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  clipboard: Clipboard,
  bell: Bell,
  add: Plus,
  lock: Lock,
  warning: AlertTriangle,
  arrowRight: ArrowRight,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  eye: Eye,
  eyeOff: EyeOff,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  home: House,
  circlePlus: CirclePlus,
  triangleAlert: TriangleAlert,
  loader: LoaderCircle,
  upload: Upload,
  fileText: FileText,
  settings2: Settings2,
  order: ListOrdered,
  truck: Truck,
  menu: Menu,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
  logo: ({ ...props }: LucideProps) => (
    <svg
      width="16"
      height="26"
      viewBox="0 0 16 26"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.4768 4.34854L6.2039 0.555089C5.61183 0.192919 4.93872 0.00149857 4.25307 0.000305176C2.20933 0.000305176 0.33463 1.71225 0.33463 4.10502V18.3073L12.4768 10.9669C14.9081 9.49466 14.9081 5.81996 12.4768 4.34854ZM3.84825 11.448V3.86793L10.1162 7.65667L3.84825 11.448Z"
        fill="currentColor"
      />
      <path
        d="M15.8488 25.9844C15.8488 26.0273 3.99069 25.966 3.99069 25.966L2.94324 25.8425C1.2466 25.644 -0.0558684 24.1233 0.00184602 22.3346C0.00184602 22.2917 0.00552992 22.2519 0.00798585 22.2103C0.0545855 21.4365 0.325954 20.6961 0.785698 20.0885C0.972404 19.8461 1.20079 19.6425 1.45903 19.4882L10.478 14.0725C12.3413 12.9535 13.893 12.562 14.6998 10.5341C14.9973 9.77568 15.1258 8.95617 15.0756 8.1379L15.0444 7.58655L15.965 12.9204C16.0829 13.8264 15.9012 14.7537 15.421 15.5169C15.1325 15.9785 14.7474 16.3653 14.295 16.6479L3.82942 21.8943C3.81896 21.9006 3.80885 21.9074 3.79913 21.9149C3.5126 22.1293 3.68943 22.6069 4.04022 22.5867L12.7514 22.6403C14.4431 22.5417 15.8524 24.2112 15.8488 25.9844Z"
        fill="currentColor"
      />
    </svg>
  ),
  twitter: Twitter,
  check: Check,
};
