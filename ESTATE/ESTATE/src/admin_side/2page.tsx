import React, { useState } from "react";
import {
    Home,
    LayoutDashboard,
    Search,
    User,
} from "lucide-react";
import Secondpage from "./1page";

// Sidebar Component
type SidebarProps = {
    activePage: string;
    setActivePage: React.Dispatch<React.SetStateAction<string>>;
    onNavigateBack?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onNavigateBack }: SidebarProps) => {

    const [showKogin, setShowKogin] = useState(false);
    const [showSecondPage, setShowSecondPage] = useState(false);
    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col items-center py-6">
            {/* Logo */}
            <div className="mb-10 flex items-center flex-col">
                <div className="text-green-400 text-3xl font-bold">△</div>
                <p className="text-xs text-gray-300">Logo</p>
            </div>

            {/* Profile */}
            <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center text-white text-2xl mb-3">
                👤
            </div>
            <p className="mb-8">管理者さん</p>

            {/* Menu */}
             <nav className="space-y-3 w-full px-4 text-left">
                                <button onClick={() => {
                                    setShowSecondPage(false);
                                    setShowKogin(false);
                                }} className="flex items-center space-x-2 bg-gray-800 w-full py-2 px-3 rounded">
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span>Dashboard</span>
                                </button>

                {/* HOME */}
                <button
                    className={`flex items-center space-x-2 w-full py-2 px-3 rounded transition ${activePage === "home" ? "bg-pink-600" : "bg-gray-800"
                        }`}
                    onClick={() => setActivePage("home")}
                >
                    <Home className="w-5 h-5" />
                    <span>HOME</span>
                </button>

                {/* USER LIST */}
                <button
                    className={`flex items-center space-x-2 w-full py-2 px-3 rounded transition ${activePage === "userlist" ? "bg-pink-600" : "bg-gray-800"
                        }`}
                    onClick={() => setActivePage("userlist")}
                >
                    <User className="w-5 h-5" />
                    <span>User List</span>
                </button>
            </nav>
        </div>
    );
};

// Header Component
const Header = ({ title }: { title: string }) => (
    <header className="flex justify-between items-center bg-[#D9E5E5] px-6 py-3 rounded-t-md mb-4">
        <h1 className="text-black font-normal text-xl font-sans">{title}</h1>
        <div className="relative">
            <input
                type="text"
                placeholder="SEARCH"
                className="rounded-full bg-white placeholder-pink-300 placeholder-opacity-40 px-10 py-2 text-xs focus:outline-none"
            />
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300 opacity-40"
            />
        </div>
    </header>
);

// Dashboard title
const DashboardTitle = () => (
    <div className="bg-[#1F2E3A] rounded-t-md px-4 py-1 text-pink-300 font-semibold text-xs mb-2">
        ダッシュボード
    </div>
);

// Stat Card
type StatCardProps = {
    title: string;
    count: string | number;
    suffix: string;
    buttonText: string;
};

const StatCard: React.FC<StatCardProps> = ({
    title,
    count,
    suffix,
    buttonText,
}) => (
    <div className="bg-white rounded-lg shadow p-4 w-60 flex flex-col items-center">
        <p className="text-xs font-semibold mb-1">{title}</p>
        <div className="text-4xl font-semibold mb-1 flex items-baseline">
            <span>{count}</span>
            <span className="text-xl ml-1">{suffix}</span>
        </div>
        <button className="bg-gray-300 text-xs rounded px-3 py-1">
            {buttonText}
        </button>
    </div>
);

// Search Section
const SearchSectionTitle = () => (
    <div className="bg-[#1F2E3A] rounded-t-md px-4 py-1 text-pink-300 font-semibold text-xs mb-4">
        顧客検索
    </div>
);

