import { MenuItemType } from "antd/lib/menu/hooks/useItems";
import { Role } from "../type";

export interface IMenu extends MenuItemType {
    roles: Role[],
    children?: IMenu[],
    component?: React.ComponentType<any>
}