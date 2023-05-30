import {FC} from 'react';
import {I18NProvider, i18n} from './i18n';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from '@/redux/store';
import {App} from '@/components/App';

export const ProvidersLoader: FC = () => {
  return (
    <I18NProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </I18NProvider>
  );
};