const SearchForm = () => {
    const [status, setStatus] = useState("完了");

    return (
        <form className="bg-white rounded-lg shadow px-6 py-6 w-full">
            <div className="text-pink-300 text-[8px] mb-2">確認点チェック</div>
            <div className="grid grid-cols-[120px_1fr] gap-y-4 gap-x-6 items-center text-xs font-semibold">
                <label className="bg-gray-300 px-3 py-1">顧客名称</label>
                <input className="border border-gray-300 rounded px-3 py-1 text-xs" />

                <label className="bg-gray-300 px-3 py-1">顧客カナ</label>
                <input className="border border-gray-300 rounded px-3 py-1 text-xs" />

                <label className="bg-gray-300 px-3 py-1">顧客電話番号</label>
                <input className="border border-gray-300 rounded px-3 py-1 text-xs" />

                <label className="bg-gray-300 px-3 py-1">顧客メールアドレス</label>
                <input className="border border-gray-300 rounded px-3 py-1 text-xs" />

                <label className="bg-gray-300 px-3 py-1">ステータス</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-xs w-1/2"
                >
                    <option>完了</option>
                    <option>未完了</option>
                </select>
            </div>
            <div className="text-center mt-6">
                <button className="bg-[#1F2E3A] text-pink-300 text-xs rounded px-6 py-1 w-1/5">
                    検索
                </button>
            </div>
        </form>
    );
};

// User List Table Component
const UserListTable = () => (
    <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">ユーザー一覧</h2>
        <table className="w-full border-collapse border border-black text-sm">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border border-black px-2 py-1">No</th>
                    <th className="border border-black px-2 py-1">顧客名称</th>
                    <th className="border border-black px-2 py-1">顧客カナ</th>
                    <th className="border border-black px-2 py-1">顧客電話番号</th>
                    <th className="border border-black px-2 py-1">顧客メールアドレス</th>
                    <th className="border border-black px-2 py-1">ステータス</th>
                    <th className="border border-black px-2 py-1">アクション</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-black px-2 py-1">1</td>
                    <td className="border border-black px-2 py-1">敷波 翔</td>
                    <td className="border border-black px-2 py-1">しきなみ しょう</td>
                    <td className="border border-black px-2 py-1">0900000000</td>
                    <td className="border border-black px-2 py-1">user@gmail.com</td>
                    <td className="border border-black px-2 py-1">完了</td>
                    <td className="border border-black px-2 py-1 space-x-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded">
                            編集
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded">
                            削除
                        </button>
                    </td>
                </tr>
                {/* empty rows */}
                {Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                        <td className="border border-black px-2 py-6">{i + 2}</td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                        <td className="border border-black"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Main App
export default function Thired({ onNavigateBack }: { onNavigateBack?: () => void }) {
    const [activePage, setActivePage] = useState("home");

    return (
        <div className="flex min-h-screen bg-[#D9E5E5] text-black font-sans">
            <Sidebar activePage={activePage} setActivePage={setActivePage} onNavigateBack={onNavigateBack} />
            <div className="flex-1 p-8">
                {activePage === "home" && (
                    <>
                        <Header title="HOME" />
                        <DashboardTitle />
                        <div className="flex gap-6 mb-8">
                            <StatCard
                                title="顧客数"
                                count="120"
                                suffix="人"
                                buttonText="顧客検索"
                            />
                            <StatCard
                                title="契約完了"
                                count="20"
                                suffix="人"
                                buttonText="契約済ユーザを確認"
                            />
                            <StatCard
                                title="要対応"
                                count="11"
                                suffix="人"
                                buttonText="契約済ユーザを確認"
                            />
                        </div>
                        <SearchSectionTitle />
                        <SearchForm />
                    </>
                )}

                {activePage === "userlist" && (
                    <>
                        <Header title="User List" />
                        <UserListTable />
                    </>
                )}

                {activePage === "dashboard" && (
                    <>
                        <Header title="Dashboard" />
                        <p className="text-gray-700">Dashboard content goes here...</p>
                    </>
                )}
            </div>
        </div>
    );
}
