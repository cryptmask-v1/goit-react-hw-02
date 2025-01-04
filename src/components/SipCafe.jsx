import { useEffect, useState } from "react";

const SipCafe = () => {
  const [rating, setRating] = useState(() => {
    const savedRatings = localStorage.getItem("ratings");
    return savedRatings
      ? JSON.parse(savedRatings)
      : { good: 0, neutral: 0, bad: 0 };
  });

  function updateFeedback(feedbackType) {
    setRating((prevRating) => ({
      ...prevRating,
      [feedbackType]: prevRating[feedbackType] + 1,
    }));
  }
  function resetFeedback() {
    setRating(() => ({
      good: 0,
      neutral: 0,
      bad: 0,
    }));
    localStorage.setItem(
      "ratings",
      JSON.stringify({ good: 0, neutral: 0, bad: 0 })
    );
  }

  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(rating));
  }, [rating]);

  // total feedback
  const totalFeedback = rating.good + rating.neutral + rating.bad;
  const positiveRating =
    totalFeedback === 0 ? 0 : Math.round((rating.good / totalFeedback) * 100);
  return (
    <div>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button onClick={() => updateFeedback("good")}>Good</button>
        <button onClick={() => updateFeedback("neutral")}>Neutral</button>
        <button onClick={() => updateFeedback("bad")}>Bad</button>
        {totalFeedback === 0 ? null : (
          <button onClick={resetFeedback}>Reset</button>
        )}
      </div>
      <div>
        {totalFeedback === 0 ? (
          <p>No feedback yet</p>
        ) : (
          <div>
            <p>Good: {rating.good}</p>
            <p>Neutral: {rating.neutral}</p>
            <p>Bad: {rating.bad}</p>
            {positiveRating === 0 ? (
              <p>Sorry you don't have any positive ratings☹️...</p>
            ) : (
              <p>Positive: %{positiveRating}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SipCafe;
