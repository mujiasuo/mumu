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
  QrCode,
  Star
} from 'lucide-react';

// ==========================================
// 1. 数据配置层 (Site Data) - 内容与结构完全分离
// ==========================================
const siteData = {
  global: {
    logoText: "是有集团 事业二部二组木木",
    qrCodeImg: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mumushuzhi.netlify.app/", 
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
    categories: ['全部', '先锋', '上海', '苏博', '良渚', '三星堆', '浙博', '浙自然', '物料', '厦门', '洛阳', '福州', '长沙', '重庆', '桐庐', '井冈山', '周庄', '奥体'],
    emptyMessage: "没有找到该分类下的作品",
    detailBtnText: "查看详情 →",
    summaries: {
      '全部': '2025年度累计推进近两百项文创开发，通过跨材质组合与复杂结构验证，沉淀了宝贵的供应链打样经验与设计标准。',
      '先锋': '本年度在先锋客户更钟爱拼装翻页万年历，平均1.2套/月。产品品类过分依赖冰箱贴（前15产品占比超60%）。',
      '上海': '整体消费反馈良好，树脂冰箱贴品类数据稳定。',
      '良渚': '围绕“神徽”与“玉琮”，采用仿古金属与做旧工艺，在小体量周边中还原了五千年前的历史厚重感。',
      '浙博': '新接手的项目组，正在逐步熟悉项目ing......',
      '物料': '物料需要注意载体的呈现方式，根据需求去优化设计，注意产品的突出宣传效果',
    },
    projects: [
      // ===== 先锋 (48个) =====
      { 
        id: 1, 
        name: '先锋抽拉变色', 
        group: '先锋', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/1moRa67YruAkt4%404x.png',
        notes: "1. 结构注意：工厂粘贴纸卡重叠处会产生明显的胶痕\n2. 费用：结构及成本较高" 
      },
      { id: 2, name: '老南京巴士拼装摆件', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/1pSDavPBDBkeZt%404x.png' },
      { id: 3, name: '先锋书店摇摇乐挂件', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/2AtzQyyv2Q4aKi%404x.png' },
      { id: 4,
       name: '曲律悠扬钥匙扣',
       group: '先锋',
       img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/8ccG8Oek4cJAEz%404x.png',
       notes: "1. 滴胶问题：亚克力加滴胶可以增加质感，但挂孔处会有覆盖不到的区域，注意检查大货。" },
      { 
        id: 5, 
        name: '会泽盖章本', 
        group: '先锋', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/aMQhdb2m8cy0ZQ%404x.png',
        notes: "1. 民族图案融合特色形式，更符合当地特色"    
      },
      { id: 6, name: '南京·颐和路木质屏风冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/aZbdqLC4O2xTob%404x.png' },
      { id: 7, name: '哈尼弦音钥匙扣', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/bNZgGPEF2zGOrs%404x.png' },
      { id: 8, name: '会泽天下金属冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/boDTqcWjo9HqU6%404x.png' },
      { id: 9, name: '骏惠书屋木质发光冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/cAy4s0OVk4QM6P%404x.png' },
      { id: 10, name: '松阳木塔树脂发光冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/cUe9z6fezVdgxi%404x.png' },
      { id: 11, name: '南京书本冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/D1tJfPlsQXrLVX%404x.png' },
      { id: 12, name: '南京流沙摆件冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/D7sBRuMkcdnhm1%404x.png' },
      { id: 13, name: '大钟亭木质冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/eAgOfoc6WwBwRl%404x.png' },
      { id: 14, name: '印象南京手柄镜', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/EiGymvA8THAmQ1%404x.png' },
      { id: 15, name: '沙溪印象拼装翻页万年历', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/F2Lg3X1Fu4yc8f%404x.png' },
      { id: 16, name: '云南瓦猫木质发光冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/g3i2TE1mn10N3n%404x.png' },
      { id: 17, name: '南京秦淮流华冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/hoZ70dsFCTnhYQ%404x.png' },
      { id: 18, name: '哈尼元阳金属开瓶器', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/hpITXBPtyVleRJ%404x.png' },
      { id: 19, name: '金陵记忆手柄镜', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/HqEayEzS3wSzIo%404x.png' },
      { id: 20, name: '会泽印象金属冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/Hr5WeUgujrf6oZ%404x.png' },
      { id: 21, name: '蒙自印象拼装翻页万年历', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/hwbfzKKPqahghh%404x.png' },
      { id: 22, name: '先锋书店金属书签', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/JxPMWGSq1e3Qns%404x.png' },
      { id: 23, name: '碧山书局拼装翻页万年历', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/kFjpowO0gUVXc8%404x.png' },
      { id: 24, 
        name: '先锋南京旋转冰箱贴', 
        group: '先锋', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/kzhNXD5fbAmuYF%404x.png',
        notes: "同品类市场一般，暂缓推进",
        },
      { id: 25, name: '先锋来信抽拉变色', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/lJiuvg1fW2B65i%404x.png' },
      { id: 26, name: '先锋民族花纹炫光旋转冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/pbmUigFhN4p7WP%404x.png' },
      { id: 27, name: '会泽天下金属冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/QdsHls0sbxyKfB%404x.png' },
      { id: 28, name: '先锋书店流沙摆件冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/QPMxCDQrg3vCUY%404x.png' },
      { id: 29, name: '开平印象拼装翻页万年历', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/qsusoc8VOEc3p8%404x.png' },
      { id: 30, name: '会泽印象拼装翻页万年历', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/qTDS6qtAVLv3h9%404x.png' },
      { id: 31, name: '先锋千乘桥摆件', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/sTl8pOnMydgkwF%404x.png' },
      { id: 32, name: '南京颐和路金属冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/tEBndToIm1z9nn%404x.png' },
      { id: 33, name: '玄武湖先锋书店金属流华冰箱贴', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/uy81BetQ0M9DXj%404x.png' },
      { id: 34, name: '辟小邪挂件', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/WwFhahkUFYIGNU%404x.png' },
      { id: 35, name: '先锋书店金属书签', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/Yv8eZNQhmoZtF1%404x.png' },
      { id: 36, name: '一间只属于自己的房间书签', group: '先锋', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/zrMqJ2HEUKRIBn%404x.png' },
      { id: 37, 
        name: '邮筒鸭-金属翻页冰箱贴', 
        group: '先锋', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/fUDgFBBtUVTBEu%404x.png',
        notes: "结构成本较高",
        },

      // ===== 良渚 (8个) =====
      { id: 49, name: '转良运·玉琮', group: '良渚', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/S49gAHXE3xAoSu%404x.png' },
      { id: 50, name: '转良运·神徽', group: '良渚', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/M6K5cll3Mj2txg%404x.png' },
      { id: 51, name: '雅典卫城-金属冰箱贴', group: '良渚', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/facDF39Q0cNQ9w%404x.png' },
      { id: 52, name: '希腊记忆-拼装翻页万年历', group: '良渚', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/meDrvOZImJoKIe%404x.png' },
      { id: 53, name: '良渚玉琮转转摆件', group: '良渚', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/zCXkivHroEvAUd%404x.png' },

      // ===== 上海 (20个) =====
      { id: 57, name: '上海-东方明珠-金属流沙摆件冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4vNWigfKgTBICv%404x.png' },
      { id: 58, name: '上海-武康大楼-金属流沙摆件冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/VJqFbdvLoiMyMT%404x.png' },
      { id: 59, name: '上海-武康大楼-金属钥匙扣', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/5YF8YSsdj3SFRq%404x.png' },
      { id: 60, name: '上海-东方明珠-金属钥匙扣', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/iAE1sgoZZuj1gU%404x.png' },
      { id: 61, name: '上海-东方明珠-发光水晶球', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/5kwLf5YVLQB9Rn%404x.png' },
      { id: 62, name: '上海-武康大楼-发光水晶球', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/sQ32S2qm6bL7Us%404x.png' },
      { id: 63, name: '上海侬好-金属冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/Gdg8RmSybe9rll%404x.png' },
      { id: 64, 
        name: '上海·东方明珠-金属旋转流沙冰箱贴', 
        group: '上海', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/AAx1zzdK9TY1VA%404x.png',
        notes: "1. 设计时遗漏垂直静止中心问题，导致吸附时顶部较重使产品倒置。"  },
        
      { id: 65, name: '上海记忆-金属冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/0uSVJvXn1vAa7Z%404x.png' },
      { id: 66, name: '上海流光-金属翻页发光冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/HGjSH6brUjMp9K%404x.png' },
      { id: 67, name: '上海印象-组合旋转立体冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/auWWltGMMclMYw%404x.png' },
      { id: 68, name: '上海-东方明珠-金属书签', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/YsZ9NZuLbBtqNv%404x.png' },
      { id: 69, name: '上海观景图鉴-金属亚克力冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/OAFxAhjVXKeh2O%404x.png' },
      { id: 70, name: '外滩风情-金属冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/2R1zLj7MDVV5kf%404x.png' },
      { id: 71, 
        name: '勇闯上海-金属滑动冰箱贴', 
        group: '上海', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/GP22r7rK1aUAA5%404x.png',
        notes: "大富翁题材有版权问题",
        },
      { id: 72, 
        name: '上海夜韵-金属冰箱贴', 
        group: '上海', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/cZhHsPFSGU5GYd%404x.png',
        notes: "尝试夜光效果，效果太差，转为玻璃漆推进，后续设计夜光效果根据市场成熟度酌情考虑"
         },
      { id: 73, name: '上海-炫光旋转冰箱贴', group: '上海', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/NePW1zNPO1JZ9K%404x.png' },

      // ===== 长沙 (1个) =====
      { id: 77, name: '岳麓枫韵-拼装翻页万年历', group: '长沙', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%BA%90X3A2J7XxPASzsK%201%404x.png' },

      // ===== 苏博 (3个) =====
      { id: 78, name: '花鸟册·金属钥匙扣', group: '苏博', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/asdaffafs%404x.png' },
      { id: 79, name: '紫藤映鱼-流沙摆件冰箱贴', group: '苏博', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/aasaasas%404x.png' },
      { id: 80, name: '姑苏繁华图·木质屏风冰箱贴', group: '苏博', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/6baU8fCsLDNUmd%404x.png' },

      // ===== 浙自然 (3个) =====
      { id: 81, name: '恐龙笔记-书本冰箱贴', group: '浙自然', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/WIjFu8KQVs0Lnz%404x.png' },

      // ===== 重庆 (5个) =====
      { id: 84, name: '渝你同行·金属冰箱贴', group: '重庆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/asdasd%404x.png' },
      { id: 85, name: '重庆之旅-玻璃漆冰箱贴', group: '重庆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/zxczxczc%404x.png' },
      { id: 86, name: '打卡重庆-金属冰箱贴', group: '重庆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/asdadasdad%404x.png' },
      { id: 87, 
        name: '巴渝烟火-金属冰箱贴', 
        group: '重庆', 
        img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/sadasfaxcz%404x.png',
        notes: "弹射结构有问题，且通品类市场反馈一般暂停推进"
         },

      // ===== 桐庐 (6个) =====
      { id: 89, name: '瑶琳仙境-金属灯笼冰箱贴', group: '桐庐', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E5%95%8A%E5%AE%9E%E6%89%93%E5%AE%9E%E7%9A%84%404x.png' },
      { id: 90, name: '桐庐登山奖牌', group: '桐庐', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E7%88%B1%E4%BB%95%E8%BE%BE%E7%9A%84%404x.png' },
      { id: 91, name: '竹韵桐庐-金属冰箱贴', group: '桐庐', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%BA%90%208%404x.png' },
      { id: 92, name: '大奇山-流沙冰箱贴', group: '桐庐', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E5%A4%A7%E5%A4%A7%E7%9A%84%404x.png' },
      { id: 93, name: '瑶琳仙境-流沙冰箱贴', group: '桐庐', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%8C%89%E6%97%B6%E6%89%93%E7%AE%971%404x.png' },
      { id: 94, name: '桐庐-流沙冰箱贴', group: '桐庐', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/adsdda%404x.png' },

      // ===== 井冈山 (2个) =====
      { id: 95, name: '红色江西-金属冰箱贴', group: '井冈山', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513183817994.png' },
      { id: 96, name: '红色江西-拼装翻页万年历', group: '井冈山', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%BA%90%205%404x.png' },

      // ===== 周庄 (2个) =====
      { id: 97, name: '古韵周庄-金属冰箱贴', group: '周庄', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513183817995.png' },
      { id: 98, name: '烟雨周庄-金属冰箱贴', group: '周庄', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%BA%90%203%404x.png' },

      // ===== 福州 (1个) =====
      { id: 99, name: '福州-金属动感冰箱贴', group: '福州', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/P52kv9bzChC7VM%404x.png' },

      // ===== 三星堆 (6个) =====
      { id: 100, name: '卧龙·毛绒啪啪圈', group: '三星堆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/3dS4ddPLyFndTV%404x.png' },
      { id: 101, name: '凤雏·毛绒啪啪圈', group: '三星堆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/QATbgjTtTdWSZr%404x.png' },
      { id: 102, name: '卧龙·毛绒挂件', group: '三星堆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/7gxnrks3yFBUqI%404x.png' },
      { id: 103, name: '凤雏·毛绒挂件', group: '三星堆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/AJYPv8xBbHNNO1%404x.png' },
      { id: 104, name: '三星堆系列烫金贴纸', group: '三星堆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/324234234.png' },
      { id: 105, name: '三星堆文物护照', group: '三星堆', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/23423424.png' },

      // ===== 奥体 (1个) =====
      { id: 106, name: '杭州奥体大小莲花-NFC唱片冰箱贴', group: '奥体', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/ynUYsxDH7WO334%404x.png' },

      // ===== 厦门 (6个) =====
      { id: 107, name: '厦门日记-金属旋转冰箱贴', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/15948456.png' },
      { id: 108, name: '姜母鸭·DIY钥匙扣', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/83Eo3fpIALoPT0%404x.png' },
      { id: 109, name: '厦门大学·DIY钥匙扣', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/8K9lAO3kxlQlxw%404x.png' },
      { id: 110, name: '沙滩·DIY钥匙扣', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/Cd5k8C8n9n3eVP%404x.png' },
      { id: 111, name: '厦门·DIY钥匙扣', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/iSmJszN2RfUsS6%404x.png' },
      { id: 112, name: '指定成功·DIY钥匙扣', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/Wtw6RE7hNcEt8Z%404x.png' },
      { id: 1121, name: '双子塔·DIY钥匙扣', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/zXZPdb9RrR0v4q%404x.png' },
      { id: 1122, name: '八卦楼·DIY钥匙扣', group: '厦门', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/vHPzsvnquhNjWC%404x.png' },

      // ===== 洛阳 (8个) =====
      { id: 113, name: '白马寺-随心选金属挂件', group: '洛阳', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%BA%90%201%404x54545.png' },
      { id: 114, name: '老君山-随心选金属挂件', group: '洛阳', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E9%97%AE%E9%97%AE1%404x.png' },
      { id: 115, name: '龙门石窟-随心选金属挂件', group: '洛阳', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E9%98%BF%E8%90%A8%E5%BE%B71%404x.png' },
      { id: 116, name: '牡丹-随心选金属挂件', group: '洛阳', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E9%98%BF%E8%90%A8%E5%BE%B7%E6%BA%90%201%404x.png' },
      { id: 117, name: '牛肉汤-随心选金属挂件', group: '洛阳', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%BA%90434%201%404x.png' },
      { id: 118, name: '唐三彩马-随心选金属挂件', group: '洛阳', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4356%404x.png' },
      { id: 119, name: '陶俑姐妹花-随心选金属挂件', group: '洛阳', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%B5%84%E6%BA%90%E6%88%91%E7%83%AD%E6%83%85%E6%88%91%201%404x.png' },

      // ===== 浙博 (3个) =====
      { id: 121, name: '浙博缠枝花卉纹-折扇-黄', group: '浙博', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/2212%404x.png' },
      { id: 122, name: '浙博缠枝花卉纹-折扇-蓝', group: '浙博', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/457433.png' },
      { id: 123, name: '青花墨彩山水-折扇', group: '浙博', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/5151%404x.png' },

      // ===== 物料 (5个) =====
      { id: 124, name: '良渚流沙展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/amdhGusADyJJSz%404x.png' },
      { id: 125, name: '桐庐礼物展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/asdasadsad%404x.png' },
      { id: 126, name: '侬好上海展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/CEPQccr2TkGW0V%404x.png' },
      { id: 127, name: '松阳木塔展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/eExz5NjqhAhV6S%404x.png' },
      { id: 128, name: '遇见会泽展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/OmxNOnrSvvyRX5%404x.png' },
      { id: 1291, name: '南京颐和路展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/oZeUtBHKy5jy6t%404x.png' },
      { id: 1292, name: '弦音悠扬展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/UKsU6ZkK64V9Ua%404x.png' },
      { id: 1293, name: '集章之旅展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/UxBuTog1pJVhvP%404x.png' },
      { id: 1294, name: '转良运展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/UxBuTog1pJVhvP%404x.png' },
      { id: 1295, name: '龙柄鸡首壶海报', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%B5%B7%E6%8A%A5.jpg' },
      { id: 1296, name: '护手霜海报', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%B5%B7%E6%8A%A5-01.jpg' },
      { id: 1297, name: '护手霜台卡', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%B5%B7%E6%8A%A5-02.jpg' },
      { id: 1298, name: '浙博手卡', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%89%8B%E5%8D%A1.jpg' },
      { id: 1299, name: '浙博海报1', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%B5%B7%E6%8A%A50-03.jpg' },
      { id: 1300, name: '浙博海报2', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%B5%B7%E6%8A%A50-02.jpg' },
      { id: 1301, name: '浙博海报3', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%B5%B7%E6%8A%A50-01.jpg' },
      { id: 1302, name: '浙博文物海报1', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/A5%E6%B5%B7%E6%8A%A5-01.jpg' },
      { id: 1303, name: '浙博文物海报2', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/A5%E6%B5%B7%E6%8A%A5-02.jpg' },
      { id: 1304, name: '福州风物海报', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E7%A6%8F%E5%B7%9E%E9%A3%8E%E7%89%A9%E6%B5%B7%E6%8A%A5A4.jpg' },
      { id: 1305, name: '虎纠礼物海报', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E8%99%8E%E7%BA%A0%E7%A4%BC%E7%89%A9%E6%B5%B7%E6%8A%A5A4.jpg' },
      { id: 1306, name: '有福小铺海报', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%9C%89%E7%A6%8F%E5%B0%8F%E9%93%BA%E6%B5%B7%E6%8A%A5A4.jpg' },
      { id: 1307, name: '武康大楼海报', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/tmp138B.png' },
      { id: 1308, name: '先锋随心选钥匙扣展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/1fBnKT8NG9WJIM%404x.png' },
      { id: 1309, name: '开平八音盒展架', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%95%88%E6%9E%9C%E5%9B%BE.png' },
      { id: 1310, name: '九周年盖章测', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E7%9B%96%E7%AB%A0%E5%86%8C.jpg' },
      { id: 1311, name: '九周年工作证', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E5%B7%A5%E4%BD%9C%E8%AF%81.jpg' },
      { id: 1312, name: '九周年夸夸镜', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E5%A4%B8%E5%A4%B8%E9%95%9C.jpg' },
      { id: 1313, name: '九周年游戏介绍', group: '物料', img: 'https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%B8%B8%E6%88%8F%E4%BB%8B%E7%BB%8D.jpg' },
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
    ],
    trendSummary: "本年度先锋与上海项目组作为绝对主力，呈现出极高的打样与下单量。部分文博项目（如苏博、浙博等）虽 SKU 基数较小，但打样转化为大货的成功率高。",
    proportionData: {
      title: "项目组产出比例",
      summary: "先锋与上海组占据了半数（50%）的整体产出，起到了中流砥柱的作用。",
      items: [
        { id: 'pioneer', name: '先锋项目组', count: 31, percentage: 40, colorClass: 'bg-[#FF90E8]' },
        { id: 'shanghai', name: '上海项目组', count: 8, percentage: 10, colorClass: 'bg-[#26D0CE]' },
        { id: 'others', name: '其他文博/文旅组', count: 39, percentage: 50, colorClass: 'bg-[#38E662]' },
      ]
    },
    anomalyData: {
      title: "异常与搁置项目原因",
      summary: "异常项目主要折损在“题材规避”与“打样不佳”上（合计60%）。这提示我们在项目早期的项目设计阶段需进一步加强可落地性预判，提前规避题材风险，并通过提前介入结构测试来降低后期沉没成本。",
      items: [
        { id: 'reason1', name: '题材创意与版权规避', percentage: 30, colorClass: 'bg-[#FF90E8]' },
        { id: 'reason2', name: '市场表现预判与打样效果不佳', percentage: 30, colorClass: 'bg-[#26D0CE]' },
        { id: 'reason3', name: '成本超标与结构风险', percentage: 20, colorClass: 'bg-[#FFD074]' },
        { id: 'reason4', name: '客户侧审核未通过', percentage: 20, colorClass: 'bg-[#38E662]' },
      ]
    },
    categoryData: {
      title: "品类产出占比",
      summary: "陈列物料与金属冰箱贴合计占比超 40%，同时今年立体摆件占比显著提升。",
      items: [
        { id: 'cat1', name: '金属冰箱贴', percentage: 17.9, colorClass: 'bg-[#FF90E8]' },
        { id: 'cat2', name: '拼装翻页万年历', percentage: 7.7, colorClass: 'bg-[#26D0CE]' },
        { id: 'cat3', name: '立体摆件', percentage: 9.0, colorClass: 'bg-[#FFD074]' },
        { id: 'cat4', name: '毛绒系列', percentage: 5.1, colorClass: 'bg-[#38E662]' },
        { id: 'cat5', name: '陈列与定制展架物料', percentage: 24.4, colorClass: 'bg-[#FF90E8]' },
        { id: 'cat6', name: '轻量金属周边（挂件/钥匙扣/书签/开瓶器）', percentage: 14.1, colorClass: 'bg-[#26D0CE]' },
        { id: 'cat7', name: '非金属/特种材质冰箱贴（木质/玻璃/纸本/NFC）', percentage: 10.3, colorClass: 'bg-[#FFD074]' },
        { id: 'cat8', name: '亚克力轻小周边', percentage: 3.8, colorClass: 'bg-[#38E662]' },
        { id: 'cat9', name: '其他综合补充类（零星项）', percentage: 7.7, colorClass: 'bg-[#FF90E8]' },
      ]
    }
  },
  analysis: {
    sections: [
      {
        id: 'product-analysis',
        title: "过程分析",
        themeColor: "bg-purple-500",
        items: [
          { 
            id: 2, 
            title: '松阳木塔树脂冰箱贴', 
            iconName: 'FileText', 
            colorClass: 'text-purple-400 bg-purple-500/20',
            modalContent: {
              comparisons: [
                {
                  beforeImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.1.png",
                  afterImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.2.png",
                  text: "【前】第一版建筑过于考虑简化，缺失原有建筑的特点。\n【后】优化后提升了结构细节，对建筑进一步还原。"
                },
                {
                  beforeImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.3.png",
                  afterImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.4.png",
                  text: "【前】结构较薄，容易产生断裂\n【后】调整了屋檐的厚度。"
                },
                {
                  beforeImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/tmp9269.png",
                  afterImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/tmpA71B.png",
                  text: "对比第一版和最终版就可以看到结构和细节的变化"
                }
              ],
              designProcess: [
                {
                  text: "多方搜集对应建筑的资料，确保基本形态不会出差错。",
                  image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190402720.png"
                },
                {
                  text: "3D建模与简化\n进行简化建模，验证各部件的受力点与连接处的厚度，确保结构不会在脱模时断裂。",
                  image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.1.png"
                },
                {
                  text: "简化的同时也要兼顾建筑还原度。",
                  image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.2.png"
                },
                {
                  text: "确认不同视角的比例与厚度，避免结构失衡。",
                  image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.3.png"
                },
                {
                  text: "优化建筑结构添加建筑细节，使建筑更还原",
                  image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/4.4.png"
                }
              ],
              summary: "建筑树脂设计过程中要注意简化，简化的同时不能太过偏离原形态，同时要注意细节的保留。"
            }
          },
          { 
            id: 1, 
            title: '梧桐树结构尝试', 
            iconName: 'FileText', 
            colorClass: 'text-purple-400 bg-purple-500/20',
            modalContent: {
              comparisons: [
                {
                  beforeImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513191622636.png",
                  afterImage: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513191719881.png",
                  text: "【前】树型较散宽。\n【后】调整了整体的比例与朝向"
                }
              ],
              designProcess: [
                { text: "1. 初步建模", image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513191622636.png" },
                { text: "2. 调整叶片数量", image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513191944089.png" },
                { text: "3. 平面绘制草图调整方向", image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192023680.png"  },
                { text: "4. 重新建模" , image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192119365.png"},
                { text: "5. 叶片调优" , image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192216414.png"},
                { text: "6. 优化形态与测试结构稳定性" , image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192242543.png"}
              ],
              summary: "可以先用平面图概括出建模的对象的形态走向，可以更精准的建模，方便后期优化调试"
            }
          }
        ]
      },
      {
        id: 'structure-research',
        title: "结构研究",
        themeColor: "bg-pink-500",
        contentBlocks: [
          {
            title: "1. 木质发光冰箱贴结构研究",
            text: "更换第一版的灯串结构对应调整，为了灯光均匀排布需要优化木片结构卡点\n\n测试了不同结构下的组装简易度，调整结构位置。\n测试不同亚克力片厚度对透光的影响。\n测试不同灯串的发光效率",
            image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260512195029136.jpg"
          },
          {
            title: "2. 场景化展架尝试",
            text: "相对于固定的展架，优化场景化设计\n\n通过场景的搭建，优化展架氛围，丰富空间层次感，使产品更加精致。",
            image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513183326599.png"
          }
        ]
      },
      // 新增：拼装展示模块
      {
        id: 'assembly-display',
        title: "拼装展示",
        themeColor: "bg-[#26D0CE]",
        carouselImages: [
          "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/untitled.91.png",
          "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/untitled.135.png",
          "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/untitled.145.png",
          "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/untitled.160.png",
          "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/untitled.169.png",
          "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E7%A2%A7%E5%B1%B1%E4%B9%A6%E5%B1%80%E4%B8%87%E5%B9%B4%E5%8E%86%E6%B8%B2%E6%9F%93.139.png",
          "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/%E6%95%88%E6%9E%9C%E5%9B%BE.png"
        ]
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
      // 新增：SOP 专属长图链接，用于在标题旁边点击按钮时弹出
      longImageSrc: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513181405034.jpg", 
      images: [
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190634825.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190640671.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190644062.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190650236.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190655207.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190640671.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190644062.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190650236.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190655207.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190659039.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190718171.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190720063.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190721547.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190723014.jpg",
        "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511190724711.jpg"
      ]
    },
    plugins: {
      title: "设计沉淀",
      items: [
        { 
          id: 1, 
          name: '设计插件', 
          tag: '提效',
          details: [
            {
              text: "1. 插件整理分享\n整理了一些设计提效插件与工具，测试后不定时在组内分析使用经验。",
              image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260512192222734.png"
            },
            {
              text: "2. 动态效果演示\n不同的插件工具能够优化设计流程，将原本五步流程压缩到两步，避免长流程的出错卡顿",
              video: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260511191348927.mp4"
            }
          ]
        },
        { 
          id: 2, 
          name: '文件整理', 
          tag: '梳理',
          details: [
            { text: "1. 文件夹层级管理\n重新梳理了文件夹的结构，使文件路径更加清晰明了", image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260512190814498.png" },
            { text: "2. 建立模板文件，固定标准流程，节省不必要的重复工作，优化工作链路。", image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260512191147741.png" }
          ]
        },
        { 
          id: 3, 
          name: 'AI 辅助', 
          tag: 'AI',
          details: [
            { text: "1. 尝试不同的ai工具，辅助设计效果优化", image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260512193114008.png" },
            { text: "2. 辅助审查机制，减少错误频率", image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260512193347890.png" }
          ]
        },
        { 
          id: 4, 
          name: '日程管理', 
          tag: '管理' ,
          details: [
            { 
              text: "1. 工作项目管理\n重新梳理了项目的结构，使工作进度更加清晰明了", 
              image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192857410.png" 
            },
            { 
              text: "2. 建立不同视图，快速查看各进度的项目状态，避免遗漏。", 
              image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192915073.png" 
            },
            { 
              image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192900912.png" 
            },
            { 
              image: "https://mujiasuotuchuang1-1422708709.cos.ap-shanghai.myqcloud.com/20260513192859440.png" 
            }
          ]
        }
      ]
    }
  }
};

// ==========================================
// 2. 视图结构层 (Components) - 全新波普/新粗野主义风 (Neo-Brutalism)
// ==========================================

const iconMap = { Home, Layers, BarChart3, FileText, ImageIcon };

// 独立的对比图滑块组件
const ComparisonSlider = ({ beforeImage, afterImage, text }) => {
  const [sliderPos, setSliderPos] = useState(50);
  
  return (
    <div className="mb-10 last:mb-0">
      <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border-[4px] border-black shadow-[6px_6px_0_0_#000] mb-4 bg-white cursor-ew-resize">
        <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-contain pointer-events-none p-2 md:p-4 bg-white" />
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-full h-full object-contain pointer-events-none p-2 md:p-4 bg-white" 
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} 
        />
        
        <div className="absolute top-0 bottom-0 w-1.5 bg-black pointer-events-none" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#FFD074] border-[3px] border-black rounded-full flex items-center justify-center shadow-[0_0_0_4px_rgba(255,255,255,0.8)]">
            <div className="flex gap-1.5">
              <div className="w-1 h-4 bg-black rounded-full"></div>
              <div className="w-1 h-4 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
        
        <input 
          type="range" 
          min="0" max="100" 
          value={sliderPos} 
          onChange={(e) => setSliderPos(e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10 m-0"
        />
        
        <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs font-black rounded-xl border-[3px] border-black pointer-events-none shadow-[2px_2px_0_0_#000] -rotate-2 z-20">
          BEFORE
        </div>
        <div className="absolute top-4 right-4 bg-[#FF90E8] text-black px-3 py-1 text-xs font-black rounded-xl border-[3px] border-black pointer-events-none shadow-[2px_2px_0_0_#000] rotate-2 z-20">
          AFTER
        </div>
      </div>
      
      {text && (
        <div className="bg-[#f4f1ea] border-[3px] border-black p-4 rounded-2xl text-black font-bold whitespace-pre-line leading-relaxed shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)]">
          {text}
        </div>
      )}
    </div>
  );
};

// 新增：带自动滚动和底部滚轴的分析页轮播组件
const AnalysisCarousel = ({ images, setPreviewImage }) => {
  const carouselRef = React.useRef(null);
  const [isHovering, setIsHovering] = React.useState(false);
  // 新增：使用 Ref 来高精度记录真实的滚动浮点数值，避免浏览器强制取整导致滚动卡死
  const exactScrollLeft = React.useRef(0);

  // JavaScript 慢速自动滚动逻辑
  React.useEffect(() => {
    let animationId;
    const scroll = () => {
      if (carouselRef.current && !isHovering) {
        // 设置一个大于 1 的滚动速度
        exactScrollLeft.current += 1.2; 
        carouselRef.current.scrollLeft = exactScrollLeft.current;
        
        // 当滚动到一半（因为图片数组我们复制了一份）时，无缝重置回起点
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          exactScrollLeft.current = 0;
          carouselRef.current.scrollLeft = 0;
        }
      } else if (carouselRef.current && isHovering) {
        // 如果处于悬停状态（用户可能正在手动拖拽滚轴），实时同步真实的滚动距离
        // 这样鼠标离开恢复自动滚动时，就不会发生闪回
        exactScrollLeft.current = carouselRef.current.scrollLeft;
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovering]);

  return (
    <div className="bg-white border-[4px] border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_#000] group hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#000] transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="bg-[#38E662] text-black px-3 py-1 border-[3px] border-black rounded-xl text-xs md:text-sm font-black shadow-[3px_3px_0_0_#000] -rotate-2">
           悬停暂停 / 拖动滚轴
        </div>
        <div className="text-xs md:text-sm font-black text-black/50 bg-[#f4f1ea] px-3 py-1 border-2 border-black rounded-lg">
           点击图片查看大图
        </div>
      </div>
      
      {/* 滚动容器：去除了 snap-x 强制对齐，让 JS 的自动滑动如丝般顺滑 */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
        className="flex overflow-x-auto custom-scrollbar gap-6 pb-6 w-full"
      >
        {/* 将数组复制一份 [...images, ...images] 以实现无缝轮播 */}
        {[...images, ...images].map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`拼装展示 ${idx}`}
            onClick={() => setPreviewImage(img)}
            // 去除了 snap-center
            className="h-64 md:h-80 w-auto min-w-[280px] object-cover border-[3px] border-black rounded-xl shadow-[4px_4px_0_0_#000] cursor-pointer hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000] transition-all shrink-0 bg-[#f4f1ea]"
          />
        ))}
      </div>
    </div>
  );
};

// 新增：波普风思维导图递归组件
const MindMapNode = ({ node, setPreviewImage }) => {
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div className="flex items-center">
      {/* 当前节点卡片 */}
      <div className={`relative z-10 shrink-0 border-[4px] border-black rounded-2xl p-4 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all flex flex-col items-center justify-center ${node.colorClass || 'bg-white'}`}>
        <span className="font-black text-lg px-2 whitespace-nowrap">{node.name}</span>
        {node.image && (
          <div 
            className="mt-4 w-32 h-24 md:w-40 md:h-28 border-[3px] border-black rounded-xl overflow-hidden cursor-pointer group/img bg-white relative"
            onClick={() => setPreviewImage(node.image)}
          >
            <img src={node.image} alt={node.name} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
              <span className="bg-black text-white text-xs font-black px-2 py-1 rounded border-2 border-white opacity-0 group-hover/img:opacity-100 transition-opacity transform scale-90 group-hover/img:scale-100">放大</span>
            </div>
          </div>
        )}
      </div>
      
      {/* 子节点连接区 */}
      {hasChildren && (
        <div className="flex items-stretch">
          {/* 父节点引出的横向主线 */}
          <div className="w-6 md:w-10 h-[4px] bg-black self-center"></div>
          
          {/* 子节点列表容器 */}
          <div className="flex flex-col justify-center relative">
            {node.children.map((child, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === node.children.length - 1;
              const isOnly = node.children.length === 1;
              
              return (
                <div key={idx} className="flex items-center relative py-3 md:py-4">
                  {/* 动态计算垂直分叉线的高度，使其精准衔接上下节点 */}
                  {!isOnly && (
                    <div 
                      className="absolute left-0 w-[4px] bg-black"
                      style={{
                        top: isFirst ? 'calc(50% - 2px)' : '0',
                        bottom: isLast ? 'calc(50% - 2px)' : '0'
                      }}
                    ></div>
                  )}
                  
                  {/* 从垂直线引向每个子节点的横向次线 */}
                  <div className="w-6 md:w-10 h-[4px] bg-black"></div>
                  
                  {/* 递归渲染子节点 */}
                  <MindMapNode node={child} setPreviewImage={setPreviewImage} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const NavBar = ({ activeTab, setActiveTab }: any) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#FFD074] border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0 md:h-16 gap-3 md:gap-0">
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-black tracking-wider text-black text-xl uppercase">
              {siteData.global.logoText}
            </span>
          </div>
          
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <div className="flex items-center space-x-2 md:space-x-3 min-w-max px-1">
              {siteData.global.tabs.map((tab) => {
                const IconComponent = iconMap[tab.iconName];
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 md:px-5 md:py-2 rounded-xl text-sm font-black transition-all duration-200 flex items-center gap-1.5 md:gap-2 border-[3px] border-black shrink-0
                      ${isActive 
                        ? 'bg-black text-white shadow-[0_0_0_0_#000] translate-y-1 translate-x-1' 
                        : 'bg-white text-black shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_0_#000]'}`}
                  >
                    {IconComponent && <IconComponent size={16} className="md:w-[18px] md:h-[18px]" strokeWidth={isActive ? 3 : 2.5} />}
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
  const [selectedNotes, setSelectedNotes] = useState(null);

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
              className={`group relative flex flex-col ${viewMode === 'list' ? 'md:flex-row items-center p-3' : ''} bg-white border-[4px] border-black shadow-[8px_8px_0_0_#000] rounded-2xl overflow-hidden transition-transform duration-300 ${rotateClass} hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#000]`}
            >
              <div 
                className={`${viewMode === 'list' ? 'w-32 h-24 md:w-56 md:h-36 shrink-0 border-[3px] border-black rounded-xl' : 'w-full aspect-[4/3] border-b-[4px] border-black'} overflow-hidden bg-white flex items-center justify-center relative cursor-pointer group-hover:opacity-90 transition-opacity`}
                onClick={() => setSelectedImage(project.img)}
              >
                <img 
                  src={project.img} 
                  alt={project.name}
                  className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-500 group-hover:scale-110"
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

              {project.notes && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedNotes({ title: project.name, content: project.notes });
                  }}
                  className="absolute bottom-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-[#FFD074] border-[3px] border-black rounded-full flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:shadow-[5px_5px_0_0_#000] hover:bg-[#FF90E8] transition-all z-[50] group/star cursor-pointer"
                  title="注意事项"
                >
                  <Star size={20} className="pointer-events-none md:w-6 md:h-6 text-white group-hover/star:text-black group-hover/star:rotate-[72deg] transition-all duration-300" fill="currentColor" stroke="black" strokeWidth={2.5} />
                </button>
              )}
            </div>
          )
        })}
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-32 text-center text-black font-black text-2xl border-[4px] border-black border-dashed rounded-3xl bg-white shadow-[8px_8px_0_0_#000]">
            {siteData.portfolio.emptyMessage}
          </div>
        )}
      </div>

      {siteData.portfolio.summaries[activeFilter] && (
        <div className="mt-12 bg-[#26D0CE] border-[4px] border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_#000] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] transition-all">
          <div className="absolute -right-4 -bottom-4 text-black opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
             <FileText size={180} strokeWidth={2} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-black text-black mb-4 flex items-center gap-3 relative z-10">
            <span className="bg-black text-white px-3 py-1 border-[3px] border-black rounded-xl text-lg shadow-[4px_4px_0_0_#FF90E8] -rotate-2">
              Focus
            </span>
            {activeFilter === '全部' ? '年度总盘总结' : `【${activeFilter}】模块复盘总结`}
          </h3>
          
          <div className="text-black font-bold leading-relaxed text-base md:text-lg relative z-10 bg-white/80 p-5 border-[3px] border-black rounded-2xl shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)]">
            {siteData.portfolio.summaries[activeFilter]}
          </div>
        </div>
      )}

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

      {selectedNotes && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setSelectedNotes(null)}
        >
          <div 
            className="bg-white border-[4px] border-black shadow-[16px_16px_0_0_#FFD074] rounded-3xl p-8 max-w-lg w-full relative transform -rotate-1"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedNotes(null)}
              className="absolute -top-5 -right-5 md:-top-6 md:-right-6 w-12 h-12 md:w-14 md:h-14 bg-[#FF90E8] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[4px_4px_0_0_#000] z-10"
            >
              <X size={28} strokeWidth={3} className="text-black" />
            </button>
            <div className="flex items-center gap-3 mb-6 border-b-[4px] border-black pb-4">
              <Star size={36} fill="#FFD074" stroke="black" strokeWidth={2.5} className="shrink-0 rotate-12" />
              <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">{selectedNotes.title}<br/>注意事项</h3>
            </div>
            <div className="text-black font-bold space-y-3 whitespace-pre-line text-base md:text-lg leading-relaxed bg-[#f4f1ea] p-4 border-[3px] border-black rounded-xl shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)]">
              {selectedNotes.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DataView = () => {
  const { title, legend, yAxisMax, yAxisLabels, chartData, trendSummary, proportionData, anomalyData, categoryData } = siteData.data;
  
  const [sortBy, setSortBy] = useState(null);

  const sortedData = sortBy ? [...chartData].sort((a, b) => b[sortBy] - a[sortBy]) : chartData;

  const maxCategoryPercentage = Math.max(...categoryData.items.map(item => item.percentage));

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

      <div className="mt-8 bg-[#f4f1ea] border-[4px] border-black p-5 rounded-2xl shadow-[6px_6px_0_0_#000] relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className="flex items-start gap-4 relative z-10">
          <div className="bg-[#38E662] text-black px-3 py-1.5 border-[3px] border-black rounded-xl text-sm font-black shadow-[3px_3px_0_0_#000] shrink-0 -rotate-2 group-hover:rotate-6 transition-transform">
            Focus
          </div>
          <p className="text-black font-bold text-base md:text-lg leading-relaxed pt-1">
            {trendSummary}
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight inline-block px-6 py-3 bg-[#FF90E8] border-[4px] border-black shadow-[6px_6px_0_0_#000] -rotate-2 mb-12">
          {categoryData.title}
        </h2>
        
        <div className="bg-white p-8 border-[4px] border-black rounded-3xl shadow-[10px_10px_0_0_#000]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.items.map((item, idx) => {
              const rotateClass = idx % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1';
              return (
                <div key={item.id} className={`border-[4px] border-black rounded-2xl p-6 bg-[#f4f1ea] shadow-[6px_6px_0_0_#000] hover:-translate-y-2 hover:shadow-[10px_10px_0_0_#000] transition-all flex flex-col justify-between group cursor-default ${rotateClass}`}>
                  <h3 className="text-lg md:text-xl font-black text-black leading-snug mb-8">{item.name}</h3>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-black font-bold uppercase tracking-widest text-xs">占比</span>
                      <span className="text-3xl font-black text-black">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-6 border-[4px] border-black rounded-full overflow-hidden bg-white shadow-[inset_2px_2px_0_rgba(0,0,0,0.1)] relative">
                      <div
                        className={`absolute left-0 top-0 bottom-0 ${item.colorClass} border-r-[4px] border-black group-hover:brightness-110 transition-all duration-1000 ease-out`}
                        style={{ width: `${(item.percentage / maxCategoryPercentage) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="mt-8 bg-[#f4f1ea] border-[4px] border-black p-5 rounded-2xl shadow-[6px_6px_0_0_#000] relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-[#FF90E8] text-black px-3 py-1.5 border-[3px] border-black rounded-xl text-sm font-black shadow-[3px_3px_0_0_#000] shrink-0 -rotate-2 group-hover:rotate-6 transition-transform">
              Focus
            </div>
            <p className="text-black font-bold text-base md:text-lg leading-relaxed pt-1">
              {categoryData.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight inline-block px-6 py-3 bg-[#26D0CE] border-[4px] border-black shadow-[6px_6px_0_0_#000] rotate-1 mb-12">
          {anomalyData.title}
        </h2>
        
        <div className="bg-white p-8 border-[4px] border-black rounded-3xl shadow-[10px_10px_0_0_#000]">
          <div className="w-full h-10 md:h-12 flex border-[4px] border-black rounded-xl overflow-hidden shadow-[4px_4px_0_0_#000] mb-10">
            {anomalyData.items.map((item, idx) => (
              <div 
                key={item.id} 
                className={`h-full ${item.colorClass} flex items-center justify-center group relative hover:brightness-110 transition-all ${idx !== anomalyData.items.length - 1 ? 'border-r-[4px] border-black' : ''}`}
                style={{ width: `${item.percentage}%` }}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-black text-black text-sm drop-shadow-md cursor-default select-none">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {anomalyData.items.map((item, idx) => (
              <div key={item.id} className="border-[4px] border-black rounded-2xl p-6 bg-white shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 shrink-0 ${item.colorClass} border-[3px] border-black rounded-full flex items-center justify-center shadow-[inset_2px_2px_0_rgba(255,255,255,0.5)] group-hover:rotate-[24deg] transition-transform duration-300`}>
                    <span className="font-black text-black text-lg">{idx + 1}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-black leading-snug">{item.name}</h3>
                </div>
                <div className="text-3xl md:text-4xl font-black text-black border-l-[4px] border-black pl-5 ml-4 group-hover:scale-110 transition-transform origin-right">
                  {item.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 bg-[#f4f1ea] border-[4px] border-black p-5 rounded-2xl shadow-[6px_6px_0_0_#000] relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-[#26D0CE] text-black px-3 py-1.5 border-[3px] border-black rounded-xl text-sm font-black shadow-[3px_3px_0_0_#000] shrink-0 -rotate-2 group-hover:rotate-6 transition-transform">
              Focus
            </div>
            <p className="text-black font-bold text-base md:text-lg leading-relaxed pt-1">
              {anomalyData.summary}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-20">
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight inline-block px-6 py-3 bg-[#FFD074] border-[4px] border-black shadow-[6px_6px_0_0_#000] -rotate-1 mb-12">
          {proportionData.title}
        </h2>
        
        <div className="bg-white p-8 border-[4px] border-black rounded-3xl shadow-[10px_10px_0_0_#000]">
          <div className="w-full h-16 md:h-24 flex border-[4px] border-black rounded-2xl overflow-hidden shadow-[6px_6px_0_0_#000] mb-10">
            {proportionData.items.map((item, idx) => (
              <div 
                key={item.id} 
                className={`h-full ${item.colorClass} flex items-center justify-center group relative ${idx !== proportionData.items.length - 1 ? 'border-r-[4px] border-black' : ''}`}
                style={{ width: `${item.percentage}%` }}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-black text-black text-lg md:text-2xl drop-shadow-md cursor-default select-none">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {proportionData.items.map(item => (
              <div key={item.id} className="border-[4px] border-black rounded-2xl p-6 bg-[#f4f1ea] shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all relative overflow-hidden group cursor-default">
                <div className={`absolute top-0 right-0 w-16 h-16 ${item.colorClass} border-b-[4px] border-l-[4px] border-black rounded-bl-3xl translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300`}></div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-5 h-5 ${item.colorClass} border-[3px] border-black rounded-md shadow-[2px_2px_0_0_#000]`}></div>
                  <h3 className="text-xl font-black text-black relative z-10">{item.name}</h3>
                </div>
                
                <div className="flex items-end gap-2 mb-1 relative z-10">
                  <span className="text-4xl font-black text-black leading-none">{item.percentage}</span>
                  <span className="text-xl font-black text-black pb-1">%</span>
                </div>
                <p className="text-sm font-bold text-black/60 uppercase tracking-widest relative z-10">计约 {item.count} 款</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 bg-[#f4f1ea] border-[4px] border-black p-5 rounded-2xl shadow-[6px_6px_0_0_#000] relative overflow-hidden group hover:-translate-y-1 transition-all">
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-[#FFD074] text-black px-3 py-1.5 border-[3px] border-black rounded-xl text-sm font-black shadow-[3px_3px_0_0_#000] shrink-0 -rotate-2 group-hover:rotate-6 transition-transform">
              Focus
            </div>
            <p className="text-black font-bold text-base md:text-lg leading-relaxed pt-1">
              {proportionData.summary}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

const AnalysisView = () => {
  const { sections } = siteData.analysis;
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // 新增：用于结构研究和拼装展示的大图预览状态
  
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
          
          {/* 渲染产品分析等网格卡片 */}
          {section.items && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {section.items.map((item, index) => {
                const ItemIcon = iconMap[item.iconName];
                return (
                  <div 
                    key={item.id} 
                    onClick={() => {
                      if (item.modalContent) {
                        setSelectedAnalysis(item);
                      }
                    }}
                    className={`group bg-white border-[4px] border-black p-8 rounded-3xl shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#000] transition-all ${item.modalContent ? 'cursor-pointer' : ''}`}
                  >
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
                    {item.modalContent && (
                      <div className="mt-6 flex items-center justify-end text-sm font-black text-black opacity-0 group-hover:opacity-100 transition-opacity">
                        查看分析详情 <ArrowRight size={16} className="ml-1" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* === 新增：渲染结构研究等图文穿插块 === */}
          {section.contentBlocks && (
            <div className="space-y-12">
              {section.contentBlocks.map((block, idx) => (
                <div key={idx} className={`bg-white border-[4px] border-black p-6 md:p-8 rounded-3xl shadow-[8px_8px_0_0_#000] flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center group/card hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#000] transition-all`}>
                  <div className="flex-1 w-full space-y-6">
                    <h3 className={`text-2xl md:text-3xl font-black text-black inline-block px-4 py-2 border-[4px] border-black rounded-xl shadow-[4px_4px_0_0_#000] ${idx % 2 === 0 ? 'bg-[#FFD074] -rotate-1' : 'bg-[#FF90E8] rotate-1'}`}>
                      {block.title}
                    </h3>
                    <p className="text-black font-bold whitespace-pre-line leading-relaxed text-base md:text-lg bg-[#f4f1ea] p-5 border-[3px] border-black rounded-2xl shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)]">
                      {block.text}
                    </p>
                  </div>
                  {block.image && (
                    <div className="flex-1 w-full">
                      <div 
                        className="relative group/img cursor-pointer overflow-hidden border-[4px] border-black rounded-2xl shadow-[6px_6px_0_0_#000] bg-white"
                        onClick={() => setPreviewImage(block.image)}
                      >
                        <img src={block.image} alt={block.title} className="w-full h-auto max-h-80 object-cover transition-transform duration-500 group-hover/img:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="bg-black text-white text-sm font-black px-4 py-2 rounded-xl border-2 border-white opacity-0 group-hover/img:opacity-100 transition-opacity transform scale-90 group-hover/img:scale-100 shadow-[4px_4px_0_0_#fff]">点击放大</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 如果配置了 carouselImages，则渲染拼装展示的自动滚动组件 */}
          {section.carouselImages && (
            <AnalysisCarousel images={section.carouselImages} setPreviewImage={setPreviewImage} />
          )}

          {/* 新增：如果配置了 mindMap，则渲染思维导图组件 */}
          {section.mindMap && (
            <div className="bg-[#f4f1ea] border-[4px] border-black p-6 md:p-12 rounded-3xl shadow-[8px_8px_0_0_#000] overflow-x-auto custom-scrollbar group hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#000] transition-all">
              <div className="min-w-max py-4 pr-8">
                 <MindMapNode node={section.mindMap} setPreviewImage={setPreviewImage} />
              </div>
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

      {selectedAnalysis && selectedAnalysis.modalContent && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setSelectedAnalysis(null)}
        >
          <div 
            className="bg-white border-[4px] border-black shadow-[16px_16px_0_0_#A855F7] rounded-3xl p-6 md:p-10 max-w-4xl w-full relative transform rotate-1 max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedAnalysis(null)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 md:w-14 md:h-14 bg-[#38E662] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[4px_4px_0_0_#000] z-10"
            >
              <X size={28} strokeWidth={3} className="text-black" />
            </button>
            
            <div className="flex items-center gap-4 mb-8 border-b-[4px] border-black pb-4">
              <div className="w-12 h-12 bg-purple-400 border-[3px] border-black rounded-2xl flex items-center justify-center text-black shadow-[4px_4px_0_0_#000] -rotate-6">
                <FileText size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-black leading-tight uppercase">{selectedAnalysis.title}</h3>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="inline-block bg-[#FFD074] border-[3px] border-black px-3 py-1 text-black font-black text-lg mb-5 shadow-[2px_2px_0_0_#000] -rotate-1">前后对比</h4>
                
                {selectedAnalysis.modalContent.comparisons && selectedAnalysis.modalContent.comparisons.map((comp, idx) => (
                  <ComparisonSlider 
                    key={idx} 
                    beforeImage={comp.beforeImage} 
                    afterImage={comp.afterImage} 
                    text={comp.text} 
                  />
                ))}
              </div>
              
              <div>
                <h4 className="inline-block bg-[#26D0CE] border-[3px] border-black px-3 py-1 text-black font-black text-lg mb-4 shadow-[2px_2px_0_0_#000] rotate-1">设计流程</h4>
                <div className="space-y-4">
                  {Array.isArray(selectedAnalysis.modalContent.designProcess) ? (
                    selectedAnalysis.modalContent.designProcess.map((step, idx) => (
                      <div key={idx} className={`bg-[#f4f1ea] border-[3px] border-black p-4 rounded-2xl shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)] flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}>
                        <div className="flex-1 text-black font-bold whitespace-pre-line leading-relaxed w-full">
                          {step.text}
                        </div>
                        {step.image && (
                          <div className="flex-1 w-full">
                            <img 
                              src={step.image} 
                              alt={`流程图 ${idx + 1}`} 
                              // 新增点击放大功能及悬浮交互样式
                              onClick={() => setPreviewImage(step.image)}
                              className="w-full h-auto max-h-48 object-contain border-[3px] border-black rounded-xl bg-white shadow-[4px_4px_0_0_#000] cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#f4f1ea] border-[3px] border-black p-4 rounded-2xl shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1 text-black font-bold whitespace-pre-line leading-relaxed w-full">
                        {selectedAnalysis.modalContent.designProcess}
                      </div>
                      {selectedAnalysis.modalContent.designProcessImage && (
                        <div className="flex-1 w-full">
                          <img 
                            src={selectedAnalysis.modalContent.designProcessImage} 
                            alt="设计流程图" 
                            // 新增点击放大功能及悬浮交互样式
                            onClick={() => setPreviewImage(selectedAnalysis.modalContent.designProcessImage)}
                            className="w-full h-auto max-h-64 object-contain border-[3px] border-black rounded-xl bg-white shadow-[4px_4px_0_0_#000] cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="inline-block bg-[#FF90E8] border-[3px] border-black px-3 py-1 text-black font-black text-lg mb-3 shadow-[2px_2px_0_0_#000] -rotate-2">经验总结</h4>
                <div className="bg-[#f4f1ea] border-[3px] border-black p-4 rounded-2xl text-black font-bold whitespace-pre-line leading-relaxed shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)]">
                  {selectedAnalysis.modalContent.summary}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 新增：单图全屏查看模态框 (给结构研究和拼装展示使用) */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()} 
          >
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] object-contain border-[4px] border-black shadow-[16px_16px_0_0_#26D0CE] bg-white rounded-xl" 
            />
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-6 -right-2 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 bg-[#FFD074] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[6px_6px_0_0_#000] z-10"
            >
              <X size={32} strokeWidth={3} className="text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AssetsView = () => {
  const { banner, sop, plugins } = siteData.assets;
  
  const [showLongImage, setShowLongImage] = useState(false);
  // 新增：控制 SOP 专属长图弹窗的状态
  const [showSopLongImage, setShowSopLongImage] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedPlugin, setSelectedPlugin] = useState(null);

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
        <section className="bg-white border-[4px] border-black rounded-3xl p-8 shadow-[8px_8px_0_0_#000] overflow-hidden">
          {/* 修改这里：将原本的标题改为 Flex 布局，并加上查看长图按钮 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b-[4px] border-black pb-2">
            <h2 className="text-3xl font-black text-black tracking-tight">{sop.title}</h2>
            {sop.longImageSrc && (
              <button 
                onClick={() => setShowSopLongImage(true)}
                className="group flex items-center gap-2 px-3 py-1.5 bg-[#26D0CE] border-[3px] border-black rounded-xl text-black font-black text-sm shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] transition-all"
              >
                <ImageIcon size={16} strokeWidth={2.5} />
                <span>长图版本</span>
                <ArrowRight size={14} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" strokeWidth={3} />
              </button>
            )}
          </div>
          
          <div className="relative w-full border-[4px] border-black rounded-xl overflow-hidden bg-[#f4f1ea] shadow-[inset_4px_4px_0_rgba(0,0,0,0.1)] py-4">
            <div className="absolute top-2 right-2 bg-black text-white text-xs font-black px-3 py-1 border-2 border-white rounded shadow-[2px_2px_0_0_#fff] z-10 pointer-events-none">
              悬停暂停 / 点击放大
            </div>
            
            <div className="animate-marquee gap-6 px-4">
               {[...sop.images, ...sop.images].map((img, idx) => (
                 <img 
                   key={idx} 
                   src={img} 
                   alt={`SOP Page ${idx}`} 
                   onClick={() => setPreviewImage(img)}
                   className="h-64 md:h-80 w-auto object-cover border-[3px] border-black rounded-xl shadow-[6px_6px_0_0_#000] cursor-pointer hover:-translate-y-2 hover:shadow-[10px_10px_0_0_#000] transition-all shrink-0" 
                 />
               ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-black mb-10 tracking-tight bg-[#FF90E8] border-[4px] border-black px-6 py-3 inline-block rounded-2xl shadow-[6px_6px_0_0_#000] rotate-2">{plugins.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {plugins.items.map((plugin) => (
              <div 
                key={plugin.id} 
                onClick={() => {
                  if(plugin.details) setSelectedPlugin(plugin);
                }}
                className={`group border-[4px] border-black p-6 rounded-2xl bg-white shadow-[6px_6px_0_0_#000] hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[10px_10px_0_0_#000] transition-all flex flex-col justify-between min-h-[160px] ${plugin.details ? 'cursor-pointer' : 'cursor-default opacity-80'}`}
              >
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
                  {plugin.details && <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />}
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

      {/* 新增：SOP 专属长图全屏查看模态框 */}
      {showSopLongImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in zoom-in-95 duration-200 custom-scrollbar"
          onClick={() => setShowSopLongImage(false)}
        >
          <div className="min-h-screen py-12 px-4 md:px-20 flex justify-center">
            <div 
              className="relative w-full max-w-4xl"
              onClick={e => e.stopPropagation()} 
            >
              <button 
                onClick={() => setShowSopLongImage(false)}
                className="fixed top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-[#26D0CE] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[6px_6px_0_0_#000] z-50"
              >
                <X size={32} strokeWidth={3} className="text-black" />
              </button>
              <img 
                src={sop.longImageSrc} 
                alt="SOP 长图" 
                className="w-full h-auto border-[4px] border-black shadow-[16px_16px_0_0_#38E662] bg-white rounded-xl" 
              />
            </div>
          </div>
        </div>
      )}

      {/* SOP 单图全屏查看模态框 */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full h-full flex items-center justify-center"
            onClick={e => e.stopPropagation()} 
          >
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full max-h-[90vh] object-contain border-[4px] border-black shadow-[16px_16px_0_0_#26D0CE] bg-white rounded-xl" 
            />
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-6 -right-2 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 bg-[#FFD074] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[6px_6px_0_0_#000] z-10"
            >
              <X size={32} strokeWidth={3} className="text-black" />
            </button>
          </div>
        </div>
      )}

      {/* 插件详情弹窗 */}
      {selectedPlugin && selectedPlugin.details && (
        <div 
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setSelectedPlugin(null)}
        >
          <div 
            className="bg-white border-[4px] border-black shadow-[16px_16px_0_0_#FF90E8] rounded-3xl p-6 md:p-10 max-w-4xl w-full relative transform -rotate-1 max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPlugin(null)}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-12 h-12 md:w-14 md:h-14 bg-[#26D0CE] border-[4px] border-black rounded-full flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all shadow-[4px_4px_0_0_#000] z-10"
            >
              <X size={28} strokeWidth={3} className="text-black" />
            </button>
            
            <div className="flex items-center gap-4 mb-8 border-b-[4px] border-black pb-4">
              <div className="w-12 h-12 bg-black border-[3px] border-black rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0_0_#FFD074] rotate-6">
                <Layers size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-black leading-tight uppercase">{selectedPlugin.name}</h3>
            </div>

            <div className="space-y-6">
              {selectedPlugin.details.map((step, idx) => (
                <div key={idx} className={`bg-[#f4f1ea] border-[3px] border-black p-5 rounded-2xl shadow-[inset_4px_4px_0_rgba(0,0,0,0.05)] flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}>
                  <div className="flex-1 text-black font-bold whitespace-pre-line leading-relaxed w-full">
                    {step.text}
                  </div>
                  
                  {(step.video || step.image) && (
                    <div className="flex-1 w-full">
                      {step.video ? (
                        <video 
                          src={step.video} 
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-auto max-h-64 object-contain border-[3px] border-black rounded-xl bg-white shadow-[4px_4px_0_0_#000]"
                        />
                      ) : (
                        <img 
                          src={step.image} 
                          alt={`步骤 ${idx + 1}`} 
                          onClick={() => setPreviewImage(step.image)}
                          className="w-full h-auto max-h-64 object-contain border-[3px] border-black rounded-xl bg-white shadow-[4px_4px_0_0_#000] cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
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

      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: flex;
        width: max-content;
        animation: marquee 25s linear infinite;
      }
      .animate-marquee:hover {
        animation-play-state: paused;
      }
      
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

      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
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
        
        <FloatingQRCode />
      </div>
    </div>
  );
}
