import React, { useCallback, useMemo } from 'react';
import { createIntl, IntlConfig, IntlProvider } from 'react-intl';
import LocaleUtil from '../tools/LocaleUtil';

interface ILocalProps extends Omit<IntlConfig, 'locale'> {
  locale: string;
  children: React.ReactNode;
  onChange?: (local: string) => void;
  i18nData: Record<string, any>;
}
/**
 * Local
 */
function Local(props: ILocalProps) {
  const { children, onChange, locale, i18nData, ...otherProps } = props;

  const messages = useMemo(() => i18nData[locale] || [], [locale, i18nData]);
  LocaleUtil.intl = useMemo(() => {
    return createIntl({ locale, messages });
  }, [locale, messages]);
  LocaleUtil.setLocale = useCallback(
    (locale) => {
      onChange?.(locale);
    },
    [onChange],
  );

  return (
    <IntlProvider {...otherProps} locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
export default React.memo(Local);
