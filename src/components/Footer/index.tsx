import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'thisdcw出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: '知识星球',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> thisdcw github</>,
          href: 'https://github.com/thisdcw/',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '个人中心',
          href: 'https://thisdcw.asia',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
