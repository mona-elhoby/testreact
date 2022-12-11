import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

import { LOCALES } from './locales';
import messages from "./messages/index"

const Provider = ({ children, locale= LOCALES.Arabic}) => {
	return (
		<IntlProvider locale={locale} textComponent={Fragment} messages={messages[locale]}>
			{children}
		</IntlProvider>
	);
};

export default Provider
