import { useState } from "react";

const Statistics = (props) => {
  if ((props.good && props.neutral && props.bad) === 0) {
    return (
      <div>
        <h1>{props.title}</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <p>
        good {props.good}
        <br />
        neutral {props.neutral}
        <br />
        bad {props.bad}
        <br />
        total {props.total}
        <br />
        average {props.average}
        <br />
        positive {props.positive} %
      </p>
    </div>
  );
};

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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

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
