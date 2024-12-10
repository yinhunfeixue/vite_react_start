import UrlUtil from '@/utils/UrlUtil';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

/**
 * NavigateInit
 */
function NavigateInit() {
  const native = useNavigate();

  useEffect(() => {
    UrlUtil.native = native;
  }, []);
  return <Outlet />;
}
export default React.memo(NavigateInit);
