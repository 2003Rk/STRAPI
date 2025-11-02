import React from "react";
import {
    LayoutDashboard,
    Home,
    Image as ImageIcon,
    Settings,
} from "lucide-react";

interface CommandSidebarProps {
    onDashboard?: () => void;
    onHome?: () => void;
    onUserList?: () => void;
    onLogout?: () => void;
}

const CommandSidebar: React.FC<CommandSidebarProps> = ({
    onDashboard,
    onHome,
    onUserList,
    onLogout,
}) => (
    <div className="w-64 bg-gray-900 text-white flex flex-col items-center py-6">
       

        {/* Profile */}
        <div className="w-22 h-24 bg-white rounded-full flex items-center justify-center mb-3 overflow-hidden">
            <img 
                src="/terasuE1.png" 
                alt="Profile" 
                className="w-full h-full object-contain"
            />
        </div>
        <p className="mb-8"></p>

        {/* Menu */}
        <nav className="space-y-3 w-full px-4 text-left">
            <button
                className="flex items-center space-x-2 bg-gray-800 w-full py-2 px-3 rounded"
                onClick={onDashboard}
            >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
            </button>
            <button
                className="flex items-center space-x-2 bg-gray-800 w-full py-2 px-3 rounded"
                onClick={onHome}
            >
                <Home className="w-5 h-5" />
                <span>HOME</span>
            </button>
            <button
                className="flex items-center space-x-2 bg-gray-800 w-full py-2 px-3 rounded"
                onClick={onUserList}
            >
                <ImageIcon className="w-5 h-5" />
                <span>User List</span>
            </button>
            <button
                className="flex items-center space-x-2 bg-gray-800 w-full py-2 px-3 rounded"
                onClick={onLogout}
            >
                <Settings className="w-5 h-5" />
                <span>Log out</span>
            </button>
        </nav>
    </div>
);

export default CommandSidebar;
