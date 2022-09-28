import { Box, Typography } from '@mui/material';
import styles from '../styles/logo.module.scss';

function Logo({hasAnimation}){
    return (
        <Box className={hasAnimation === true ? styles.logo__block : styles.logo__block__noanim}>
            <img src="/img/bracket_left.svg" alt="bracket_left" />
            <Typography variant='h1' className={styles.typing}>Ignacio</Typography>
            <img src="/img/bracket_right.svg" alt="bracket_right"/>
        </Box>
    );
}; export default Logo