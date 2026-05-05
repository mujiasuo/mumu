// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  List, 
  BarChart3, 
  FileText, 
  Layers, 
  Home,
  Image as ImageIcon,
  ChevronDown,
  ArrowRight,
  X,
  QrCode
} from 'lucide-react';

// ==========================================
// 1. 数据配置层 (Site Data) - 内容与结构完全分离
// ==========================================
const siteData = {
  global: {
    logoImg: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", 
    logoText: "是有集团",
    qrCodeImg: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com", 
    qrCodeText: "手机扫码查看",
    tabs: [
      { id: 'home', label: '首页', iconName: 'Home' },
      { id: 'portfolio', label: '产出', iconName: 'Layers' },
      { id: 'data', label: '数据', iconName: 'BarChart3' },
      { id: 'analysis', label: '分析', iconName: 'FileText' },
      { id: 'assets', label: '沉淀', iconName: 'ImageIcon' },
    ]
  },
  home: {
    title: "2025年度复盘",
    avatar: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260505214454584.png",
    name: "木木",
    role: "平面设计 / Graphic Designer",
    stats: [
      { id: 1, label: '打样款数', value: '123+', colorClass: 'from-blue-500 to-cyan-400' },
      { id: 2, label: '下单款数', value: '78+', colorClass: 'from-indigo-500 to-purple-500' },
      { id: 3, label: '转化率', value: '63%', colorClass: 'from-emerald-400 to-cyan-500' }
    ]
  },
  portfolio: {
    categories: ['全部', '先锋', '上海', '苏博', '良渚', '三星堆', '浙博', '浙自然', '物料', '厦门', '洛阳', '福州', '井冈山', '奥体', '重庆', '桐庐'],
    emptyMessage: "没有找到该分类下的作品",
    detailBtnText: "查看详情 →",
    projects: [
      // ===== 先锋 (48个) =====
      { id: 1, name: '先锋项目1', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 2, name: '先锋项目2', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 3, name: '先锋项目3', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 4, name: '先锋项目4', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 5, name: '先锋项目5', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 6, name: '先锋项目6', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 7, name: '先锋项目7', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 8, name: '先锋项目8', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 9, name: '先锋项目9', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 10, name: '先锋项目10', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 11, name: '先锋项目11', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 12, name: '先锋项目12', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 13, name: '先锋项目13', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 14, name: '先锋项目14', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 15, name: '先锋项目15', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 16, name: '先锋项目16', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 17, name: '先锋项目17', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 18, name: '先锋项目18', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 19, name: '先锋项目19', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 20, name: '先锋项目20', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 21, name: '先锋项目21', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 22, name: '先锋项目22', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 23, name: '先锋项目23', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 24, name: '先锋项目24', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 25, name: '先锋项目25', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 26, name: '先锋项目26', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 27, name: '先锋项目27', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 28, name: '先锋项目28', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 29, name: '先锋项目29', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 30, name: '先锋项目30', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 31, name: '先锋项目31', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 32, name: '先锋项目32', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 33, name: '先锋项目33', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 34, name: '先锋项目34', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 35, name: '先锋项目35', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 36, name: '先锋项目36', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 37, name: '先锋项目37', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 38, name: '先锋项目38', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 39, name: '先锋项目39', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 40, name: '先锋项目40', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 41, name: '先锋项目41', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 42, name: '先锋项目42', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 43, name: '先锋项目43', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 44, name: '先锋项目44', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 45, name: '先锋项目45', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 46, name: '先锋项目46', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 47, name: '先锋项目47', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 48, name: '先锋项目48', group: '先锋', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 良渚 (8个) =====
      { id: 49, name: '良渚项目1', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 50, name: '良渚项目2', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 51, name: '良渚项目3', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 52, name: '良渚项目4', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 53, name: '良渚项目5', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 54, name: '良渚项目6', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 55, name: '良渚项目7', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 56, name: '良渚项目8', group: '良渚', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 上海 (20个) =====
      { id: 57, name: '上海项目1', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 58, name: '上海项目2', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 59, name: '上海项目3', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 60, name: '上海项目4', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 61, name: '上海项目5', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 62, name: '上海项目6', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 63, name: '上海项目7', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 64, name: '上海项目8', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 65, name: '上海项目9', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 66, name: '上海项目10', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 67, name: '上海项目11', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 68, name: '上海项目12', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 69, name: '上海项目13', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 70, name: '上海项目14', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 71, name: '上海项目15', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 72, name: '上海项目16', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 73, name: '上海项目17', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 74, name: '上海项目18', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 75, name: '上海项目19', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 76, name: '上海项目20', group: '上海', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 长沙 (1个) =====
      { id: 77, name: '长沙项目1', group: '长沙', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 苏博 (3个) =====
      { id: 78, name: '苏博项目1', group: '苏博', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 79, name: '苏博项目2', group: '苏博', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 80, name: '苏博项目3', group: '苏博', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 浙自然 (3个) =====
      { id: 81, name: '浙自然项目1', group: '浙自然', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 82, name: '浙自然项目2', group: '浙自然', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 83, name: '浙自然项目3', group: '浙自然', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 重庆 (5个) =====
      { id: 84, name: '重庆项目1', group: '重庆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 85, name: '重庆项目2', group: '重庆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 86, name: '重庆项目3', group: '重庆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 87, name: '重庆项目4', group: '重庆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 88, name: '重庆项目5', group: '重庆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 桐庐 (6个) =====
      { id: 89, name: '桐庐项目1', group: '桐庐', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 90, name: '桐庐项目2', group: '桐庐', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 91, name: '桐庐项目3', group: '桐庐', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 92, name: '桐庐项目4', group: '桐庐', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 93, name: '桐庐项目5', group: '桐庐', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 94, name: '桐庐项目6', group: '桐庐', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 井冈山 (2个) =====
      { id: 95, name: '井冈山项目1', group: '井冈山', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 96, name: '井冈山项目2', group: '井冈山', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 周庄 (2个) =====
      { id: 97, name: '周庄项目1', group: '周庄', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 98, name: '周庄项目2', group: '周庄', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 福州 (1个) =====
      { id: 99, name: '福州项目1', group: '福州', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 三星堆 (6个) =====
      { id: 100, name: '三星堆项目1', group: '三星堆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 101, name: '三星堆项目2', group: '三星堆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 102, name: '三星堆项目3', group: '三星堆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 103, name: '三星堆项目4', group: '三星堆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 104, name: '三星堆项目5', group: '三星堆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 105, name: '三星堆项目6', group: '三星堆', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 奥体 (1个) =====
      { id: 106, name: '奥体项目1', group: '奥体', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 厦门 (6个) =====
      { id: 107, name: '厦门项目1', group: '厦门', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 108, name: '厦门项目2', group: '厦门', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 109, name: '厦门项目3', group: '厦门', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 110, name: '厦门项目4', group: '厦门', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 111, name: '厦门项目5', group: '厦门', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 112, name: '厦门项目6', group: '厦门', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 洛阳 (8个) =====
      { id: 113, name: '洛阳项目1', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 114, name: '洛阳项目2', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 115, name: '洛阳项目3', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 116, name: '洛阳项目4', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 117, name: '洛阳项目5', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 118, name: '洛阳项目6', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 119, name: '洛阳项目7', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 120, name: '洛阳项目8', group: '洛阳', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 浙博 (3个) =====
      { id: 121, name: '浙博项目1', group: '浙博', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 122, name: '浙博项目2', group: '浙博', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 123, name: '浙博项目3', group: '浙博', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },

      // ===== 物料 (5个) =====
      { id: 124, name: '物料项目1', group: '物料', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 125, name: '物料项目2', group: '物料', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 126, name: '物料项目3', group: '物料', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 127, name: '物料项目4', group: '物料', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' },
      { id: 128, name: '物料项目5', group: '物料', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop' }
    ]
  },
  data: {
    title: "项目SKU产出趋势",
    sortBtnText: "按打样款数排序",
    legend: {
      sample: "打样款数",
      order: "下单款数"
    },
    yAxisMax: 50,
    yAxisLabels: [50, 40, 30, 20, 10, 0],
    chartData: [
      { name: '先锋', sample: 48, order: 31 },
      { name: '上海', sample: 20, order: 12 },
      { name: '苏博', sample: 3, order: 1 },
      { name: '良渚', sample: 8, order: 6 },
      { name: '三星堆', sample: 6, order: 4 },
      { name: '浙博', sample: 3, order: 0 },
      { name: '浙自然', sample: 3, order: 2 },
      { name: '厦门', sample: 6, order: 0 },
      { name: '洛阳', sample: 8, order: 7 },
      { name: '福州', sample: 1, order: 0 },
      { name: '长沙', sample: 1, order: 1 },
      { name: '重庆', sample: 5, order: 4 },
      { name: '桐庐', sample: 6, order: 5 },
      { name: '井冈山', sample: 2, order: 2 },
      { name: '周庄', sample: 2, order: 2 },
      { name: '奥体', sample: 7, order: 0 },
    ]
  },
  analysis: {
    sections: [
      {
        id: 'product-analysis',
        title: "产品分析",
        themeColor: "bg-purple-500",
        items: [
          { id: 1, title: '分析维度 1', iconName: 'FileText', colorClass: 'text-purple-400 bg-purple-500/20' },
          { id: 2, title: '分析维度 2', iconName: 'FileText', colorClass: 'text-purple-400 bg-purple-500/20' },
          { id: 3, title: '分析维度 3', iconName: 'FileText', colorClass: 'text-purple-400 bg-purple-500/20' }
        ]
      },
      {
        id: 'structure-research',
        title: "结构研究",
        themeColor: "bg-pink-500",
        placeholderText: "此处可放置复杂的结构图纸或交互模型"
      }
    ]
  },
  assets: {
    banner: {
      title: "注意事项",
      text: "设计规范与排版避坑指南",
      themeColor: "bg-emerald-400",
      longImageSrc: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260505224810577.jpg"
    },
    sop: {
      title: "拼装翻页万年历SOP",
      steps: [
        { id: 1, title: '工艺流转步骤 1', desc: '相关的刀模线文件与打样材质说明...' },
        { id: 2, title: '工艺流转步骤 2', desc: '相关的刀模线文件与打样材质说明...' },
        { id: 3, title: '工艺流转步骤 3', desc: '相关的刀模线文件与打样材质说明...' },
        { id: 4, title: '工艺流转步骤 4', desc: '相关的刀模线文件与打样材质说明...' }
      ]
    },
    plugins: {
      title: "插件沉淀",
      items: [
        { id: 1, name: 'C4D 材质库', tag: '3D' },
        { id: 2, name: 'AI 矢量笔刷', tag: '矢量' },
        { id: 3, name: 'Figma 自动化', tag: 'UI/UX' },
        { id: 4, name: '字体包合集', tag: '排版' }
      ]
    }
  }
};

// ==========================================
// 2. 视图结构层 (Components) - 全新波普/新粗野主义风 (Neo-Brutalism)
// ==========================================

const iconMap = { Home, Layers, BarChart3, FileText, ImageIcon };

const NavBar = ({ activeTab, setActiveTab }: any) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFD074] border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src={siteData.global.logoImg} 
              alt="Logo" 
              className="w-10 h-10 object-contain hover:scale-110 hover:-rotate-12 transition-transform duration-200"
              style={{ filter: 'drop-shadow(3px 3px 0px #000)' }}
            />
            <span className="font-black tracking-wider text-black text-lg uppercase ml-2">
              {siteData.global.logoText}
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-3">
              {siteData.global.tabs.map((tab) => {
                const IconComponent = iconMap[tab.iconName];
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2 rounded-xl text-sm font-black transition-all duration-200 flex items-center gap-2 border-[3px] border-black
                      ${isActive 
                        ? 'bg-black text-white shadow-[0_0_0_0_#000] translate-y-1 translate-x-1' 
                        : 'bg-white text-black shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_0_#000]'}`}
                  >
                    {IconComponent && <IconComponent size={18} strokeWidth={isActive ? 3 : 2.5} />}
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HomeView = () => (
  <div className="flex flex-col items-center justify-center min-h-[75vh] animate-in fade-in zoom-in-95 duration-500">
    <div className="text-center space-y-8 w-full max-w-5xl">
      <div className="inline-block relative group">
         {/* 装饰性波普元素 */}
         <div className="absolute -top-6 -left-8 w-12 h-12 bg-[#38E662] border-[3px] border-black rounded-full -z-10 group-hover:scale-150 group-hover:-translate-x-4 transition-all duration-500"></div>
         <div className="absolute -bottom-4 -right-10 w-16 h-16 bg-[#26D0CE] border-[3px] border-black rotate-12 -z-10 group-hover:rotate-[135deg] group-hover:scale-110 transition-all duration-500"></div>
         
         <h1 className="text-6xl md:text-8xl font-black tracking-tight text-black relative z-10 px-4 py-2 bg-white border-[4px] border-black shadow-[8px_8px_0_0_#000] -rotate-2 inline-block transition-all duration-300 group-hover:rotate-2 group-hover:scale-105 group-hover:bg-[#FFD074] group-hover:shadow-[16px_16px_0_0_#000] cursor-pointer">
           {siteData.home.title}
         </h1>
      </div>
      
      <div className="flex flex-col items-center mt-16 mb-16 relative">
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-[4px] border-black shadow-[8px_8px_0_0_#000] overflow-hidden bg-[#FF90E8]">
          <img 
            src={siteData.home.avatar} 
            alt="Avatar" 
            className="w-full h-full object-cover transition-all duration-300 hover-brutal-shake"
          />
        </div>
        <div className="bg-white px-6 py-2 border-[3px] border-black shadow-[4px_4px_0_0_#000] mt-[-20px] z-10 rounded-xl rotate-3">
           <h2 className="text-3xl font-black text-black">{siteData.home.name}</h2>
        </div>
        <p className="font-bold mt-6 px-4 py-1 bg-black text-white rounded-full uppercase tracking-widest text-sm border-2 border-transparent shadow-[4px_4px_0_0_#FF90E8]">
          {siteData.home.role}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {siteData.home.stats.map((stat) => (
          <div key={stat.id} className="bg-white border-[4px] border-black rounded-2xl overflow-hidden shadow-[8px_8px_0_0_#000] transform transition-transform hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#000] flex flex-col">
            <div className={`h-6 w-full border-b-[4px] border-black bg-gradient-to-r ${stat.colorClass}`}></div>
            <div className="p-8 flex flex-col items-center justify-center">
              <div className="text-5xl md:text-6xl font-black text-black tracking-tighter drop-shadow-md">
                {stat.value}
              </div>
              <div className="mt-4 px-4 py-1.5 bg-[#f0f0f0] border-2 border-black rounded-lg font-black tracking-wider text-sm uppercase">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PortfolioView = () => {
  const [activeFilter, setActiveFilter] = useState(siteData.portfolio.categories[0]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredProjects = activeFilter === siteData.portfolio.categories[0]
    ? siteData.portfolio.projects 
    : siteData.portfolio.projects.filter(p => p.group === activeFilter);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white p-4 border-[3px] border-black shadow-[6px_6px_0_0_#000] rounded-2xl">
        <div className="flex flex-wrap gap-3 flex-1">
          {siteData.portfolio.categories.map(cat => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-black tracking-wide transition-all duration-200 border-[3px] border-black
                  ${isActive 
                    ? 'bg-[#38E662] text-black shadow-[inset_0_4px_0_rgba(0,0,0,0.1)] translate-y-0.5 translate-x-0.5' 
                    : 'bg-[#F4F1EA] text-black shadow-[3px_3px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:bg-[#FFD074]'}`}
              >
                {cat}
              </button>
            )
          })}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl border-[3px] border-black transition-all ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black shadow-[3px_3px_0_0_#000] hover:bg-[#FF90E8]'}`}
          >
            <LayoutGrid size={20} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl border-[3px] border-black transition-all ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black shadow-[3px_3px_0_0_#000] hover:bg-[#26D0CE]'}`}
          >
            <List size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10" 
          : "flex flex-col gap-6"
      }>
        {filteredProjects.map((project, idx) => {
          const rotateClass = idx % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';
          return (
            <div 
              key={project.id} 
              className={`group flex flex-col ${viewMode === 'list' ? 'md:flex-row items-center p-3' : ''} bg-white border-[4px] border-black shadow-[8px_8px_0_0_#000] rounded-2xl overflow-hidden transition-transform duration-300 ${rotateClass} hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#000]`}
            >
              <div 
                className={`${viewMode === 'list' ? 'w-32 h-24 md:w-56 md:h-36 shrink-0 border-[3px] border-black rounded-xl' : 'w-full aspect-[4/3] border-b-[4px] border-black'} overflow-hidden bg-[#FFD074] relative cursor-pointer group-hover:opacity-90 transition-opacity`}
                onClick={() => setSelectedImage(project.img)}
              >
                <img 
                  src={project.img} 
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="bg-black text-white font-black px-3 py-1 border-2 border-white rounded shadow-[2px_2px_0_0_#fff] transform scale-90 group-hover:scale-100 transition-transform">放大</span>
                </div>
              </div>
              
              <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex justify-between items-center bg-transparent' : 'bg-white'}`}>
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-black text-black leading-tight mb-2">{project.name}</h3>
                  <span className="inline-block px-3 py-1 bg-[#26D0CE] text-black border-2 border-black rounded-lg text-xs font-black uppercase">
                    {project.group}
                  </span>
                </div>
                {viewMode === 'list' && (
                  <button 
                    onClick={() => setSelectedImage(project.img)}
                    className="hidden md:flex items-center gap-1 px-4 py-2 bg-black text-white border-2 border-black rounded-xl font-bold hover:bg-[#FF90E8] hover:text-black transition-colors"
                  >
                    {siteData.portfolio.detailBtnText}
                  </button>
                )}
              </div>
            </div>
          )
        })}
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-32 text-center text-black font-black text-2xl border-[4px] border-black border-dashed rounded-3xl bg-white shadow-[8px_8px_0_0_#000]">
            {siteData.portfolio.emptyMessage}
          </div>
        )}
      </div>

      {/* 图片放大查看模态框 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-6xl w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()} 
          >
            <img 
              src={selectedImage} 
              alt="Enlarged" 
              className="max-w-full max-h-[85vh] object-contain border-[4px] border-black shadow-[16px_16px_0_0_#FF90E8] bg-white" 
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-6 -right-2 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 bg-[#38E662] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[6px_6px_0_0_#000] z-10"
            >
              <X size={32} strokeWidth={3} className="text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DataView = () => {
  const { title, legend, yAxisMax, yAxisLabels, chartData } = siteData.data;
  
  const [sortBy, setSortBy] = useState(null);

  const sortedData = sortBy ? [...chartData].sort((a, b) => b[sortBy] - a[sortBy]) : chartData;

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight inline-block px-6 py-3 bg-[#38E662] border-[4px] border-black shadow-[6px_6px_0_0_#000] rotate-1">
          {title}
        </h2>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setSortBy(sortBy === 'sample' ? null : 'sample')}
            className={`px-5 py-2.5 font-black text-sm border-[3px] border-black rounded-xl transition-all flex items-center gap-2 ${
              sortBy === 'sample' 
                ? 'bg-[#38E662] text-black shadow-[inset_0_4px_0_rgba(0,0,0,0.1)] translate-y-0.5 translate-x-0.5' 
                : 'bg-white text-black shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:bg-[#FFD074]'
            }`}
          >
            按打样排序
          </button>
          <button 
            onClick={() => setSortBy(sortBy === 'order' ? null : 'order')}
            className={`px-5 py-2.5 font-black text-sm border-[3px] border-black rounded-xl transition-all flex items-center gap-2 ${
              sortBy === 'order' 
                ? 'bg-[#FF90E8] text-black shadow-[inset_0_4px_0_rgba(0,0,0,0.1)] translate-y-0.5 translate-x-0.5' 
                : 'bg-white text-black shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:bg-[#26D0CE]'
            }`}
          >
            按下单排序
          </button>
        </div>
      </div>

      <div className="bg-white p-8 border-[4px] border-black rounded-3xl shadow-[10px_10px_0_0_#000]">
        <div className="flex justify-center gap-8 mb-12">
          <div className="flex items-center gap-3 bg-[#f4f1ea] px-4 py-2 border-[3px] border-black rounded-xl shadow-[3px_3px_0_0_#000]">
            <div className="w-5 h-5 bg-[#FF90E8] border-2 border-black rounded-md"></div>
            <span className="text-black text-sm font-black uppercase">{legend.sample}</span>
          </div>
          <div className="flex items-center gap-3 bg-[#f4f1ea] px-4 py-2 border-[3px] border-black rounded-xl shadow-[3px_3px_0_0_#000]">
            <div className="w-5 h-5 bg-black border-2 border-black rounded-md"></div>
            <span className="text-black text-sm font-black uppercase">{legend.order}</span>
          </div>
        </div>

        <div className="md:hidden text-center text-sm font-black text-black/50 mb-2 flex items-center justify-center gap-2">
            ← 左右滑动查看更多 →
        </div>

        <div className="w-full overflow-x-auto pb-20 custom-scrollbar">
          <div className="relative h-80 min-w-[800px] flex items-end justify-between pt-10 pl-12 border-l-[4px] border-b-[4px] border-black mt-10">
            <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between text-black font-black text-sm pb-0">
              {yAxisLabels.map((val, idx) => <span key={idx} className="bg-white border-2 border-black px-2 py-0.5 rounded-lg shadow-[2px_2px_0_0_#000] -rotate-6 translate-y-2">{val}</span>)}
            </div>

            {sortedData.map((data, i) => (
              <div key={i} className="flex flex-col items-center relative group flex-1 px-1 transition-all duration-500">
                <div className="flex items-end gap-1 md:gap-2 h-64 w-full justify-center">
                  {(sortBy === null || sortBy === 'sample') && (
                    <div 
                      className="w-4 md:w-8 bg-[#FF90E8] border-[3px] border-black border-b-0 rounded-t-xl transition-all duration-300 group-hover:scale-y-110 origin-bottom animate-in zoom-in-y"
                      style={{ height: `${(data.sample / yAxisMax) * 100}%` }}
                    ></div>
                  )}
                  {(sortBy === null || sortBy === 'order') && (
                    <div 
                      className="w-4 md:w-8 bg-black border-[3px] border-black border-b-0 rounded-t-xl transition-all duration-300 group-hover:scale-y-110 origin-bottom animate-in zoom-in-y"
                      style={{ height: `${(data.order / yAxisMax) * 100}%` }}
                    ></div>
                  )}
                </div>
                
                <div className="absolute -top-20 opacity-0 group-hover:opacity-100 transition-all bg-white border-[4px] border-black text-black text-sm p-4 shadow-[6px_6px_0_0_#000] z-10 font-black whitespace-nowrap rounded-2xl transform scale-90 group-hover:scale-100">
                  <div className="mb-2 text-lg text-[#26D0CE] stroke-black">{data.name}</div>
                  {(sortBy === null || sortBy === 'sample') && <div>{legend.sample}: {data.sample}</div>}
                  {(sortBy === null || sortBy === 'order') && <div>{legend.order}: {data.order}</div>}
                </div>

                <span className="absolute top-full mt-8 text-black font-black text-xs md:text-sm transform -rotate-45 origin-top-left whitespace-nowrap bg-[#f4f1ea] px-2 py-1 border-2 border-black rounded-lg z-10">
                  {data.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisView = () => {
  const { sections } = siteData.analysis;
  
  return (
    <div className="animate-in fade-in duration-500 space-y-20">
      {sections.map((section, sIdx) => (
        <section key={section.id} className="relative">
          <div className="flex items-center gap-6 mb-10">
            <div className={`w-12 h-12 ${section.themeColor} border-[4px] border-black rounded-full shadow-[4px_4px_0_0_#000]`}></div>
            <h2 className="text-4xl font-black text-black tracking-tight uppercase">
              {section.title}
            </h2>
          </div>
          
          {section.items && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.items.map((item, index) => {
                const ItemIcon = iconMap[item.iconName];
                return (
                  <div key={item.id} className="group bg-white border-[4px] border-black p-8 rounded-3xl shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#000] transition-all">
                    <div className="flex justify-between items-start mb-10">
                      <div className={`w-14 h-14 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center text-black shadow-[4px_4px_0_0_#000] group-hover:rotate-12 transition-transform`}>
                        {ItemIcon && <ItemIcon size={28} strokeWidth={2.5} />}
                      </div>
                      <span className={`text-2xl font-black px-3 py-1 border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] -rotate-6 ${index%2===0 ? 'bg-[#FF90E8]' : 'bg-[#FFD074]'}`}>
                        #{index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-black mb-6">{item.title}</h3>
                    <div className="space-y-4">
                      <div className="h-4 border-[3px] border-black bg-[#f4f1ea] rounded-full w-full"></div>
                      <div className="h-4 border-[3px] border-black bg-[#f4f1ea] rounded-full w-4/5"></div>
                      <div className="h-4 border-[3px] border-black bg-[#f4f1ea] rounded-full w-2/3"></div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {section.placeholderText && (
            <div className="bg-[#f4f1ea] border-[4px] border-black p-12 min-h-[350px] flex items-center justify-center rounded-3xl shadow-[inset_8px_8px_0_rgba(0,0,0,0.05)]">
              <div className="text-center bg-white p-8 border-[4px] border-black border-dashed rounded-2xl shadow-[8px_8px_0_0_#000] -rotate-2">
                <Layers size={56} className="mx-auto mb-6 text-black" strokeWidth={2.5} />
                <p className="font-black text-xl text-black uppercase tracking-widest">{section.placeholderText}</p>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

const AssetsView = () => {
  const { banner, sop, plugins } = siteData.assets;
  
  const [showLongImage, setShowLongImage] = useState(false);

  return (
    <div className="animate-in fade-in duration-500 space-y-16">
      <section>
        <div className={`border-[4px] border-black shadow-[12px_12px_0_0_#000] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden ${banner.themeColor}`}>
          <div className="relative z-10">
             <div className="inline-block px-4 py-2 bg-white text-black border-[3px] border-black shadow-[4px_4px_0_0_#000] text-sm font-black tracking-widest uppercase mb-8 -rotate-2">
               {banner.title}
             </div>
             <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight max-w-lg text-black bg-white/60 p-4 border-[4px] border-black rounded-2xl backdrop-blur-sm">
               {banner.text}
             </h3>
          </div>
          <div 
            className="bg-white p-6 border-[4px] border-black rounded-full shadow-[8px_8px_0_0_#000] z-10 transform rotate-12 hover:rotate-[360deg] transition-all duration-700 cursor-pointer group relative"
            onClick={() => setShowLongImage(true)}
          >
            <ImageIcon size={80} className="text-black" strokeWidth={2.5} />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-black px-3 py-1 border-2 border-white rounded shadow-[2px_2px_0_0_#fff] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              点击查看长图
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
        <section className="bg-white border-[4px] border-black rounded-3xl p-8 shadow-[8px_8px_0_0_#000]">
          <h2 className="text-3xl font-black text-black mb-10 tracking-tight inline-block border-b-[4px] border-black pb-2">{sop.title}</h2>
          <div className="space-y-6">
             {sop.steps.map((step, idx) => (
               <div key={step.id} className="flex gap-6 items-start p-5 bg-[#f4f1ea] border-[3px] border-black rounded-2xl shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all">
                 <div className="w-12 h-12 shrink-0 bg-[#38E662] border-[3px] border-black rounded-full flex items-center justify-center font-black text-black text-xl shadow-[2px_2px_0_0_#000]">
                   {idx + 1}
                 </div>
                 <div>
                   <h4 className="text-black font-black text-xl">{step.title}</h4>
                   <p className="text-black/70 font-bold mt-2 text-sm">{step.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-black mb-10 tracking-tight bg-[#FF90E8] border-[4px] border-black px-6 py-3 inline-block rounded-2xl shadow-[6px_6px_0_0_#000] rotate-2">{plugins.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {plugins.items.map((plugin) => (
              <div key={plugin.id} className="group border-[4px] border-black p-6 rounded-2xl bg-white shadow-[6px_6px_0_0_#000] hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all cursor-pointer flex flex-col justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center group-hover:bg-[#FFD074] group-hover:text-black border-2 border-transparent group-hover:border-black transition-colors">
                    <Layers size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#f4f1ea] border-2 border-black px-2 py-1 rounded-md">
                    {plugin.tag}
                  </span>
                </div>
                <h4 className="font-black text-xl text-black group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  {plugin.name}
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                </h4>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showLongImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in zoom-in-95 duration-200 custom-scrollbar"
          onClick={() => setShowLongImage(false)}
        >
          <div className="min-h-screen py-12 px-4 md:px-20 flex justify-center">
            <div 
              className="relative w-full max-w-4xl"
              onClick={e => e.stopPropagation()} 
            >
              <button 
                onClick={() => setShowLongImage(false)}
                className="fixed top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-[#38E662] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[6px_6px_0_0_#000] z-50"
              >
                <X size={32} strokeWidth={3} className="text-black" />
              </button>
              <img 
                src={banner.longImageSrc} 
                alt="规范长图" 
                className="w-full h-auto border-[4px] border-black shadow-[16px_16px_0_0_#FF90E8] bg-white rounded-xl" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FloatingQRCode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { qrCodeImg, qrCodeText } = siteData.global;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white border-[4px] border-black p-4 rounded-3xl shadow-[8px_8px_0_0_#000] animate-in slide-in-from-bottom-4 fade-in duration-200 transform origin-bottom-right -rotate-2">
          <div className="flex justify-center items-center mb-3">
            <span className="font-black text-black text-xs uppercase tracking-widest bg-[#38E662] px-3 py-1 border-2 border-black rounded-lg shadow-[2px_2px_0_0_#000] rotate-2">
              {qrCodeText}
            </span>
          </div>
          <div className="bg-[#f4f1ea] border-[3px] border-black rounded-xl p-2 shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)]">
            <img src={qrCodeImg} alt="QR Code" className="w-32 h-32 md:w-40 md:h-40 rounded-lg mix-blend-multiply" />
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 border-[4px] border-black rounded-full flex items-center justify-center shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all duration-300 ${
          isOpen ? 'bg-[#FF90E8] rotate-90 scale-90' : 'bg-[#26D0CE] hover:rotate-12'
        }`}
      >
        {isOpen ? <X size={32} strokeWidth={3} className="text-black" /> : <QrCode size={32} strokeWidth={3} className="text-black" />}
      </button>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState(siteData.global.tabs[0].id);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes brutal-shake {
        0%, 100% { transform: rotate(0deg) scale(1.1); }
        25% { transform: rotate(-8deg) scale(1.1); }
        50% { transform: rotate(8deg) scale(1.1); }
        75% { transform: rotate(-8deg) scale(1.1); }
      }
      .hover-brutal-shake:hover {
        animation: brutal-shake 0.3s ease-in-out infinite;
      }
      
      /* 自定义滚动条样式，使其符合波普风格 */
      .custom-scrollbar::-webkit-scrollbar {
        height: 12px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f4f1ea;
        border: 3px solid black;
        border-radius: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #38E662;
        border-radius: 8px;
        border: 3px solid black;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #FF90E8;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-[#FF90E8] selection:text-black relative overflow-x-hidden">
      {/* 趣味波普点阵背景 */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}
      ></div>
      
      <div className="relative z-10">
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'portfolio' && <PortfolioView />}
          {activeTab === 'data' && <DataView />}
          {activeTab === 'analysis' && <AnalysisView />}
          {activeTab === 'assets' && <AssetsView />}
        </main>
        
        {/* 渲染悬浮二维码组件 */}
        <FloatingQRCode />
      </div>
    </div>
  );
}
