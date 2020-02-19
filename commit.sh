#!/usr/bin/env bash

echo `pwd`
echo '正在上传到github ~> git@github.com:Anxdada/AcmWeChatSystem.git'
echo ''
if [ $# -ge 2 ]; then
    git add .
    if [ $? -ne 0]; then
        echo 'add fail -:('
        exit 1
    fi
fi
msg=$1
if [ -n $msg ]; then
    echo "请至少输入commit信息!"
    exit 1
fi
git commit -m "${msg}"
if [ $? -ne 0 ]; then
    echo 'commit fail -:('
    exit 1
fi
git push origin
if [ $? -ne 0 ]; then
    echo 'push origin fail -:('
    exit 1
fi
echo '上传成功 ^ v ^ !'