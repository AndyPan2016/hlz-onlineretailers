/*
cryptos.js

@author yanjun
*/

import CryptoJS from '../aes'
import { Base64 } from 'js-base64'

var Cryptos = Cryptos || function() {
  var d = {};
  // 获取加密密码
  var getKey = function(secretKey) {
    return secretKey.slice(0, 16);
  };
  // 密码加密
  d.aesEncryt = function(word, secretKey) {
    secretKey = getKey(secretKey);
    var key = CryptoJS.enc.Utf8.parse(secretKey);//十六位十六进制数作为秘钥
    var iv = CryptoJS.enc.Utf8.parse(secretKey);//十六位十六进制数作为秘钥偏移量
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  };
  // 密码解密
  d.aesDecrypt = function(word, secretKey) {
    secretKey = getKey(secretKey);
    var key = CryptoJS.enc.Utf8.parse(secretKey);//十六位十六进制数作为秘钥
    var iv = CryptoJS.enc.Utf8.parse(secretKey);//十六位十六进制数作为秘钥偏移量
    var encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
  // 微信手机号解密
  d.wechatDecrypt = function(encryptedData, sessionKey, _iv) {
    var key = CryptoJS.enc.Base64.parse(sessionKey);
    var iv = CryptoJS.enc.Base64.parse(_iv);
    var srcs = encryptedData;
    var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let res = Base64.decode(CryptoJS.enc.Base64.stringify(decrypt));
    let s = 'purePhoneNumber';
    let index = res.indexOf(s);
    if (index === -1) {
      return '';
    }
    index += s.length + 3;
    let end = res.indexOf('"', index);
    return res.substring(index, end);
  }
  d.decryptData = function (params) {
    // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码  
    // var encryptedData = CryptoJS.enc.Base64.parse(params.encryptedData)
    var key = CryptoJS.enc.Base64.parse(params.sessionKey);
    var iv = CryptoJS.enc.Base64.parse(params.iv); 
    // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充  
    // var mode = new CryptoJS.mode.CBC(CryptoJS.pad.pkcs7);
    try {    
      // 解密
      // var decrypt = CryptoJS.AES.decrypt(params.encryptedData, key, {
      //   asBpytes: true, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
      // });

      // let res = Base64.decode(CryptoJS.enc.Base64.stringify(decrypt));
      var decrypt = CryptoJS.AES.decrypt(params.encryptedData, key, {      
        asBpytes: true,      
        iv: iv,      
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      let res = Base64.decode(CryptoJS.enc.Base64.stringify(decrypt));
      var decryptResult = JSON.parse(res);
    } catch (err) { 
      console.log(err)  
    }  
    if (decryptResult.watermark.appid !== params.appId) {    
      console.log('error')
    }  
    return decryptResult
  }
  return d;
}();

module.exports = Cryptos;