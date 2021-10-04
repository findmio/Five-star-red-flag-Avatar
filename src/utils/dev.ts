const { NODE_ENV } = process.env;

/**
 * 判断是否为开发环境
 * @returns {Boolean} true | false
 */
export const isDev = NODE_ENV === 'development';