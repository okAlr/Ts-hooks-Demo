import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import API from '../api'
import { UploadRequestOption } from 'rc-upload/lib/interface.d'
import { IProps } from './uploadImg.type';


const App: React.FC = (props: IProps) => {
    const [loading, setLoading] = useState(false);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // 调用COS上传图片的方法
    const httpRequest = (req: UploadRequestOption) => {
        setLoading(true);

        // 这里没有使用ts的原因是：

        const cos = new COS({
            // 后端向cos发送的请求拿到的数据
            // getAuthorization 必选参数
            getAuthorization: async (options: any, callback: any) => {
                // 获取 cos token
                const data: any = await API.getCosAutograph();
                const credentials = data.credentials;
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    SecurityToken: credentials.sessionToken,

                    // 避免返回服务器时间作为 签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    StartTime: data.startTime, // 时间戳，单位秒
                    ExpiredTime: data.expiredTime,// 时间戳，单位秒

                })
            }

        })

        // 创建一个独一无二的文件名
        const fileName = uuidv4();

        // cos 的桶操作
        cos.putObject({
            Bucket: "yn-1308768202", // 必须
            Region: "ap-beijing", // 存储桶所在地域，必须字段
            StorageClass: "STANDARD",
            Key: fileName, // 必须,
            Body: req.file // 上传文件对象
        },

            // 错误信息
            (err: any, data: any) => {
                setLoading(false);
                if (err) {
                    message.error(err);
                    return;
                }

                // 封装的是一个表单控件类型的 上传图片的组件
                // 希望可以直接在 form 中使用
                props.onChange && props.onChange("https://" + data.Location);
            }


        )
    }

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            customRequest={httpRequest}
        >
            {props.value ? <img src={props.value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    );
};

export default App;