const express = require('express');
const axios = require('axios');

const app = express();
const port = 9877;
const windowSize = 10;
const window = [];

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzU5NTg2LCJpYXQiOjE3MjA3NTkyODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE4M2UwMWY3LWIwOTgtNGNjNi04NjU4LTUyYjc3ZWE5Yzg1NyIsInN1YiI6ImFwYW5kaWFuMTk1MF9iaXQyNUBtZXBjb2VuZy5hYy5pbiJ9LCJjb21wYW55TmFtZSI6Ik1lcGNvIFNjaGxlbmsgRW5naW5lZXJpbmcgQ29sbGVnZSIsImNsaWVudElEIjoiYTgzZTAxZjctYjA5OC00Y2M2LTg2NTgtNTJiNzdlYTljODU3IiwiY2xpZW50U2VjcmV0IjoiZHpqcFhSWlpmVEJDaXh2cCIsIm93bmVyTmFtZSI6IkFydW4gUGFuZGlhbiBSIiwib3duZXJFbWFpbCI6ImFwYW5kaWFuMTk1MF9iaXQyNUBtZXBjb2VuZy5hYy5pbiIsInJvbGxObyI6IjIxYml0MDI5In0.syQZq9V_4t6KC2rCAgHCbm4GST9ygPOYhJuJqqkO9fM";

app.get('/numbers/:numberid', async (req, res) => {
  const numberId = req.params.numberid;
  const validIds = ['p', 'f', 'e', 'r'];

  if (!validIds.includes(numberId)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  try {
    const response = await axios.get(`http://testserver.com/numbers/${numberId}`, {
      timeout: 500,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const numbers = response.data;

    const uniqueNumbers = [...new Set(numbers)];

    const prevState = [...window];
    for (const num of uniqueNumbers) {
      if (window.length >= windowSize) {
        window.shift();
      }
      window.push(num);
    }

    const avg = window.reduce((acc, curr) => acc + curr, 0) / window.length;

    res.json({
      numbers: uniqueNumbers,
      windowPrevState: prevState,
      windowCurrState: window,
      avg: avg.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from test server or timeout' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

