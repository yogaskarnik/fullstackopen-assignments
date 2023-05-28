import { useState } from "react";

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

      <h1>statistics</h1>
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        total {total}
        <br />
        average {average}
        <br />
        positive {positive} %
      </p>
    </div>
  );
};

export default App;
