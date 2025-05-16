
function ChartCard({ title, description, children }) {
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ChartCard;