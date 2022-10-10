import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import styles from '../styles/experience.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    color: '#E9F3FF',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: '#00FFC3',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: '300',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '1rem',
    color: '#E9F3FF',
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

function TabPanel(props) {
  const { children, title, description, company, list, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`} {...other}
    >
      {value === index && (
        <div className={styles.tab__wrapper}>
          <div className={styles.tab}>
            <h4 className={styles.tab__title}>{title}<span>{company}</span></h4>
            <p className={styles.tab__description}>{description}</p>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Experience() {
  const { t } = useTranslation('common');
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className={styles.experience__section}>
      <div className={styles.wrapper}>
        <h2 className={styles.section__title}>{t('experience.title')}</h2>
        <StyledTabs value={value} onChange={handleChange} aria-label="My Experience">
          <StyledTab label={t('experience.company1.company')} {...a11yProps(0)}/>
          <StyledTab label={t('experience.company2.company')} {...a11yProps(1)}/>
          <StyledTab label={t('experience.company3.company')} {...a11yProps(2)}/>
        </StyledTabs>
        
        <TabPanel value={value} index={0} 
          title={t('experience.company1.title')} 
          description={t('experience.company1.date')}
          list="list" company={t('experience.company1.company')}>
            <ul className={styles.tab__list}>
              <li>{t('experience.company1.description.p1')}</li>
              <li>{t('experience.company1.description.p2')}</li>
              <li>{t('experience.company1.description.p3')}</li>
            </ul>
        </TabPanel>
        <TabPanel value={value} index={1}
          title={t('experience.company2.title')}
          description={t('experience.company2.date')}
          list="list" company={t('experience.company2.company')}>
            <ul className={styles.tab__list}>
              <li>{t('experience.company2.description.p1')}</li>
              <li>{t('experience.company2.description.p2')}</li>
              <li>{t('experience.company2.description.p3')}</li>
              <li>{t('experience.company2.description.p4')}</li>
            </ul>
        </TabPanel>
        <TabPanel value={value} index={2}
          title={t('experience.company3.title')}
          description={t('experience.company3.date')}
          list="list" company={t('experience.company3.company')}>
            <ul className={styles.tab__list}>
              <li>{t('experience.company3.description.p1')}</li>
            </ul>
        </TabPanel>
      </div>
    </section>
  )
}