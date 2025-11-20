const TestComponent2 = (props) => {
  const score = props.score;
  return (
    <div>
      <div>Test component</div>
      <div>score: {score}</div>
    </div>
  );
};

export default TestComponent;
