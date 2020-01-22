// 封装一层

import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
    static ajax(options) {
        let baseUrl = "https://www.easy-mock.com/mock/5e1ae9057f109b0caa4d2e84/mockapi";
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseUrl: baseUrl,
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (response.status == '200') {
                    let res = response.data;
                    if (res.code == '0') {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        });
    }
}