export default function ExchangeRate({ primary, secondary, exchange }) {
  return (
    <div>
      <h3>Exchange Rate</h3>
      <p>{exchange}</p>
      <p>
        {primary} to {secondary}
      </p>
    </div>
  );
}
