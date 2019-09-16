export const crypto = {
  data() {
    return {
      key: 'xuncexcxonemiyao'
    }
  },
  methods: {
    aesEncrypt(pas, key = this.key) {
      // 把Key转换为wordArray对象
      const Utf8Key = this.$CryptoJS.enc.Utf8.parse(key)
      /**
         * CipherOption, 加密的一些选项:
         *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
         *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
         *   iv: 偏移量, mode === ECB 时, 不需要 iv
         * 返回的是一个加密对象
         */
      const cipher = this.$CryptoJS.AES.encrypt(pas, Utf8Key, {
        mode: this.$CryptoJS.mode.ECB,
        padding: this.$CryptoJS.pad.Pkcs7,
        iv: ''
      });
      //  将加密后的数据转换成 Base64
      const base64Cipher = cipher.ciphertext.toString(this.$CryptoJS.enc.Base64);
      //  返回加密后的经过处理后的字符串
      return base64Cipher
    },
    aesDecrypt(pas, key = this.key) {
      const Utf8Key = this.$CryptoJS.enc.Utf8.parse(key)
      //  这里 mode, padding, iv 一定要跟加密的时候完全一样
      //  返回的是一个解密后的对象
      const decipher = this.$CryptoJS.AES.decrypt(pas, Utf8Key, {
        mode: this.$CryptoJS.mode.ECB,
        padding: this.$CryptoJS.pad.Pkcs7
      });
      //  将解密对象转换成 UTF8 的字符串
      const resultDecipher = this.$CryptoJS.enc.Utf8.stringify(decipher);
      //  返回解密结果
      return resultDecipher;
    }
  }
}