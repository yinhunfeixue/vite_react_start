import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * useUrlParam
 */
function useUrlParam<R extends Record<string, any>>(
  /**
   * 解析url参数的函数
   * @param name 参数名
   * @param value 参数值
   *
   * @return 返回解析后的值，如果返回undefined则使用原值
   */
  parse?: (name: string, value: any) => any,
): [
  /**
   * url参数
   */
  R,

  /**
   * 设置url参数
   */
  (value: Partial<R>) => void,

  /**
   * 清除url参数
   */
  () => void,
] {
  const [searchParam, setSearchParam] = useSearchParams();
  const urlParam = Object.fromEntries(searchParam) as R;
  if (parse) {
    for (const key in urlParam) {
      const value = urlParam[key];
      try {
        const paraseValue = parse(key, value);
        urlParam[key] = paraseValue === undefined ? value : paraseValue;
      } catch {}
    }
  }

  const [params, setParams] = useState<R>(urlParam);

  const clearUrlParams = () => {
    const newValue = Object.fromEntries(
      Object.keys(params).map((key) => [key, undefined]),
    ) as Partial<R>;
    setUrlParams(newValue);
  };

  const setUrlParams = (value: Partial<R>) => {
    const newValue = { ...params, ...value };
    setParams(newValue);
    const newSearchParams = new URLSearchParams();
    Object.entries(newValue).forEach(([key, val]) => {
      if (![undefined, null, ''].includes(val)) {
        newSearchParams.set(key, val);
      }
    });
    setSearchParam(newSearchParams);
  };

  return [params, setUrlParams, clearUrlParams];
}
export default useUrlParam;
