import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Add from './Add';
import Query from './Query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

const Body = () => {
  const classes = useStyles();

  const { messages,tableMessages ,addCardMessage, addRegularMessage, addErrorMessage,clearMessage,clearTableMessages } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');
  const [result,setResult] = useState([]);
  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    clearTableMessages();
    const {
      data: { message, tableMessages, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });
    if (!card) addErrorMessage(message);
    else {
      addCardMessage(message,tableMessages);
    }


  };

  const handleQuery = async () => {
    clearTableMessages();
    const {
      data: { tableMessages, message },
    } = await axios.get('/api/query-cards', {
      params: {
        type: queryType,
        queryString,
      },
    });

    if (!tableMessages) addErrorMessage(message);
    else addRegularMessage(tableMessages);
  };
  
  
  const [value, setValue] = useState(0);

  const handleTabsChange = (event, newValue) => {
    clearMessage("");
    clearTableMessages();
    setValue(newValue);
  };
  return (
    <Wrapper>
      <div>
        <Tabs value={value} onChange={handleTabsChange} aria-label="basic tabs example">
          <Tab label="ADD" {...a11yProps(0)} />
          <Tab label="Query" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <Add
          classes = {classes}
          handleChange= {handleChange}
          name = {name}
          subject = {subject}
          score = {score}
          setName = {setName}
          setSubject = {setSubject}
          setScore = {setScore}
          handleAdd = {handleAdd}
        ></Add>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Query
          classes = {classes}
          handleChange = {handleChange}
          queryType = {queryType}
          queryString = {queryString}
          setQueryType = {setQueryType}
          setQueryString = {setQueryString}
          handleQuery = {handleQuery}
        ></Query>
      </TabPanel>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Name</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableMessages.map((row)=>(
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.subject}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

export default Body;
