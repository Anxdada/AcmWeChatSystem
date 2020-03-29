import cookie from 'react-cookies';

/**
 *
 *
 * @param {string} url
 * @param {number} 超时时间
 * @returns
 */
export default class Fetch {
    static requestPost(options,wait=3) {
        return new Promise((resolve, reject) => {
            let status = 0; // 0 等待 1 完成 2 超时
            let timer = setTimeout(() => {
                if (status === 0) {
                    status = 2;
                    timer = null;
                    reject("超时");
                }
            }, options.timeOut);

            // console.log(cookie.load('token'));

            fetch(options.url, {
                method: 'POST',
                headers: {
                    'Authorization': cookie.load('token'),
                    'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: options.info,
            }).then(res => res.json()).then(
                data => {
                    //console.log(data);
                    if (status !== 2) {
                        clearTimeout(timer);
                        resolve(data);
                        timer = null;
                        status = 1;
                    }
                }
            );
        });
    }

    static requestGet(options,wait=3) {
        return new Promise((resolve, reject) => {
            let status = 0; // 0 等待 1 完成 2 超时
            let timer = setTimeout(() => {
                if (status === 0) {
                    status = 2;
                    timer = null;
                    reject("超时");
                }
            }, options.timeOut);

            // console.log(cookie.load('token'));

            fetch(options.url, {
                method: 'GET',
                headers: {
                    'Authorization': cookie.load('token'),
                    'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
            }).then(res => res.json()).then(
                data => {
                    //console.log(data);
                    if (status !== 2) {
                        clearTimeout(timer);
                        resolve(data);
                        timer = null;
                        status = 1;
                    }
                }
            );
        });
    }
}

// request("/test").then(res => {
//         document.body.innerHTML =
//         typeof res !== "string" ? JSON.stringify(res) : res;
//     })
//     .catch(err => {
//       console.log("err", err);
//     });
  
  