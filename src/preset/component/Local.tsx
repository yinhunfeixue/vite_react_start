import { LanguageData } from '@/i18n';
import React, { useCallback, useEffect, useMemo } from 'react';
import { createIntl, IntlConfig, IntlProvider } from 'react-intl';
import LocaleUtil from '../tools/LocaleUtil';

interface ILocalProps extends Omit<IntlConfig, 'locale'> {
  locale: string;
  children: React.ReactNode;
  onChange?: (local: string) => void;
  i18nData: LanguageData;
}
/**
 * Local
 */
function Local(props: ILocalProps) {
  const { children, onChange, locale, i18nData, ...otherProps } = props;

  const messages = useMemo(() => i18nData[locale] || [], [locale, i18nData]);
  const intl = useMemo(() => {
    return createIntl({ locale, messages });
  }, [locale, messages]);
  const setLocale = useCallback(
    (locale: string) => {
      onChange?.(locale);
    },
    [onChange],
  );

  useEffect(() => {
    LocaleUtil.intl = intl;
    LocaleUtil.setLocale = setLocale;
  }, [intl, setLocale]);

  return (
    <IntlProvider {...otherProps} locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
export default React.memo(Local);
