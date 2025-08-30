import React, { useState } from "react";
import Kogin from '../../kogin';
import {
    LayoutDashboard,
    Home,
    User,
    BarChart,
    Image as ImageIcon,
    Settings,
    Search,
} from "lucide-react";
import SecondPage from './2page';

import CommandSidebar from "./CommandSidebar";

const Secondpage = ({ onNavigateBack, onLogout }: { onNavigateBack?: () => void, onLogout?: () => void }) => {
    const [user, setUser] = useState({
        name: "Name",
        points: 128,
        product: "text",
        profileImage: "", // Empty image → will show gray placeholder
    });

    const [status, setStatus] = useState(75);
    const [formStatus, setFormStatus] = useState(65);

    const [property, setProperty] = useState({
        title: "Title",
        address: "address",
        image: "", // Empty → will use placeholder
    });

    const [financial, setFinancial] = useState({
        annualIncome: "550万円",
        savings: "100万円",
        monthlyRepayment: "5万円",
    });

    const [showSecondPage, setShowSecondPage] = useState(false);
    const [showKogin, setShowKogin] = useState(false);


    if (showKogin) {
        return <Kogin />;
    }
    if (showSecondPage) {
        return <SecondPage onNavigateBack={onNavigateBack} />;
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar replaced with CommandSidebar */}
            <CommandSidebar
                onDashboard={() => {
                    setShowSecondPage(false);
                    setShowKogin(false);
                }}
                onHome={() => setShowSecondPage(true)}
                onUserList={() => {}}
                onLogout={() => {
                    if (onLogout) {
                        onLogout();
                    } else {
                        setShowKogin(true);
                    }
                }}
            />

            {/* Main Content */}
            <div className="flex-1 bg-blue-50 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-red-500">Main Heading</h1>
                    <div className="flex items-center border px-3 py-1 rounded-lg">
                        <Search className="w-4 h-4 text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="search"
                            className="outline-none w-full text-sm"
                        />
                    </div>
                </div>

                {/* Top 4 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {/* User Card */}
                    <div className="bg-white rounded-lg shadow border border-blue-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1 text-sm font-semibold">
                            <span>Heading</span>
                            <span className="text-xl">⋮</span> {/* Three-dot menu icon */}
                        </div>

                        {/* Content */}
                        <div className="p-4 text-center">
                            {/* Avatar */}
                            <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gray-300 overflow-hidden">
                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>

                            {/* Name & Points */}
                            <h2 className="font-bold text-gray-800">{user.name}</h2>
                            <div className="flex items-end justify-center mt-1 mb-1">
                                <p className="text-4xl text-pink-600 font-bold">{user.points}</p>
                                <span className="text-sm text-gray-600 ml-1">pt</span>
                            </div>
                            <p className="text-xs text-gray-400">2025/8/24</p>

                            {/* Product Info */}
                            <div className="mt-2 text-sm">
                                <p className="text-gray-600 font-semibold">
                                    random text：
                                    <span className="text-pink-700 ml-1">{user.product}</span>
                                </p>
                                <button className="mt-2 w-full px-4 py-1 bg-gray-300 rounded text-xs font-semibold text-gray-700">
                                    random
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Status Card */}
                    <div className="bg-white rounded-lg shadow border border-blue-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1 text-sm font-semibold">
                            <span>Heading</span>
                            <span className="text-xl">⋮</span> {/* Three-dot menu icon */}
                        </div>

                        {/* Card Content */}
                        <div className="p-4 text-center">
                            {/* Gradient Circular Progress */}
                            <div className="relative w-32 h-32 mx-auto">
                                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                    {/* Gray background circle */}
                                    <path
                                        className="text-gray-300"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                        d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />

                                    {/* Gradient foreground circle (progress fill) */}
                                    <path
                                        stroke="url(#grad1)"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={`${status}, 100`}
                                        d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />

                                    {/* Define gradient colors */}
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f472b6" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Centered percentage text */}
                                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-pink-500">
                                    {status}%
                                </div>
                            </div>

                            {/* Label Below */}
                            <div className="flex  items-center justify-between w-3/4 mx-auto mt-4">
                                <span className="text-xs text-orange-600">Small text</span><p className="text-sm font-semibold text-gray-700">内覧待ち</p>

                            </div>
                            <p className="text-xs text-gray-500 mt-1">Text-1</p>
                            <p className="text-xs text-gray-500 mt-1">Text-2</p>
                        </div>
                    </div>


                    {/* Property Card */}
                    <div className="bg-white rounded-lg shadow border border-blue-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1 text-sm font-semibold">
                            <span>Heading</span>
                            <span className="text-xl">⋮</span> {/* 3-dot menu */}
                        </div>

                        {/* Card Content */}
                        <div className="p-4 text-center  ">
                            {/* Title */}
                            <h3 className="text-sm font-bold text-red-900 mb-2">{property.title}</h3>

                            {/* Image Placeholder */}
                            <div className="w-full h-24 bg-gray-300 rounded mb-2 overflow-hidden">
                                {/* Use property.image if available */}
                                {property.image && (
                                    <img
                                        src={property.image}
                                        alt="property"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Address */}
                            <p className="text-xs text-gray-700 mb-2">{property.address}</p>

                            {/* Button */}
                            <button className="bg-gray-200 text-xs px-3 py-1 w-full rounded text-gray-800 font-medium">
                                Button
                            </button>
                        </div>
                    </div>


                    {/* Form Progress */}
                    <div className="bg-white rounded-lg shadow border border-blue-200 overflow-hidden">
                        {/* Card Header */}
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1 text-sm font-semibold">
                            <span>Heading</span>
                            <span className="text-xl">⋮</span>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 text-center">
                            {/* Circular Progress */}
                            <div className="relative w-32 h-32 mx-auto">
                                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                    {/* Gray background circle */}
                                    <path
                                        className="text-gray-300"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                        d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />

                                    {/* Gradient foreground circle (progress fill) */}
                                    <path
                                        stroke="url(#grad1)"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={`${status}, 100`}
                                        d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />

                                    {/* Define gradient colors */}
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f472b6" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Centered percentage text */}
                                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-pink-500">
                                    {formStatus}%
                                </div>
                            </div>

                            {/* Status Description */}
                            <p className="text-xs text-center mt-2 text-gray-700">
                                <span className="text-xs text-orange-600 mr-6">text</span>  Text-2
                            </p>
                            <p className="text-xs text-center mt-2  text-gray-700">
                                Text-2
                            </p>
                        </div>
                    </div>

                </div>

                {/* Lower Grid Sections */}
                {/* Grid Container */}
                <div className="grid grid-cols-5 gap-6 mt-6">
                    {/* Box 1: Progress Check */}
                    <div className="bg-white rounded-lg shadow border  col-span-2 border-blue-200 overflow-hidden ">
                        {/* Header */}
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1">
                            <span className="text-xs bg-pink-200 text-pink-600 px-2 py-0.5 rounded font-semibold">
                                確認チェック
                            </span>
                            <span className="text-xl">⋮</span>
                        </div>

                        {/* Content */}
                        <div className="p-4 text-sm">
                            <div className="mb-4">
                                <p className="font-semibold text-gray-600">連携率</p>
                                <div className="bg-gray-100 p-2 rounded mt-1">
                                    <p className="text-xs text-red-800">未処理</p>
                                    <p className="text-xs">物件情報未入力</p>
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">フォーム入力状況</p>
                                <div className="bg-gray-100 p-2 rounded mt-1">
                                    <p className="text-xs text-red-800">未処理</p>
                                    <p className="text-xs">物件情報未入力</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Box 2: 資金計画 (Financial Plan) */}
                    <div className="bg-white rounded-lg shadow border col-span-3 border-blue-200 overflow-hidden">
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1">
                            <span className="text-xs bg-pink-200 text-pink-600 px-2 py-0.5 rounded font-semibold">
                                資金計画
                            </span>
                            <span className="text-xl">⋮</span>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                            {[...Array(2)].map((_, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between border-b border-pink-200 py-1">
                                        <span>年収</span>
                                        <span>550万円</span>
                                    </div>
                                    <div className="flex justify-between border-b border-pink-200 py-1">
                                        <span>自己資金</span>
                                        <span>100万円</span>
                                    </div>
                                    <div className="flex justify-between border-b border-pink-200 py-1">
                                        <span>月々の希望返済額</span>
                                        <span>5万円</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Box 3: 返済計画 (Empty Placeholder) */}
                    <div className="bg-white rounded-lg shadow border col-span-2 border-blue-200 overflow-hidden">
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1">
                            <span className="text-xs bg-pink-200 text-pink-600 px-2 py-0.5 rounded font-semibold">
                                返済計画
                            </span>
                            <span className="text-xl">⋮</span>
                        </div>
                        <div className="p-4 h-40 flex items-center justify-center text-gray-400 text-sm">
                            コンテンツ未入力
                        </div>
                    </div>

                    {/* Box 4: 支払チェック (Empty Placeholder) */}
                    <div className="bg-white rounded-lg shadow border col-span-3 border-blue-200 overflow-hidden">
                        <div className="bg-gray-900 text-white flex justify-between items-center px-3 py-1">
                            <span className="text-xs bg-pink-200 text-pink-600 px-2 py-0.5 rounded font-semibold">
                                支払チェック
                            </span>
                            <span className="text-xl">⋮</span>
                        </div>
                        <div className="p-4 h-40 flex items-center justify-center text-gray-400 text-sm">
                            コンテンツ未入力
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Secondpage;