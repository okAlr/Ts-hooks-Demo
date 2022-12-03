import { BaseParams } from "../../type";
import { Moment } from 'moment';

// 活动管理列表
export interface IActivity {
    // 活动人数上限
    activityMax: number;
    //活动名称
    activityName: string;
    // 活动人数
    activityRegistered: number;
    // 活动开始时间
    activityStartDate: string;
    // 活动详情
    activytyDesc: string;
    // 活动结束时间
    activityEndDate: string;
    // 活动状态 0未开始 1进行中 2已结束
    activityStatus: string;
    // 地址
    address: string;
    // 主办方
    business: string;
    id: string;
    // 微信
    wx: string;
    // 活动封面
    activityImg: string;
    activityDate?: Moment[]
}



export interface IActivityParams extends BaseParams {
    activityStatus: string;
    activityName: string
}