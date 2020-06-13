
/**
 * aaa_bbb_ccc字符串转换为驼峰
 * @param str aaa_bbb_ccc
 */
export const str2CamelCase = (str = '') => {
  const words = str.toLowerCase().split('_')
  return words.map((word, index) => {
    if (index > 0) {
      word = word.slice(0, 1).toUpperCase() + word.slice(1)
    }
    return word;
  }).join('')
}

/**
 * 驼峰转为aaa_bbb_ccc
 * @param str aaBbCc -> aa_bb_cc
 */
export const camelCase2Line = (str = '') => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
/**
 * 驼峰转为aaa_bbb_ccc
 * @param str aaBbCc -> aa_bb_cc
 */
export const camelCase2UpperCaseLine = (str = '') => {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase();
}
