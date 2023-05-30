import {FC, useEffect} from 'react';
import {useSelector} from '@reduxHooks';
import {fetchRefresh} from '@/redux/slices/user/bindActions';
import {Layout} from '@/components/Layout';
import {Loader} from '@/components/Loader';

export const App: FC = () => {
  const isLoadingUser = useSelector((store) => store.user.isLoading);

  useEffect(() => {
    fetchRefresh();
  }, []);

  return (
    <>
      {isLoadingUser && <Loader />}
      <Layout />
    </>
  );
};
