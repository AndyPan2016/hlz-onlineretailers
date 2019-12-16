
# 加密解密

## 接口签名与延签使用方法

```js
const ASigner = require('../../framework/safety/signer.js');

var params = {}; // 待签名数据
var secretKey = // 密钥

// 签名
let sign = ASigner.sign(params, secretKey);

var responseData = {}; // 接口返回数据
var secretKey = // 密钥
var sign = // 服务端签名结果

// 验证签名
let isVerify = ASigner.verify(responseData, secretKey, sign);
```

## 密码加密解密使用方法

```js
const Cryptos = require('../../framework/safety/cryptos.js');

// 加密
let encryptedPassword = Cryptos.aesEncryt('密码', secretKey);

// 解密
let password = Cryptos.aesDecrypt(encryptedPassword, secretKey);
```