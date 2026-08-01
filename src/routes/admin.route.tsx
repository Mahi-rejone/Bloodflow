import {LayoutDashboard, UserIcon} from "lucide-react";
const adminRoute = [
    {
        name: 'Profile',
        path: '/profile',
        icon: <UserIcon size={16} />
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard size={16} />
    }
]

export default adminRoute