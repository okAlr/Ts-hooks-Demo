import { useSelector } from "dva";
import { useState, useEffect } from "react";
import { IGlobalState } from "../model/type";
import { getMenus } from "./layout.config";
import { IMenu } from "./layout.type";

// 根据roles 来筛选菜单
export default function useLayout() {
    const [currentMenus, setCurrentMenus] = useState<IMenu[]>([]);
    const global = useSelector<{ global: IGlobalState }, IGlobalState>(({ global }) => global);

    //  获取当前菜单(树形结构使用递归)
    const getCurrentMenus = (menuArr = getMenus()) => {
        return menuArr.filter(item => {
            if (item.children) {
                item.children = getCurrentMenus(item.children);
            }
            return item.roles.some(val => global?.roles?.includes(val));
        })
    }

    useEffect(() => {
        setCurrentMenus(getCurrentMenus());
    }, [])

    return {
        currentMenus
    }
}