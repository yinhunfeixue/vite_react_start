import UrlUtil from '@/utils/UrlUtil';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/**
 * NavigateInit
 */
function NavigateInit() {
  const native = useNavigate();

  const location = useLocation();

  useEffect(() => {
    UrlUtil.native = native;
    UrlUtil.location = location;
  }, [native, location]);
  return <Outlet />;
}
export default React.memo(NavigateInit);
