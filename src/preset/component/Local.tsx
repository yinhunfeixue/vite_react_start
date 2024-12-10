import { useEffect, useState } from 'react';
import { createIntl, IntlConfig, IntlProvider } from 'react-intl';
import LocalUtil from '../tools/LocalUtil';

interface ILocalProps extends Omit<IntlConfig, 'locale'> {
  defaultLocal: string;
  children: React.ReactNode;
  onChange?: (local: string) => void;
}
/**
 * Local
 */
function Local(props: ILocalProps) {
  const { children, onChange, defaultLocal, ...otherProps } = props;
  const [local, setLocal] = useState(defaultLocal);

  LocalUtil.intl = createIntl({ locale: local, messages: props.messages });

  useEffect(() => {
    LocalUtil.setLocal = (local) => {
      setLocal(local);
      onChange?.(local);
    };
  }, []);

  useEffect(() => {
    LocalUtil.intl = createIntl({ locale: local, messages: props.messages });
  }, [local]);

  return (
    <IntlProvider {...otherProps} locale={local}>
      {children}
    </IntlProvider>
  );
}
export default Local;
