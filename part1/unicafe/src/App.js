import { useState } from "react";

const StatisticsLine = (props) => {
  return (
    <div>
      {props.text}&nbsp;
      {props.value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return (
      <div>
        <h1>{"statistics"}</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>{"statistics"}</h1>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="total" value={total} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    const updatedTotal = total + 1;
    const totalAvg = updatedGood - bad;

    setGood(updatedGood);
    setTotal(updatedTotal);
    setAverage(totalAvg / updatedTotal);
    setPositive((updatedGood / updatedTotal) * 100);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    const updatedTotal = total + 1;
    const totalAvg = good - updatedBad;

    setBad(updatedBad);
    setTotal(updatedTotal);
    setAverage(totalAvg / updatedTotal);
  };
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotal = total + 1;

    setNeutral(updatedNeutral);
    setTotal(updatedTotal);
    setAverage(average);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good"></Button>
      <Button handleClick={handleNeutral} text="neutral"></Button>
      <Button handleClick={handleBad} text="bad"></Button>

      <Statistics
        title={"statistics"}
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      ></Statistics>
    </div>
  );
};

export default App;
