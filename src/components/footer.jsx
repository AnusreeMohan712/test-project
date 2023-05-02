import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import './footer.css';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary"className='align-left'>
        {' © '}
        {new Date().getFullYear()}
        {' Company'}
      </Typography>
    );
  }
  

const Footer = () => {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: '94vh',
    }}
  >
    <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: '000'}}
  >
    <Container maxWidth="sm">
    <Copyright />
  </Container>
  </Box>
  </Box>
  )
}

export default Footer