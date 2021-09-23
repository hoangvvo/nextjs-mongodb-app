import Head from 'next/head';
import { Settings } from 'page-components/Settings';

const SettingPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <Settings />
      </Head>
    </>
  );
};

export default SettingPage;
